// user.interface.ts

// Enum for user roles
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

// Interface for User
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
}
