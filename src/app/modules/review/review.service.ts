import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";

  const createReview = async (payload: any) => {
    const createReview = await prisma.review.create({data:payload});   
      return createReview;
    };

const getReview = async() =>{
    const petReviews = await prisma.pet.findUnique({
        where: { id: "pet-uuid" },
        include: { reviews: true },
        });
        return petReviews;
    }
const getAllReview = async() =>{
    const result = await prisma.review.findMany({});
    return result;
}

export const reviewServices = {
    createReview,
    getReview,
    getAllReview
}  