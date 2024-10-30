import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
    const result = await reviewServices.createReview(req.body);
    //   console.log({ result });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review Added Successfully",
      data: result,
    });
  });
const getReview = catchAsync(async (req, res) => {
    const result = await reviewServices.getReview();
    //   console.log({ result });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review Retrieved Successfully",
      data: result,
    });
  });
const getAllReviews = catchAsync(async (req, res) => {
    const result = await reviewServices.getAllReview();
    //   console.log({ result });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review data Retrieved Successfully",
      data: result,
    });
  });
  export const reviewControllers = {
    createReview,
    getReview,
    getAllReviews
  }