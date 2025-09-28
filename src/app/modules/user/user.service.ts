import { Prisma, PrismaClient, User } from "@prisma/client";
import { Role } from "./user.interface";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";
import AppError from "../../helpers/AppError";

const prisma = new PrismaClient();

// create user

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
      updatedAt: true,
    },
  });

  return user;
};

// update user by ID

const updateUser = async (
  id: string,
  payload: Partial<{ name: string; password: string; role: Role }>
): Promise<Omit<User, "password">> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const updatedData: any = { ...payload };

  // Hash password if updated
  if (payload.password) {
    updatedData.password = await bcrypt.hash(payload.password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updatedData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

export const UserServices = { createUser, updateUser };
