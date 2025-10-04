import { z } from "zod";

export const createAboutSchema = z.object({
  authorId: z.string().uuid({ message: "Invalid user ID" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(6, { message: "Phone number must be at least 6 digits" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
  skills: z
    .array(z.string())
    .min(1, { message: "At least one skill is required" }),
  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),
  github: z.string().url({ message: "Invalid GitHub URL" }).optional(),
});

export const updateAboutSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z
    .string()
    .min(6, { message: "Phone number must be at least 6 digits" })
    .optional(),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters" })
    .optional(),
  skills: z
    .array(z.string())
    .min(1, { message: "At least one skill is required" })
    .optional(),
  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),
  github: z.string().url({ message: "Invalid GitHub URL" }).optional(),
  // twitter: z.string().url({ message: "Invalid Twitter URL" }).optional(),
});
