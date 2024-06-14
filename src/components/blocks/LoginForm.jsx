import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQuery } from "@tanstack/react-query"
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
import { useContext } from "react"
import { AuthContext } from "@/App"
import loginFetch from "@/hooks/loginFetch"
import genericFetch from "@/hooks/genericFetch"
import Cookies from "js-cookie"



const LoginForm = () => {

  const navigate = useNavigate()
  const { toast } = useToast();


  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: loginFetch,
    onSuccess: (data) => {
      localStorage.setItem('user', data)
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

  const loginSchema = z.object({
    email: z.string()
      .min(1, { message: "Please enter something"})
      .email("This is not a valid email."),
  
    password: z.string()
      .min(6, { message: "We need at least 6 characters buddy."})
  })

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = (values) => {
    const body = JSON.stringify(values)
    loginMutation({path: 'login', method: 'POST', body: body})
  };

  
  return (
    <Card>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>
          Please log in with your credentials.
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
      </CardContent>
      <CardFooter>
        <Button type="submit">{ isPending ? "Logging..." : "Log in" }</Button>
      </CardFooter>
      </form>
      </Form>
    </Card>  
  );
};

export default LoginForm;