import MobileNavButton from "@/components/blocks/MobileNavButton"
import NavPane from "@/components/blocks/NavPane"
import Container from "@/components/ui/container"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { NavLink, Outlet } from "react-router-dom"

function RootLayout() {

  return (
      <Outlet/>
  )
}

export default RootLayout