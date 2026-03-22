import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  stock: z.number().int().min(0, "Stock must be 0 or more"),
  price: z.number().positive("Price must be greater than 0"),
  categoryId: z.number().int().positive("Valid categoryId is required"),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
