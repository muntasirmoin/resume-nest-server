import { PrismaClient } from "@prisma/client";
import { IProject } from "./project.interface";
import AppError from "../../helpers/AppError";

const prisma = new PrismaClient();

const createProject = async (payload: IProject) => {
  const authorExists = await prisma.user.findUnique({
    where: { id: payload.authorId },
  });

  if (!authorExists) {
    throw new AppError(400, "Author does not exist");
  }
  const project = await prisma.project.create({
    data: payload,
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      projectLink: true,
      liveSite: true,
      features: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return project;
};

export const ProjectService = { createProject };
