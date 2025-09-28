import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectSchema } from "./project.validate";

const router = Router();

router.post(
  "/create",
  validateRequest(createProjectSchema),
  ProjectController.createProject
);

export const ProjectRoutes = router;
