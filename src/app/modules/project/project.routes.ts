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

// GET all projects
router.get("/", ProjectController.getAllProjects);

export const ProjectRoutes = router;
