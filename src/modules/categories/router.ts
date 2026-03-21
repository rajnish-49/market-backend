import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./controller";
import { authenticate, authorizeAdmin } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createCategorySchema, updateCategorySchema } from "./types";

const router = Router();

router.get("/", getCategories);
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  validate(createCategorySchema),
  createCategory,
);
router.patch(
  "/:id",
  authenticate,
  authorizeAdmin,
  validate(updateCategorySchema),
  updateCategory,
);
router.delete("/:id", authenticate, authorizeAdmin, deleteCategory);

export default router;
