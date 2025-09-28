import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const project = await ProjectService.createProject(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Project created successfully",
    data: project,
  });
});

// get project by id

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const project = await ProjectService.getProjectById(projectId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project fetched successfully",
    data: project,
  });
});

// get all project
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const { projects, meta } = await ProjectService.getAllProjects(page, limit);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Projects fetched successfully",
    data: projects,
    meta,
  });
});

// delete project

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const project = await ProjectService.deleteProject(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project deleted successfully",
    data: project,
  });
});

export const ProjectController = {
  createProject,
  getProjectById,
  getAllProjects,
  deleteProject,
};
