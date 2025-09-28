import { PrismaClient } from "@prisma/client";
import { IProject } from "./project.interface";

const prisma = new PrismaClient();

const createProject = async (payload: IProject) => {
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
