import { AuthContext } from "@/App"
import MobileNavButton from "@/components/blocks/MobileNavButton"
import NavPane from "@/components/blocks/NavPane"
import Container from "@/components/ui/container"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { toast } from "@/components/ui/use-toast"
import genericFetch from "@/hooks/genericFetch"
import { useMutation, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useContext, useEffect, useLayoutEffect } from "react"
import { NavLink, Outlet } from "react-router-dom"

function AppLayout() {

  const authContext = useContext(AuthContext)

  const { mutateAsync: userMutation, isPending } = useMutation({
    mutationFn: genericFetch,
    onSuccess: (data) => {
      console.log("Fetch:", data[0])
      authContext.setAuth({...authContext.auth, user: data[0]})
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

  useLayoutEffect(() => {
    if(localStorage.getItem('user')) {
      const user = jwtDecode(Cookies.get('token'))
      console.log(user.username)
      userMutation({path: `users?email=${user.username}`})
      console.log(authContext.auth.user)
    }
  },[])

  

  return (
      <ResizablePanelGroup className="" direction="horizontal">
        <ResizablePanel className="min-w-96 max-w-[34rem] hidden sm:block">
          <NavPane/> 
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <MobileNavButton/>
          <Container>
            <Outlet/>
          </Container>
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}

export default AppLayout