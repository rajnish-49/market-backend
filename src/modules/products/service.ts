import prisma from "../../db/client";
import { ApiError } from "../../utils/ApiError";
import { CreateProductInput, UpdateProductInput } from "./types";

export async function getAllProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
    },
  });
}

export async function getProductById(id: number) {
  const prod = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!prod) {
    throw new ApiError(404, "Product not found");
  }

  return prod;
}

export async function createProduct(data: CreateProductInput) {
  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return prisma.product.create({
    data,
  });
}

export async function updateProduct(id: number, data: UpdateProductInput) {
  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new ApiError(404, "Product not found");
  }

  if (data.categoryId !== undefined) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new ApiError(404, "Category not found");
    }
  }

  return prisma.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: number) {
  const prod = await prisma.product.findUnique({
    where: { id },
  });

  if (!prod) {
    throw new ApiError(404, "Product not found");
  }

  return prisma.product.delete({
    where: { id },
  });
}

