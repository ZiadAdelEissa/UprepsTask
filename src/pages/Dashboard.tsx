import UserTable from "../components/UserTable"
import UserForm from "../components/UserForm"
import { User } from "../types/user"
import { useState } from "react"

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const addUser = (user: Omit<User, "id">) => {
    const newUser = { ...user, id: Date.now() }
    setUsers([...users, newUser])
    setIsFormOpen(false)
  }

  const updateUser = (userData: Omit<User, "id">) => {
    setUsers(users.map((u) => (u.id === editingUser?.id ? { ...u, ...userData } : u)))
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

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => {
              setEditingUser(undefined)
              setIsFormOpen(true)
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add User
          </button>
        </div>

        {isFormOpen && (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? updateUser : addUser}
            onCancel={() => setIsFormOpen(false)}
          />
        )}

        <UserTable users={users} onEdit={handleEdit} onDelete={deleteUser} />
      </div>
    </div>
  )
}

export default Dashboard