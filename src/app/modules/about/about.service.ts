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

// get single about by authorId
const getAboutById = async (authorId: string) => {
  const about = await prisma.about.findUnique({
    where: { authorId },
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

  if (!about) {
    throw new AppError(404, "About information not found");
  }

  return about;
};

// delete about by authorId
const deleteAbout = async (authorId: string) => {
  const existingAbout = await prisma.about.findUnique({ where: { authorId } });

  if (!existingAbout) {
    throw new AppError(404, "About information not found");
  }

  await prisma.about.delete({
    where: { authorId },
  });

  return {
    message: "About deleted successfully",
  };
};

// update about by authorId
const updateAbout = async (authorId: string, payload: any) => {
  const existingAbout = await prisma.about.findUnique({ where: { authorId } });

  if (!existingAbout) {
    throw new AppError(404, "About information not found");
  }

  const updatedAbout = await prisma.about.update({
    where: { authorId },
    data: payload,
  });

  return updatedAbout;
};

export const AboutService = {
  createAbout,
  getAboutById,
  deleteAbout,
  updateAbout,
};
