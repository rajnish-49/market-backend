import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./controller";
import { authenticate, authorizeAdmin } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createProductSchema , updateProductSchema} from "./types";


const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authenticate , authorizeAdmin, validate(createProductSchema) , createProduct);
router.put("/:id",authenticate,
  authorizeAdmin,
  validate(updateProductSchema),
  updateProduct,
);
router.delete("/:id", authenticate , authorizeAdmin ,deleteProduct);

export default router;