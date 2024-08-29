import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useToast } from "../components/ui/use-toast"
import registerFetch from "@/hooks/registerFetch"
import { AuthContext } from "@/App"
import { useContext } from "react"
import genericFetch from "@/hooks/genericFetch"



const SettingsPage = () => {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;
  const { toast } = useToast();

  const { mutateAsync: settingsMutation, isPending } = useMutation({
    mutationFn: genericFetch,
    onSuccess: (data) => {
      console.log('success', data)
      toast({
        variant: "primary",
        title: "Success!",
        description: 'You have updated your data.',
      })
      navigate(0)
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

  const registerSchema = z.object({
    email: z.string()
      .min(1, { message: "Please enter something" })
      .email("This is not a valid email."),

    name: z.string()
      .max(255, { message: "That's too long." })
      .optional(),

    surname: z.string()
      .max(255, { message: "That's too long." })
      .optional(),

    password: z.string(),
      // .min(6, { message: "We need at least 6 characters buddy." }).optional(),

    repeatPassword: z.string()
      // .min(6, { message: "We need at least 6 characters buddy." }).optional()
  }).superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
        path: ['repeatPassword']
      });
    }
  });

  const form = useForm({
    resolver: zodResolver(registerSchema),
    values: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = (values) => {
    const body = JSON.stringify(
      {
        email: values.email || null,
        // password: values.password || null,
        name: values.name || null,
        surname: values.surname || null
      }
    )
    console.log(body)
    settingsMutation({path: `users/${user.id}`, method: 'PUT', body: body})
  };

  return (
    <Card className="w-full max-w-4xl">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          You can change your details and credencials here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name123@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 w-full mx-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Steven" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            class=""
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Buffet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Remember to use strong password :)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter>
        <Button type="submit">{ isPending ? "Saving..." : "Save changes" }</Button>
      </CardFooter>
      </form>
      </Form>
    </Card>  
  );
};

export default SettingsPage;