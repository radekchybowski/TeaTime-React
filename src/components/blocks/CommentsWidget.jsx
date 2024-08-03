import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { useContext } from "react"
import { AuthContext } from "@/App"
import genericFetch from "@/hooks/genericFetch"
import Comment from "./Comment";
import { Textarea } from "../ui/textarea";

const CommentsWidget = ({tea}) => {
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: addCommentMutation, isPending } = useMutation({
    mutationFn: genericFetch,
    onSuccess: (data) => {
      queryClient.invalidateQueries([''])
      console.log('success', data)
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

  const commentSchema = z.object({
    content: z.string()
      .min(1, { message: "Please enter something"})
  })

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: ""
    },
  })

  const onSubmit = (values) => {
    console.log(values)
    const body = JSON.stringify({
      content: values.content, 
      tea: `api/teas/${tea.id}`, 
      author: `api/users/${user.id}`
    })
    addCommentMutation({path: 'comments', method: 'POST', body: body})
  };

  return (
  <>
    {tea.comments.map(comment => (
       <Comment key={comment.id}
         commentId={comment.id}
         authorId={comment.author.id}
         content={comment.content}
         nickname={comment.author.name + " " + comment.author.surname}
         date={comment.createdAt}
       />
     ))}
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here..." {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2 w-fit">
          { isPending ? 'Sending...' : 'Send' }
        </Button>
      </form>
    </Form>
  </>
  );
};

export default CommentsWidget;