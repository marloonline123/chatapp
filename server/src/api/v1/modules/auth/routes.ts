import { Router, type Request, type Response } from "express";
import { register } from "@/api/v1/modules/auth/authController.js";
import { validate } from "@/middlewares/validate.js";
import { registerSchema } from "@/api/v1/modules/auth/schema.js";

const authRouter = Router();

// GET /login
authRouter.get("/login", (req: Request, res: Response) => {
    res.send("Login route");
});

authRouter.post("/register", validate(registerSchema), register);

// POST /forgot-password
authRouter.post("/forgot-password", (req: Request, res: Response) => {
    res.send("Forgot password route");
});

// POST /reset-password
authRouter.post("/reset-password", (req: Request, res: Response) => {
    res.send("Reset password route");
});

// POST /verify
authRouter.post("/verify", (req: Request, res: Response) => {
    res.send("Verify route");
});

// POST /logout
authRouter.post("/logout", (req: Request, res: Response) => {
    res.send("Logout route");
});

export default authRouter;
