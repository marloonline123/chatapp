import signToken from "@/utils/jwt.js";
import type { CookieOptions, Response } from "express";
import type { Types } from "mongoose";

const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.APP_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000, // 1 hour
    path: '/'
}
export const generateToken = (userId: Types.ObjectId, res: Response) => {
    const token = signToken({ userId });

    // Set token in HTTP-only cookie
    res.cookie("auth_token", token, COOKIE_OPTIONS);
}

export const clearAuthToken = (res: Response) => {
    res.clearCookie('auth_token', COOKIE_OPTIONS);
}