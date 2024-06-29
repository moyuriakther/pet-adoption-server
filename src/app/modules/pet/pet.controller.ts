import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { petServices } from "./pet.service";
import pick from "../../utils/pick";
import { petsFilterableFields } from "./pet.constant";

const addPet = catchAsync(async (req, res) => {
  const result = await petServices.addPet(req);
  //   console.log({ result });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet Added Successfully",
    data: result,
  });
});

const getAllPets = catchAsync(async (req, res) => {
  const query = pick(req.query, petsFilterableFields);

  console.log(req.query, "age");
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await petServices.getAllPetsFromDB(query, options);
  console.log({ result }, "search");
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pets Data Retrieved Successfully",
    data: result.result,
    meta: result.meta,
  });
});
const getPet = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await petServices.getPet(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet Data Retrieved Successfully",
    data: result,
  });
});
const updatePetProfile = catchAsync(async (req, res) => {
  const { petId } = req.params;
  const result = await petServices.updatePetProfileIntoDB(petId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet Data Updated Successfully",
    data: result,
  });
});
const deletePet = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await petServices.deletePetFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet Deleted Successfully",
    data: result,
  });
});
const softDeletePet = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await petServices.softDeletePetFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet Softly Deleted Successfully",
    data: result,
  });
});

export const petController = {
  addPet,
  getPet,
  getAllPets,
  updatePetProfile,
  deletePet,
  softDeletePet,
};
