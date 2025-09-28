import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema } from "./user.validate";
import { UserControllers } from "./user.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(createUserSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
