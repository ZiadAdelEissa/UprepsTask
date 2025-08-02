import React from "react"
import { Home, Users, Settings } from "lucide-react"

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 p-6 hidden md:block shadow-lg">
      <h1 className="text-2xl font-bold mb-8">User Admin</h1>
      <nav className="space-y-4">
        <a href="#" className="flex items-center gap-2 hover:text-purple-400 transition">
          <Home size={20} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-purple-400 transition">
          <Users size={20} /> Users
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-purple-400 transition">
          <Settings size={20} /> Settings
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar
