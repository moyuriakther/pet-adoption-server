import { Response } from "express";

type TMeta = {
  limit: number;
  page: number;
  total: number;
};
type TResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  meta?: TMeta;
  data: T | null | undefined;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  });
};

export default sendResponse;
