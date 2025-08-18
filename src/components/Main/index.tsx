import { Outlet } from "react-router-dom"
import Header from "../Main/Header"
import Footer from "./Footer"
import  {ScrollManager, ScrollToTopButton } from "@/components/Main/Scroll/index"

// додаємо тип пропсів
interface MainLayoutProps {
  restoreScroll?: boolean
}

export default function MainLayout({ restoreScroll = false }: MainLayoutProps) {
  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 z-50">
        <Header />
      </header>

      <ScrollManager restoreScroll={restoreScroll} />

      <main className="px-4 pt-20">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
