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

// get single about by authorId
router.get("/:authorId", AboutController.getAboutById);

// delete about by authorId
router.delete("/:authorId", AboutController.deleteAbout);

export const AboutRoutes = router;
