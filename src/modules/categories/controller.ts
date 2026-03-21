import { Request, Response } from "express";
import * as categoryService from "./service";
import { sendSuccess } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";

function parseCategoryId(idParam: unknown) {
  if (typeof idParam !== "string") {
    throw new ApiError(400, "Invalid category id");
  }

  const id = Number(idParam);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, "Invalid category id");
  }

  return id;
}

export const getCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();
    return sendSuccess(res, categories, "Categories fetched");
  },
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await categoryService.createCategory(req.body);
    return sendSuccess(res, category, "Category created", 201);
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseCategoryId(req.params.id);
    const category = await categoryService.updateCategory(id, req.body);
    return sendSuccess(res, category, "Category updated");
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseCategoryId(req.params.id);
    await categoryService.deleteCategory(id);
    return sendSuccess(res, null, "Category deleted");
  },
);
