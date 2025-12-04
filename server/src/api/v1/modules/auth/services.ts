import signToken from "@/utils/jwt.js";
import type { Response } from "express";
import type { ObjectIdSchemaDefinition } from "mongoose";

export const generateToken = (userId: ObjectIdSchemaDefinition, res: Response) => {
    const token = signToken({ userId });

    // Set token in HTTP-only cookie
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, // 1 hour
    });
}