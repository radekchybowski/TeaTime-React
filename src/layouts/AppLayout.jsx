import MobileNavButton from "@/components/blocks/MobileNavButton"
import NavPane from "@/components/blocks/NavPane"
import Container from "@/components/ui/container"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import genericFetch from "@/hooks/genericFetch"
import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import { NavLink, Outlet } from "react-router-dom"

function AppLayout() {
  // const {data: user, isFetched} = useQuery({
  //   queryFn: () => genericFetch({path: `users?email=${localStorage.getItem('user')}`}),
  //   queryKey: [`user`],
  //   cacheTime: 0
  // });

  // useEffect(() => {
  //   localStorage.setItem('userData', user[0])
  //   console.log(user)
  // },[isFetched])

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