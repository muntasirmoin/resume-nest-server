import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectSchema } from "./project.validate";

const router = Router();

// create project
router.post(
  "/create",
  validateRequest(createProjectSchema),
  ProjectController.createProject
);

// GET single project by ID
router.get("/:id", ProjectController.getProjectById);

export const ProjectRoutes = router;
