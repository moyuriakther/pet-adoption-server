import { Request } from "express";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { UserAccountStatus, UserRole } from "@prisma/client";

const getAllUsers = async () => {
  const result = await prisma.user.findMany({});
  return result;
};

const getSingleUser = async(id: string) =>{
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
}

const createUser = async (req: Request) => {
  console.log(req.body);
  const hashPassword: string = await bcrypt.hash(req.body.password, 12);
  console.log(req.body);
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    name: req.body.name,
  };

  const result = await prisma.user.create({
    data: userData,
  });
  console.log({ result });
  return result;
};

const getUserProfile = async (req: Request & { user?: any }) => {
  const user = req.user;
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  return {
    id: isUserExist.id,
    name: isUserExist.name,
    email: isUserExist.email,
    username: isUserExist.username,
    role: isUserExist.role,
    createdAt: isUserExist.createdAt,
    updatedAt: isUserExist.updatedAt,
    needPasswordChange: isUserExist.needPasswordChange,
    photo: isUserExist.photo,
    address: isUserExist.address,
    phoneNumber: isUserExist.phoneNumber,
  };
};

const updateUserInformation = async (req: Request & { user?: any }) => {
  console.log(req.body);
  const payload = req.body;
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: req.user.email,
    },
  });
  console.log(userInfo, "userInfo");
  if (payload.email === userInfo?.email) {
    delete payload.email;
  }
  const result = await prisma.user.update({
    where: {
      email: userInfo.email,
    },
    data: payload,
  });
  console.log(result);
  return {
    id: result.id,
    name: result.name,
    email: result.email,
    username: result.username,
    role: result.role,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    needPasswordChange: result.needPasswordChange,
    photo: result.photo,
    address: result.address,
    phoneNumber: result.phoneNumber,
  };
};
const updateUserStatus = async (id: string, status: UserRole) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });
  return result;
};
const updateUserRole = async (id: string, role: UserRole) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
      // status: UserAccountStatus.Activate,
    },
  });
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: role,
  });
  return result;
};

export const userServices = {
  getAllUsers,
  getSingleUser,
  createUser,
  getUserProfile,
  updateUserInformation,
  updateUserStatus,
  updateUserRole,
};
