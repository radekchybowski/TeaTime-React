import RegisterForm from "@/components/blocks/RegisterForm"
import LoginForm from "@/components/blocks/LoginForm"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import { UserContext } from "@/App"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"


export default function LoginPage() {
const { user, setUser } = useContext(UserContext)
const navigate = useNavigate();

if (user != null) navigate('/');

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
            {user && <p>You are already logged in.</p>}
            <RegisterForm />
          </TabsContent>
        </Tabs>
       
    </main>
  )
}