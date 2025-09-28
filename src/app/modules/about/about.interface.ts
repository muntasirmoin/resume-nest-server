export interface IAbout {
  id?: string;
  authorId: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  linkedin?: string | null;
  github?: string | null;
  twitter?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
