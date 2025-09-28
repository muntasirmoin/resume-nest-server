import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createAboutSchema, updateAboutSchema } from "./about.validate";
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

// update about by authorId
router.patch(
  "/:authorId",
  validateRequest(updateAboutSchema),
  AboutController.updateAbout
);

export const AboutRoutes = router;
