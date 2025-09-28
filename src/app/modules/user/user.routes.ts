import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema, updateUserSchema } from "./user.validate";
import { UserControllers } from "./user.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(createUserSchema),
  UserControllers.createUser
);

router.patch(
  "/:id",
  validateRequest(updateUserSchema),
  UserControllers.updateUser
);

export const UserRoutes = router;
