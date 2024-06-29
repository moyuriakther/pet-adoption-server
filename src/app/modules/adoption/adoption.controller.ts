import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adoptionServices } from "./adoption.service";

const createAdoptionRequest = catchAsync(async (req, res) => {
  // console.log(req, "user");
  const result = await adoptionServices.createAdoptionRequest(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption request submitted successfully",
    data: result,
  });
});
const getAllAdoptionRequest = catchAsync(async (req, res) => {
  const result = await adoptionServices.getAllAdoptionRequestsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});
const myAdoptedPets = catchAsync(async (req, res) => {
  const result = await adoptionServices.myAdoptedPets(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Adopted Pets Data Retrieved successfully",
    data: result,
  });
});
const updateAdoptionRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const result = await adoptionServices.updateAdoptionRequestStatus(
    requestId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption request updated successfully",
    data: result,
  });
});

export const adoptionController = {
  createAdoptionRequest,
  getAllAdoptionRequest,
  updateAdoptionRequest,
  myAdoptedPets,
};
