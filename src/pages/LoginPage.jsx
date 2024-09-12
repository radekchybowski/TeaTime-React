import RegisterForm from "@/components/blocks/RegisterForm"
import LoginForm from "@/components/blocks/LoginForm"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function LoginPage() {
const navigate = useNavigate();

useEffect(() => {
  if(Cookies.get('token')) {
    navigate('/')
  }
},[])

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log in</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
       
    </main>
  )
}