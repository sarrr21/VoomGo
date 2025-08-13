import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { ChevronDown } from "lucide-react"
import Search from "../assets/icons/Search.svg"
import Mail from "../assets/icons/mail.svg"
import Notify from "../assets/icons/notfy.svg"

interface NavbarProps {
  onToggleSidebar: () => void
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-md" onClick={onToggleSidebar}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="sr-only">Toggle Sidebar</span>
          </button>
          <form onSubmit={handleSubmit} className="relative">
  <input
    type="text"
    value={query}
    onChange={handleInputChange}
    placeholder="Search"
    className="w-full px-4 py-2 pr-10 text-gray-700 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
  />
  <img
    src={Search}
    alt="search"
    className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
  />
</form>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative bg-gray-100 p-2 rounded-lg">
           <img src={Mail} alt="mail"  className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>

          <div className="relative bg-gray-100 p-2 rounded-lg">
            <img src={Notify} alt="notify" className="w-6 h-6"/>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              1
            </span>
          </div>

          <div className="relative">
            <button className="flex items-center gap-3" onClick={() => setOpen((p) => !p)}>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">{user?.fullName?.slice(0,2).toUpperCase() || "US"}</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">{user?.fullName || "User"}</div>
                <div className="text-xs text-gray-500">{user?.role || "Admin"}</div>
              </div>
              <ChevronDown className={`h-4 w-4 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow">
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100" onClick={async () => { await logout(); }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
