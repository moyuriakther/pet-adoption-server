import { Router } from "express";
import { adoptionController } from "./adoption.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/",
  auth(UserRole.admin, UserRole.user),
  adoptionController.getAllAdoptionRequest
);
router.get(
  "/my-pets",
  auth(UserRole.admin, UserRole.user),
  adoptionController.myAdoptedPets
);

export const getAdoptionRouter = router;
