import { create } from 'zustand';
import { User } from '../types/user';

type State = {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: number, data: Omit<User, 'id'>) => void;
  deleteUser: (id: number) => void;
};

const mockUsers: User[] = [
  { id: 1, name: 'Ziad Adel', email: 'ziad@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'User' },
];

export const useUserStore = create<State>((set) => ({
  users: mockUsers,
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, { ...user, id: Date.now() }],
    })),
  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { id, ...data } : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));
