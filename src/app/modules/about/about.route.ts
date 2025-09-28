import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createAboutSchema } from "./about.validate";
import { AboutController } from "./about.controller";

const router = Router();

// create about
router.post(
  "/create",
  validateRequest(createAboutSchema),
  AboutController.createAbout
);

export const AboutRoutes = router;
