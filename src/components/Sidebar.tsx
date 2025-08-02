import { Users, LayoutDashboard } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block">
      <div className="p-6 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
        User Dashboard
      </div>
      <nav className="flex flex-col p-4 space-y-2 text-sm">
        <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Users className="w-5 h-5" />
          Users
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar
  