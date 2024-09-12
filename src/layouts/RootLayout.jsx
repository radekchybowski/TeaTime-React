import { Toaster } from "@/components/ui/toaster"
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if(!Cookies.get('token')) {
      navigate('/login')
    }
  },[navigate])

  return (
      <>
        <Outlet/>
        <Toaster/>
      </>
  )
}

export default RootLayout