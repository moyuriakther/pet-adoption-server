import { Request } from "express";
import prisma from "../../utils/prisma";
import { AdoptionStatus } from "@prisma/client";

const createAdoptionRequest = async (req: Request & { user?: any }) => {
  const email = req.user.email;
  const data = req.body;
  // console.log(email, data);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });
  // console.log({ userData });
  const adoptionData = {
    petId: data.petId,
    petOwnershipExperience: data.petOwnershipExperience,
    userId: userData?.id,
  };

  const result = await prisma.adoptionRequest.create({ data: adoptionData });
  return result;
};
const getAllAdoptionRequestsFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany({
    include: {
      user: true,
      pet: true,
    },
  });
  return result;
};

const myAdoptedPets = async (req: Request & { user?: any }) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: req.user.email,
    },
  });
  const result = await prisma.adoptionRequest.findMany({
    where: {
      userId: userInfo.id,
      status: AdoptionStatus.APPROVED,
    },
    include: {
      pet: true,
      user: true,
    },
  });
  return result;
};

const updateAdoptionRequestStatus = async (id: string, data: any) => {
  await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.adoptionRequest.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const adoptionServices = {
  createAdoptionRequest,
  getAllAdoptionRequestsFromDB,
  updateAdoptionRequestStatus,
  myAdoptedPets,
};
