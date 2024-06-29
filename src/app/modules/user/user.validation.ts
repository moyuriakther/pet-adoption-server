import { UserAccountStatus, UserRole } from "@prisma/client";
import { z } from "zod";

const updateUserValidation = z.object({
  // body: z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  username: z.string().optional(),
  photo: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  // }),
});

const updateUserStatus = z.object({
  body: z.object({
    status: z.enum([UserAccountStatus.Activate, UserAccountStatus.deactivate]),
  }),
});

const updateUserRoles = z.object({
  body: z.object({
    role: z.enum([UserRole.admin, UserRole.user]),
  }),
});

export const userValidation = {
  updateUserValidation,
  updateUserStatus,
  updateUserRoles,
};
