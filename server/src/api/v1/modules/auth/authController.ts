import type { Request, Response } from "express";
import type { RegisterForm } from "@/api/v1/modules/auth/schema.js";
import { UserModel } from "@/api/v1/modules/auth/model.js";
import { errorResponse, successResponse } from "@/utils/response.js";
import bcrypt from "bcryptjs";
import { generateToken } from "@/api/v1/modules/auth/services.js";
import { UserResource } from "./resource.js";
import Log from "@/utils/logger.js";
import UserExistException from "@/exceptions/auth/UserExistException.js";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, username, password, email } = req.body as RegisterForm;

        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            throw new UserExistException();
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        generateToken(newUser._id, res);

        return res.status(201).json(
            successResponse({
                message: req.t('auth.register_success'),
                data: {
                    user: UserResource(newUser),
                }
            })
        );

    } catch (error) {
        if (error instanceof UserExistException) {
            return res.status(409).json(
                errorResponse({ message: req.t(error.message) })
            );
        }

        Log.error("Registration error:", {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            body: req.body,
        });

        return res.status(500).json(
            errorResponse({ message: req.t('auth.register_error') })
        );
    }
};
