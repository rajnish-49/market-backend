import express from "express";

export const apiRouter = express.Router();

apiRouter.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
