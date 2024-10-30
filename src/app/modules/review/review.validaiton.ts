import { z } from "zod";

const createReviewValidation = z.object({
    body: z.object({
      userId:z.string(),
      petId:z.string(),
      rating:z.number().int().nonnegative().default(0),
      comment:z.string(),
    }),
  });

export const reviewValitaion = {
    createReviewValidation
}