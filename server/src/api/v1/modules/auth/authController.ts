import type { Request, Response } from "express";
import type { RegisterForm } from "@/api/v1/modules/auth/schema.js";
import { UserModel } from "@/api/v1/modules/auth/model.js";
import { successResponse } from "@/utils/response.js";
import bcrypt from "bcryptjs";
import { generateToken } from "@/api/v1/modules/auth/services.js";
import { UserResource } from "./resource.js";

export const register = async (req: Request, res: Response) => {
    const { body: { name, username, password, email } } = req.body as RegisterForm;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ $or: [ { username }, { email } ] })
    if (existingUser) {
        return res.status(409).json({
            message: req.t('auth.user_exists'),
        });
    }

    // Hash password using bcrypt.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await UserModel.create({
        name,
        username,
        email,
        password: hashedPassword
    });

    // Generate JWT token
    generateToken(newUser._id, res);

    return res.status(201).json(
        successResponse({
            message: req.t('auth.register_success'),
            data: {
                user: UserResource(newUser),
            }
        })
    );
}