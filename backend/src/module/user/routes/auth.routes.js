import { Router } from "express";
import { asyncHandler } from "../../../shared/middleware/async.handler.js";
import { loginUser, registerUser } from "../controller/user.controllers.js";
import { validate } from "../../../shared/middleware/validate.js";
import { loginSchema, registerSchema } from "../dto/user.dto.js";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(registerUser));
router.post("/login", validate(loginSchema), asyncHandler(loginUser));

export default router;
