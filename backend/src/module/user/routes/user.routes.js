import { Router } from "express";
import { asyncHandler } from "../../../shared/middleware/async.handler.js";
import { myProfile } from "../controller/user.controllers.js";

const router = Router();

router.get("/me", asyncHandler(myProfile));

export default router;
