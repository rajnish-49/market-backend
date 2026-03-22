import { Request, Response, NextFunction } from "express";

// Type for any async controller function
// It takes req, res, next and returns a Promise
type AsyncFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>; // resolved value is unknown 

// asyncHandler is a wrapper function
// Purpose: so we never have to write try/catch in every controller
// Usage: export const getMe = asyncHandler(async (req, res) => { ... })
export const asyncHandler = (fn: AsyncFn) => {
  // Returns a new function — this is what Express actually registers as the route handler
  return (req: Request, res: Response, next: NextFunction) => {
    // Call the original controller (fn) with req, res, next
    // Since fn is async, calling it returns a Promise
    // .catch(next) — if that Promise throws an error, forward it to Express error handler
    fn(req, res, next).catch(next);
  };
};
