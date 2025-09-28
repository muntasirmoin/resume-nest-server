import { Prisma, PrismaClient, User } from "@prisma/client";
import { Role } from "./user.interface";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";
import AppError from "../../helpers/AppError";

const prisma = new PrismaClient();

const createUser = async (
  payload: Prisma.UserCreateInput
): Promise<Omit<User, "password">> => {
  // Assign default role 'USER' if not provided
  if (!payload.role) payload.role = Role.USER;

  // Hash password
  if (!payload.password) {
    throw new AppError(400, "Password is required");
  }

  payload.password = await bcrypt.hash(
    payload.password,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const user = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

export const UserServices = { createUser };
