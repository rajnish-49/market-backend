import { Request, Response } from "express";
import * as authService from "./service";
import { sendSuccess } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);
  return sendSuccess(res, user, "User registered", 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  return sendSuccess(res, result, "Login successful");
});
