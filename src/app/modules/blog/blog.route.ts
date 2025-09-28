import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogSchema, updateBlogSchema } from "./blog.validate";
import { BlogController } from "./blog.controller";

const router = Router();

// create blog
router.post(
  "/create",
  validateRequest(createBlogSchema),
  BlogController.createBlog
);

// get all blog
router.get("/", BlogController.getAllBlog);

// Get blog by ID
router.get("/:id", BlogController.getBlogById);

// DELETE
router.delete("/:id", BlogController.deleteBlog);

// update blog
router.patch(
  "/:id",
  validateRequest(updateBlogSchema),
  BlogController.updateBlog
);

export const BlogRoutes = router;
