import express from "express";
import authRouter from "../../modules/auth/router";
import categoryRouter from "../../modules/categories/router";
import productRouter from "../../modules/products/router";

export const apiRouter = express.Router();

apiRouter.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/products", productRouter);
