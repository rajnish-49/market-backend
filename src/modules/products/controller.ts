import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/apiResponse";
import * as productService from "./service";

function parseProductId(idParam: unknown) {
  if (typeof idParam !== "string") {
    throw new ApiError(400, "Invalid product id");
  }

  const id = Number(idParam);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, "Invalid product id");
  }

  return id;
}

export const getProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();
    return sendSuccess(res, products, "Products fetched");
  },
);

export const getProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseProductId(req.params.id);
    const product = await productService.getProductById(id);
    return sendSuccess(res, product, "Product fetched");
  },
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const prod = await productService.createProduct(req.body);
    return sendSuccess(res, prod, "Product created", 201);
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseProductId(req.params.id);
    const prod = await productService.updateProduct(id, req.body);
    return sendSuccess(res, prod, "Product updated");
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseProductId(req.params.id);
    await productService.deleteProduct(id);
    return sendSuccess(res, null, "Product deleted");
  },
);
