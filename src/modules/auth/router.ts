import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { registerSchema, loginSchema } from "./types";
import { register, login } from "./controller";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;