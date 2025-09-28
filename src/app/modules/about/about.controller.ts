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

export const AboutController = {
  createAbout,
};
