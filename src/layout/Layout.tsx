import type React from "react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth.store"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const hydrated = useAuthStore((s) => s.hydrated)
  const hydrate = useAuthStore((s) => s.hydrate)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    if (!hydrated) return
    if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login", { replace: true })
    }
  }, [hydrated, isAuthenticated, location.pathname, navigate])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className={`flex-1 flex flex-col min-w-0 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
