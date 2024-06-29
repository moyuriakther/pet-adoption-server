import { Router } from "express";
import { petController } from "./pet.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { petValidation } from "./pet.validation";
import { modifyQueryMiddleware } from "../../middlewares/modifyQuery";

const router = Router();

router.get("/", modifyQueryMiddleware, petController.getAllPets);
router.get("/:id", auth(UserRole.admin, UserRole.user), petController.getPet);
router.post(
  "/",
  validateRequest(petValidation.createPetValidation),
  auth(UserRole.admin),
  petController.addPet
);
router.put("/:petId", auth(UserRole.admin), petController.updatePetProfile);
router.delete("/:id", auth(UserRole.admin), petController.deletePet);
router.delete("/:id/soft", auth(UserRole.admin), petController.softDeletePet);

export const petRouter = router;
