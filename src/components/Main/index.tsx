
import { Outlet } from "react-router-dom"
import Header from "../Main/Header"
import Footer from "./Footer"

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="px-4 ">
        <Outlet /> 
      </main>
      <Footer />
    </>
  )
}
