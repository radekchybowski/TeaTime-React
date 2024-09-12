import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthContext } from "@/App";
import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import deleteFetch from "@/lib/deleteFetch";
import formatDate from "@/lib/formatDate";

const Comment = ({commentId, authorId, nickname, content, date, className}) => {
  const authContext = useContext(AuthContext);
  const queryClient = useQueryClient();
  const user = authContext.auth.user;

  const { mutateAsync: deleteCommentMutation } = useMutation({
    mutationFn: deleteFetch,
    onSuccess: () => {
      queryClient.invalidateQueries([''])
      toast({
        title: "Comment has been deleted."
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    }
  })

  const handleDelete = () => {
    deleteCommentMutation(`comments/${commentId}`)
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
      <p className="ml-5 mt-1 text-sm italic text-muted-foreground ">{formatDate(date)}</p>
    </div>
  );
};

export default Comment;