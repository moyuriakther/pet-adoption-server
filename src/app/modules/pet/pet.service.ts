import { Request } from "express";
import prisma from "../../utils/prisma";
import calculatePagination from "../../utils/calculatePagination";
import { Prisma } from "@prisma/client";
import { petSearchableFields } from "./pet.constant";

const addPet = async (req: Request) => {
  const pet = req.body;
  const result = await prisma.pet.create({ data: pet });
  return result;
};
const getAllPetsFromDB = async (query: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...exactFilterData } = query;
  console.log(query, "query");
  const andConditions: Prisma.PetWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: petSearchableFields?.map((field) => ({
        [field]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(exactFilterData).length > 0) {
    andConditions.push({
      AND: Object.keys(exactFilterData).map((key) => ({
        [key]: {
          equals: exactFilterData[key],
        },
      })),
    });
  }
  andConditions.push({
    isDeleted: false,
  });
  //   console.dir(andConditions, { depth: "infinity" });

  const whereConditions: Prisma.PetWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.pet.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
  });
  const total = await prisma.pet.count({
    where: whereConditions,
  });
  return { meta: { page, limit, total }, result };
};
const getPet = async (id: string) => {
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      reviews: true
    }
  });
  return result;
};
const updatePetProfileIntoDB = async (id: string, data: any) => {
  // console.log(id, data);
  await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.pet.update({
    where: {
      id,
    },
    data,
  });
  // console.log({ result });
  return result;
};
const deletePetFromDB = async (id: string) => {
  await prisma.pet.findUniqueOrThrow({
    where: { id },
  });
  const result = await prisma.pet.delete({
    where: {
      id,
    },
  });
  return result;
};
const softDeletePetFromDB = async (id: string) => {
  await prisma.pet.findUniqueOrThrow({
    where: { id },
  });
  const result = await prisma.pet.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const petServices = {
  addPet,
  getPet,
  getAllPetsFromDB,
  updatePetProfileIntoDB,
  deletePetFromDB,
  softDeletePetFromDB,
};
