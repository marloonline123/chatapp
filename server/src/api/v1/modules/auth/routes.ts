import { Router, type Request, type Response } from "express";

const authRouter = Router();

// GET /login
authRouter.get("/login", (req: Request, res: Response) => {
    res.send("Login route");
});

// POST /register
authRouter.post("/register", (req: Request, res: Response) => {
    res.send("Register route");
});

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
