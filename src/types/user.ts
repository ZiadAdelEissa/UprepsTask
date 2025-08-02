export type Role = 'Admin' | 'User';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
