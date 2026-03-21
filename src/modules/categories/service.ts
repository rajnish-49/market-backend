import prisma from "../../db/client";
import { ApiError } from "../../utils/ApiError";
import { CreateCategoryInput, UpdateCategoryInput } from "./types";

export async function getAllCategories() {
  return prisma.category.findMany();
}

export async function createCategory(data: CreateCategoryInput) {
  return prisma.category.create({ data });
}

export async function updateCategory(id: number, data: UpdateCategoryInput) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new ApiError(404, "Category not found");
  return prisma.category.update({ where: { id }, data });
}

export async function deleteCategory(id: number) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new ApiError(404, "Category not found");
  return prisma.category.delete({ where: { id } });
}