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

export const ProjectController = { createProject, getProjectById };
