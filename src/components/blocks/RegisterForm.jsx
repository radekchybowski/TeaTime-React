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
import registerFetch from "@/lib/registerFetch"



const RegisterForm = () => {

  const navigate = useNavigate()
  const { toast } = useToast();

  const { mutateAsync: registerMutation, isPending } = useMutation({
    mutationFn: registerFetch,
    onSuccess: () => {
      toast({
        variant: "primary",
        title: "Success!",
        description: 'You are now registered.',
      })
      setTimeout(() => {
        navigate(0)
      }, 2000)
    },
    onError: (error) => {
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

    password: z.string()
      .min(6, { message: "We need at least 6 characters buddy." }),

    repeatPassword: z.string()
      .min(6, { message: "We need at least 6 characters buddy." })
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
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = (values) => {
    const body = JSON.stringify(
      {
        email: values.email,
        password: values.password,
        name: values.name || null,
        surname: values.surname || null
      }
    )
    registerMutation({body: body})
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
                <Input type="email" placeholder="name123@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="min-w-1">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Steven" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            class="w-50"
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="min-w-1">
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
        <Button type="submit">{ isPending ? "Registering..." : "Register" }</Button>
      </CardFooter>
      </form>
      </Form>
    </Card>  
  );
};

export default RegisterForm;