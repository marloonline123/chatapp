import { auth } from "@middlewares/auth.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { Router } from "express";
import { updatePassword, updateProfile } from "@v1Modules/profile/controller.js";
import { validate } from "@middlewares/validate.js";
import { passwordSchema, profileSchema } from "@v1Modules/profile/schema.js";

const router = Router();

router.patch("/", auth, validate(profileSchema), asyncHandler(updateProfile));
router.patch("/password", auth, validate(passwordSchema), asyncHandler(updatePassword));

export default router;
