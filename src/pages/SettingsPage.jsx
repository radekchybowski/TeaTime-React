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
import { AuthContext } from "@/App"
import { useContext } from "react"
import genericFetch from "@/hooks/genericFetch"
import Alert from "@/components/blocks/Alert"
import deleteFetch from "@/hooks/deleteFetch"
import Cookies from "js-cookie"



const SettingsPage = () => {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;
  const { toast } = useToast();

  const { mutateAsync: settingsMutation} = useMutation({
    mutationFn: genericFetch,
    onSuccess: (data) => {
      console.log('success', data)
      toast({
        title: "Success!",
        description: 'You have updated your data.',
      })
      setTimeout(() => {
        navigate(0)
      }, 3000)
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

  const { mutateAsync: deleteAccountMutation, isPending: deletePending } = useMutation({
    mutationFn: deleteFetch,
    onSuccess: () => {
      Cookies.remove('token');
      localStorage.removeItem('user');
      toast({

        title: "Your account has been deleted",
        description: 'You will be moved to a better place in 3 seconds.',
      })
      setTimeout(() => {
        navigate(0)
      }, 5000) 
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

  const settingsSchema = z.object({
    email: z.string()
      .min(1, { message: "Please enter something" })
      .email("This is not a valid email."),

    name: z.string()
      .max(255, { message: "That's too long." })
      .optional(),

    surname: z.string()
      .max(255, { message: "That's too long." })
      .optional()
  })

  const passwordSchema = z.object({
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
    resolver: zodResolver(settingsSchema),
    values: {
      name: user.name,
      surname: user.surname,
      email: user.email
    },
  });

  const formPassword = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  const onSettingsSubmit = (values) => {

    console.log('settings submit')
    const body = JSON.stringify(
      {
        email: values.email || null,
        name: values.name || null,
        surname: values.surname || null
      }
    )
    console.log(body)
    
    settingsMutation({path: `users/${user.id}`, method: 'PUT', body: body})
  };

  const onPasswordSubmit = (values) => {
    console.log('password submit')
    const body = JSON.stringify(
      {
        password: values.password,
      }
    )
    settingsMutation({path: `users/${user.id}`, method: 'PUT', body: body})
  };

  const deleteAccount = () => {
    deleteAccountMutation(`users/${user.id}`);
  }

  return (
    <>
    <Card className="w-full max-w-4xl">
      <Form {...form}>
      <form id="formSettings" onSubmit={form.handleSubmit(onSettingsSubmit)}>
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
      </CardContent>
      <CardFooter>
        <Button form="formSettings" type="submit">Save changes</Button>
      </CardFooter>
      </form>
      </Form>
    </Card>

    <Card className="w-full max-w-4xl">
      <Form {...formPassword}>
      <form id="formPassword" onSubmit={formPassword.handleSubmit(onPasswordSubmit)}>
      <CardHeader>
        <CardTitle>Changing Password</CardTitle>
        <CardDescription>
          Type your new password if for eg. your old one is your exes birthday.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <FormField
          control={formPassword.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formPassword.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter>
        <Button form="formPassword" type="submit">Change password</Button>
      </CardFooter>
      </form>
      </Form>
    </Card>

    <Card className="w-full max-w-4xl">
    <CardHeader>
      <CardTitle>Account deletion</CardTitle>
      <CardDescription>
        Remember, if you delete your account all content added by you (teas, comments, ratings) will also be deleted.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
    <Alert
      title="Are you absolutely sure?"
      description="You are going to delete your account. This action cannot be undone. All data added by you (teas, comments etc.) will be deleted as well."
      actionButton={
        <Button variant="destructive" onClick={deleteAccount}>I want to delete this account</Button>
      }
    >
      <Button variant="destructive">Delete account</Button>
    </Alert> 
    
    </CardContent>
  </Card>  
  </>
  );
};

export default SettingsPage;