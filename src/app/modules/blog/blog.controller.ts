import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

// create blog
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.createBlog(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Blog created successfully",
    data: blog,
  });
});

// get all blog

const getAllBlog = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const { blogs, meta } = await BlogService.getAllBlog({ page, limit });

  res.status(200).json({
    success: true,
    message: "All Blog fetched successfully",
    data: blogs,
    meta,
  });
};

// get single  blog by id

const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = await BlogService.getBlogById(id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Blog fetched successfully",
    data: blog,
  });
};

// delete blog

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlog(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});

// update blog

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedBlog = await BlogService.updateBlog(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: updatedBlog,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  getBlogById,
  deleteBlog,
  updateBlog,
};
