import { Router } from "express";
import { adoptionController } from "./adoption.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  auth(UserRole.user, UserRole.admin),
  adoptionController.createAdoptionRequest
);
// router.get(
//   "/adoption-requests",
//   auth(),
//   adoptionController.getAllAdoptionRequest
// );
router.put(
  "/:requestId",
  auth(UserRole.admin, UserRole.user),
  adoptionController.updateAdoptionRequest
);

export const adoptionRouter = router;
