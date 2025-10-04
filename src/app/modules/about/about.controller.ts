import { Request, Response } from "express";
import { AboutService } from "./about.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

// create about
const createAbout = catchAsync(async (req: Request, res: Response) => {
  const about = await AboutService.createAbout(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "About created successfully",
    data: about,
  });
});

const getAboutById = catchAsync(async (req: Request, res: Response) => {
  const { authorId } = req.params;
  const about = await AboutService.getAboutById(authorId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "About info fetched successfully",
    data: about,
  });
});

// delete about
const deleteAbout = catchAsync(async (req: Request, res: Response) => {
  const { authorId } = req.params;
  const result = await AboutService.deleteAbout(authorId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});

// update about
const updateAbout = catchAsync(async (req: Request, res: Response) => {
  const { authorId } = req.params;
  const updatedAbout = await AboutService.updateAbout(authorId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "About updated successfully",
    data: updatedAbout,
  });
});

// GET /api/about
const getAllAbouts = catchAsync(async (req: Request, res: Response) => {
  const abouts = await AboutService.getAllAbouts();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All About info fetched successfully",
    data: abouts,
  });
});

export const AboutController = {
  createAbout,
  getAboutById,
  deleteAbout,
  updateAbout,
  getAllAbouts,
};
