import { useState } from "react"
import { User } from "./types/user"
import UserTable from "./components/UserTable"
import UserForm from "./components/UserForm"

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "editor" },
]

function App() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [editingUser, setEditingUser] = useState<User | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-slate-800 dark:text-slate-100 mb-2">
                User Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Manage your team members and their roles
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-slate-800 dark:bg-slate-700 rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <UserTable users={users} onEdit={handleEdit} onDelete={deleteUser} />
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
    </div>
  )
}

export default App
