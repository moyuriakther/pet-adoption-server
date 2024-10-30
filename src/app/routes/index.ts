import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { loginRouter } from "../modules/login/login.router";
import { petRouter } from "../modules/pet/pet.router";
import { adoptionRouter } from "../modules/adoption/adoption.router";
import { getAdoptionRouter } from "../modules/adoption/getAdobtion.router";
import { AuthRoutes } from "../modules/auth/auth.router";
import { reviewRouter } from "../modules/review/review.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/login",
    route: loginRouter,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/pets",
    route: petRouter,
  },
  {
    path: "/adoption-request",
    route: adoptionRouter,
  },
  {
    path: "/adoption-requests",
    route: getAdoptionRouter,
  },
  {
    path: "/review",
    route: reviewRouter,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
