import { Router, type Request, type Response } from "express";
import { login, logout, register } from "@/api/v1/modules/auth/authController.js";
import { validate } from "@/middlewares/validate.js";
import { loginSchema, registerSchema } from "@/api/v1/modules/auth/schema.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { auth } from "@/middlewares/auth.js";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema), asyncHandler(login));

authRouter.post("/register", validate(registerSchema), asyncHandler(register));

authRouter.post("/forgot-password", (req: Request, res: Response) => {
    res.send("Forgot password route");
});

authRouter.post("/reset-password", (req: Request, res: Response) => {
    res.send("Reset password route");
});

authRouter.post("/verify", (req: Request, res: Response) => {
    res.send("Verify route");
});

authRouter.post("/logout", auth, asyncHandler(logout));

export default authRouter;
