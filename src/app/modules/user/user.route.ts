import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { userValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/users", auth(UserRole.admin), userController.getAllUsers);
router.get(
  "/profile",
  auth(UserRole.admin, UserRole.user),
  userController.userProfile
);
router.post("/register", userController.createUser);
router.put(
  "/users/status/:id",
  auth(UserRole.admin),
  validateRequest(userValidation.updateUserStatus),
  userController.updateUserStatus
);
router.put(
  "/users/role/:id",
  auth(UserRole.admin),
  validateRequest(userValidation.updateUserRoles),
  userController.updateUserRole
);
router.put(
  "/profile",
  auth(UserRole.admin, UserRole.user),
  validateRequest(userValidation.updateUserValidation),
  userController.updateUserInformation
);

export const userRoutes = router;
