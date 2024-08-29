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
import { useContext, useEffect, useLayoutEffect } from "react"
import { AuthContext } from "@/App"
import genericFetch from "@/hooks/genericFetch"
import Comment from "./Comment";
import { Textarea } from "../ui/textarea";

const NotesWidget = ({tea}) => {
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {data: note, isLoading: isNoteLoading} = useQuery({
    queryFn: () => genericFetch({
      path: `comments`, 
      search: `tea=${tea.id}&author=${user.id}&title=note_widget`}),
    queryKey: ['note'],
    cacheTime: 0,
    onSuccess: () => {
      console.log('success notee')
    }
  });

  const { mutateAsync: notesMutation, isPending } = useMutation({
    mutationFn: genericFetch,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['note'])
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

  const noteSchema = z.object({
    note: z.string()
      .min(1, { message: "Please enter something"})
  })

  const form = useForm({
    resolver: zodResolver(noteSchema),
    values: {
      note: note?.content
    },
  })

  const onSubmit = (values) => {
    console.log(values.note)
    const body = JSON.stringify({
      title: 'note_widget',
      content: values.note, 
      tea: `api/teas/${tea.id}`, 
      author: `api/users/${user.id}`
    })
    notesMutation({path: 'comments', method: 'POST', body: body})
  };

  return (
  <>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="note"
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
          { isPending ? 'Saving...' : 'Save' }
        </Button>
        {note?.content}
      </form>
    </Form>
  </>
  );
};

export default NotesWidget;