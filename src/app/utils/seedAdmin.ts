import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { envVars } from "../config/env";

const prisma = new PrismaClient();

export const seedAdmin = async () => {
  console.log(envVars.ADMIN_PASSWORD, envVars.ADMIN_EMAIL);
  try {
    // Check if admin exists

    const isAdminExist = await prisma.user.findUnique({
      where: { email: envVars.ADMIN_EMAIL },
    });

    if (isAdminExist) {
      console.log("Admin already exists!");
      return;
    }

    console.log("Creating admin...");

    // Hash password
    const hashedPassword = await bcrypt.hash(
      envVars.ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const admin = await prisma.user.create({
      data: {
        name: "Muntasir Moin Chowdhury",
        email: envVars.ADMIN_EMAIL || "admin@gmail.com",
        password: hashedPassword,
        role: Role.ADMIN,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log("[Notification] Admin created successfully!");
    console.log(admin);
  } catch (error) {
    console.error("Failed to seed admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};
