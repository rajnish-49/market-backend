import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { JwtPayload } from "../modules/auth/types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authorization token missing"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}

export function authorizeAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.userRole !== "ADMIN") {
    return next(new ApiError(403, "Forbidden: admins only"));
  }
  next();
}
