// blog.validate.ts
import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),

  published: z.boolean().optional(),
  authorId: z.string(),
});

export const updateBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .optional(),
  published: z.boolean().optional(),
});
