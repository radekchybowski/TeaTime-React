import { AuthContext } from "@/App"
import MobileNavButton from "@/components/blocks/MobileNavButton"
import NavPane from "@/components/blocks/NavPane"
import Container from "@/components/ui/container"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { toast } from "@/components/ui/use-toast"
import genericFetch from "@/lib/genericFetch"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useContext, useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"

function AppLayout() {

  const authContext = useContext(AuthContext)

  const { mutateAsync: userMutation } = useMutation({
    mutationFn: genericFetch,
    onSuccess: (data) => {
      authContext.setAuth({...authContext.auth, user: data[0]})
    },
    onError: (error) => {
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
      userMutation({path: `users?email=${user.username}`})
    }
  },[userMutation])

  
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