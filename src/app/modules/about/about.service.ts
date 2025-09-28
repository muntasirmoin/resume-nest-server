import { PrismaClient } from "@prisma/client";

import AppError from "../../helpers/AppError";
import { IAbout } from "./about.interface";

const prisma = new PrismaClient();

// create about
const createAbout = async (payload: IAbout): Promise<IAbout> => {
  // check if author already has about (because authorId is unique)
  const existing = await prisma.about.findUnique({
    where: { authorId: payload.authorId },
  });

  if (existing) {
    throw new AppError(400, "About already exists for this author");
  }

  const about = await prisma.about.create({
    data: payload,
    select: {
      id: true,
      authorId: true,
      name: true,
      email: true,
      phone: true,
      bio: true,
      skills: true,
      linkedin: true,
      github: true,
      twitter: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return about;
};

export const AboutService = {
  createAbout,
};
