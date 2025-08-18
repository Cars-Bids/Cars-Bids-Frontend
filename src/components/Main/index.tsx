
import { Outlet } from "react-router-dom"
import Header from "../Main/Header"
import Footer from "./Footer"

export default function MainLayout() {
  return (
    <>
    <header className="fixed top-0 left-0 w-full h-16   z-50">     
       <Header />
    </header>


  <main className="px-4 pt-20 ">
 
        <Outlet /> 
      </main>
      <Footer />
    </>
  )
}
