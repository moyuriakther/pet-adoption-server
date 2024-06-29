import { NextFunction, Request, Response } from "express";

export const modifyQueryMiddleware = (
  req: any,
  res: any,
  next: NextFunction
) => {
  // Modify query parameters
  if (req.query.age) {
    req.query.age = parseInt(req.query.age);
  }
  // Call next middleware or pass modified query to controller
  next();
};
