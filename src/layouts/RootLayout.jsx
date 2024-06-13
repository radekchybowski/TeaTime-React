import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate('/login')
    }
  },[])

  return (
      <>
        <Outlet/>
        <Toaster/>
      </>
  )
}

export default RootLayout