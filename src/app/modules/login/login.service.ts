import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../config";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";

const loginUser = async (payload: { email: string; password: string }) => {
  // console.log({payload}, 'login payload');
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  // console.log({isUserExist});
  const isPasswordCorrect: boolean = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Password incorrect");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      userId: isUserExist.id,
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.access_token_secret as Secret,
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      userId: isUserExist.id,
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.refresh_token_secret as Secret,
  );
  
  return {
    accessToken,
    refreshToken,
    needPasswordChange: isUserExist?.needPasswordChange,
  };
};

export const loginServices = {
  loginUser,
};
