import { Outlet } from "react-router-dom"
import Header from "../Main/Header"
import Footer from "./Footer"
import { ScrollManager, ScrollToTopButton } from "@/components/Main/Scroll/index"

interface MainLayoutProps {
  restoreScroll?: boolean
}

export default function MainLayout({ restoreScroll = false }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full h-16 z-50">
        <Header />
      </header>

      {/* Scroll manager */}
      <ScrollManager restoreScroll={restoreScroll} />

      {/* Main content */}
      <main className="flex-1 px-4 pt-20">
        <Outlet />
      </main>

      {/* Footer завжди внизу */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  )
}
