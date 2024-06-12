import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import genericFetch from "@/hooks/genericFetch"
import { useNavigate } from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"



const RegisterForm = () => {

  const navigate = useNavigate()
  const { toast } = useToast();

  const { mutateAsync: loginMutation, isFetching } = useMutation({
    mutationFn: genericFetch,
    onSuccess: () => {
      console.log('success')
      navigate('/')
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

    password: z.string()
      .min(6, { message: "We need at least 6 characters buddy." }),

    repeatPassword: z.string()
      .min(6, { message: "We need at least 6 characters buddy." })
      // .refine((value, { form }) => value === form.password, {
      //   message: "Passwords do not match.",
      // }),
  });

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  

  const onSubmit = (values) => {
    const body = JSON.stringify(values)
    loginMutation({path: 'login', method: 'POST', body: body})
  };

  return (
    <Card>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Please provide us with your data.
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
                <Input placeholder="name123@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit">{ isFetching ? "Logging..." : "Log in" }</Button>
      </CardFooter>
      </form>
      </Form>
    </Card>  
  );
};

export default RegisterForm;