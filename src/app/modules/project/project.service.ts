import { PrismaClient } from "@prisma/client";
import { IProject } from "./project.interface";
import AppError from "../../helpers/AppError";

const prisma = new PrismaClient();

// create project
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

// get single project

const getProjectById = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
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

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  return project;
};

export const ProjectService = { createProject };
