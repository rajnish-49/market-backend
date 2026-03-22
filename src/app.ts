import express from "express";
import { apiRouter } from "./api/routes";
import { errorHandler } from "./middlewares/error";

const app = express();

app.use(express.json());
app.use("/api/v1", apiRouter);
app.use(errorHandler);

export default app;
