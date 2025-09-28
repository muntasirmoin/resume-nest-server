import { Role } from "../user/user.interface";

export interface IBlog {
  id?: string;
  title: string;
  content: string;
  slug: string;
  published?: boolean;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
