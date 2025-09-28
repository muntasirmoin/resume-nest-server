import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).*$/, {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character",
    }),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .optional(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).*$/, {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character",
    })
    .optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});
