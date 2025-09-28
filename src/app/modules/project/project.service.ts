import { PrismaClient } from "@prisma/client";
import { IProject } from "./project.interface";
import AppError from "../../helpers/AppError";
import { TMeta } from "../../utils/sendResponse";

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

// get all project

const getAllProjects = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
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
    }),
    prisma.project.count(),
  ]);

  const totalPage = Math.ceil(total / limit);

  const meta: TMeta = { page, limit, totalPage, total };

  return { projects, meta };
};
export const ProjectService = { createProject, getProjectById, getAllProjects };
