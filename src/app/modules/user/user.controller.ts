import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();
  console.log({ result });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users Retrieved Successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await userServices.getSingleUser(id);
  console.log({ result });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data Retrieved Successfully",
    data: result,
  });
});

const createUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await userServices.createUser(req);
  console.log({ result });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully",
    data: {
      id: result.id,
      name: result.name,
      username: result.username,
      email: result.email,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  });
});

const userProfile = catchAsync(async (req, res) => {
  // console.log({ req }, "profile");
  const result = await userServices.getUserProfile(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});
const updateUserInformation = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await userServices.updateUserInformation(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});
const updateUserStatus = catchAsync(async (req, res) => {
  // console.log(req);
  const id = req.params.id;

  const result = await userServices.updateUserStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Status updated successfully",
    data: result,
  });
});
const updateUserRole = catchAsync(async (req, res) => {
  // console.log(req);
  const id = req.params.id;

  const result = await userServices.updateUserRole(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Role updated successfully",
    data: result,
  });
});

export const userController = {
  getAllUsers,
  getSingleUser,
  createUser,
  userProfile,
  updateUserInformation,
  updateUserStatus,
  updateUserRole,
};
