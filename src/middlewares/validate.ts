import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { ApiError } from "../utils/ApiError";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues[0]?.message || "Validation failed";
      return next(new ApiError(422, message));
    }
    next();
  };
};
