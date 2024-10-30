import { Router } from "express";
import { reviewControllers } from "./review.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValitaion } from "./review.validaiton";

const router = Router();

router.get("/", reviewControllers.getAllReviews);
router.get("/:id", reviewControllers.getReview);
router.post(
  "/",
  validateRequest(reviewValitaion.createReviewValidation),
//   auth(UserRole.admin, UserRole.user),
  reviewControllers.createReview
);


export const reviewRouter = router;
