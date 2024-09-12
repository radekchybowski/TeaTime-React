import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { useContext } from "react"
import { AuthContext } from "@/App"
import genericFetch from "@/lib/genericFetch"
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner"

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
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    }
  });

  const { mutateAsync: notesMutation, isPending } = useMutation({
    mutationFn: genericFetch,
    onSuccess: () => {
      queryClient.invalidateQueries(['note'])
      toast({
        title: "Note has been saved"
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

  const noteSchema = z.object({
    note: z.string()
      .min(1, { message: "Please enter at least one character."})
  })

  const form = useForm({
    resolver: zodResolver(noteSchema),
    values: {
      note: note?.[0]?.content ?? null
    },
  })

  const onSubmit = (values) => {
    if(note?.[0] === undefined) {
      const body = JSON.stringify({
        title: 'note_widget',
        content: values.note, 
        tea: `api/teas/${tea.id}`, 
        author: `api/users/${user.id}`
      })
      notesMutation({path: 'comments', method: 'POST', body: body})
    } else {
      const body = JSON.stringify({
        content: values.note
      })
      notesMutation({path: `comments/${note?.[0].id}`, method: 'PUT', body: body})
    }
    
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
              <FormLabel>Edit your note</FormLabel>
              <FormControl>
                { isNoteLoading ? <Spinner size="large"/> : <Textarea placeholder="Type your message here..." {...field}/> }
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