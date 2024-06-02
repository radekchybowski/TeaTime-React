import MobileNavButton from "@/components/blocks/MobileNavButton"
import NavPane from "@/components/blocks/NavPane"
import Container from "@/components/ui/container"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { NavLink, Outlet } from "react-router-dom"

function AppLayout() {

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