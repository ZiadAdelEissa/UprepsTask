import { Sun, Moon, Plus } from 'lucide-react'

type Props = {
  onAdd: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const Topbar = ({ onAdd, isDarkMode, toggleDarkMode }: Props) => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-lg font-semibold">Users Management</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={onAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  )
}

export default Topbar