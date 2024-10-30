import { Router } from "express";
import { adoptionController } from "./adoption.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/adoption-requests",
  auth(UserRole.admin, UserRole.user),
  adoptionController.getAllAdoptionRequest
);
router.get(
  "/my-adopted-pets",
  auth(UserRole.user),
  adoptionController.myAdoptedPets
);
router.post(
  "/",
  auth(UserRole.user, UserRole.admin),
  adoptionController.createAdoptionRequest
);
router.put(
  "/:requestId",
  auth(UserRole.admin, UserRole.user),
  adoptionController.updateAdoptionRequest
);

export const adoptionRouter = router;
