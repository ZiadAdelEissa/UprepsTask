import { useState, useEffect } from "react"
import { User } from "./types/user"
import UserTable from "./components/UserTable"
import UserForm from "./components/UserForm"
import SearchBar from "./components/SearchBar"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"

const initialUsers: User[] = [
  { id: 1, name: "ziad", email: "ziad@example.com", role: "admin" },
  { id: 2, name: "tarek ", email: "tarek@example.com", role: "user" },
]

function App() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [editingUser, setEditingUser] = useState<User | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const addUser = (user: Omit<User, "id">) => {
    const newUser = { ...user, id: Date.now() }
    setUsers([...users, newUser])
    setIsFormOpen(false)
  }

  const updateUser = (updated: Omit<User, "id">) => {
    setUsers(users.map((u) => (u.id === editingUser?.id ? { ...u, ...updated } : u)))
    setEditingUser(undefined)
    setIsFormOpen(false)
  }

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setEditingUser(undefined)
    setIsFormOpen(true)
  }

  const toggleDarkMode = () => {
    console.log('Toggle dark mode clicked, current state:', isDarkMode)
    setIsDarkMode(!isDarkMode)
    console.log('New dark mode state will be:', !isDarkMode)
  }

  // Apply dark mode class to document root
  useEffect(() => {
    console.log('useEffect triggered, isDarkMode:', isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      console.log('Added dark class to document')
    } else {
      document.documentElement.classList.remove('dark')
      console.log('Removed dark class from document')
    }
    console.log('Document classes:', document.documentElement.className)
  }, [isDarkMode])

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 md:ml-64">
          {/* Topbar */}
          <Topbar 
            onAdd={handleAdd}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          
          {/* Main Content */}
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-light text-slate-800 dark:text-slate-100 mb-2">
                      User Management
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Manage your team members and their roles
                    </p>
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="mb-6">
                  <SearchBar search={searchTerm} setSearch={setSearchTerm} />
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={deleteUser} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="animate-in zoom-in-95 duration-200">
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? updateUser : addUser}
              onCancel={() => {
                setIsFormOpen(false)
                setEditingUser(undefined)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App