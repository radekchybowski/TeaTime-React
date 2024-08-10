import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthContext } from "@/App";
import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import genericFetch from "@/hooks/genericFetch";
import { toast } from "../ui/use-toast";
import deleteFetch from "@/hooks/deleteFetch";

const Comment = ({commentId, authorId, nickname, content, date, className}) => {
  const formattedDate = new Date(date);
  const authContext = useContext(AuthContext);
  const queryClient = useQueryClient();
  const user = authContext.auth.user;

  const { mutateAsync: deleteCommentMutation, isPending } = useMutation({
    mutationFn: deleteFetch,
    onSuccess: () => {
      queryClient.invalidateQueries([''])
      toast({
        title: "Comment has been deleted."
      })
    },
    onError: (error) => {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    }
  })

  const handleDelete = () => {
    deleteCommentMutation(`comments/${commentId}`)
    console.log(`comments/${commentId}`)
  }

  return (
    <div>
      <div className={`relative flex flex-1 flex-col p-4 gap-1.5 bg-tile rounded-lg shadow-md ${className}`}>
        {user.id === authorId && <DropdownMenu className="relative">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="absolute top-0 right-0 m-4"><BsThreeDots /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuItem onClick={handleDelete} className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}
        <p><b>{nickname}</b></p>
        <p>{content}</p>
        
      </div>
      <p className="ml-5 mt-1 text-sm italic text-muted-foreground ">{formattedDate.toLocaleDateString()}, {formattedDate.toTimeString().substring(0, 5)}</p>
    </div>
  );
};

export default Comment;