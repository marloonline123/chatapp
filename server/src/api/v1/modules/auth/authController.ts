import type { Request, Response } from "express";
import type { LoginForm, RegisterForm } from "@/api/v1/modules/auth/schema.js";
import { UserModel } from "@/api/v1/modules/auth/model.js";
import { successResponse } from "@/utils/response.js";
import bcrypt from "bcryptjs";
import { clearAuthToken, generateToken, sendWelcomeEmail } from "@/api/v1/modules/auth/services.js";
import { UserResource } from "@/api/v1/modules/auth/resource.js";
import { InvalidCredentialsException, UserExistException } from "@/exceptions/auth/index.js";

export const register = async (req: Request, res: Response) => {
    const { name, username, password, email } = req.body as RegisterForm;

    // Check if user with same username or email exists
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });

    // Throw error if user exists
    if (existingUser) throw new UserExistException();

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await UserModel.create({
        name,
        username,
        email,
        password: hashedPassword
    });

    // Generate token and set cookie
    generateToken(newUser._id, res);

    // Send welcome email
    sendWelcomeEmail(email, { name });

    return res.status(201).json(
        successResponse({
            message: req.t('auth.register_success'),
            data: {
                user: UserResource(newUser),
            }
        })
    );
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body as LoginForm;

    // Find user by username
    const user = await UserModel.findOne({ username });

    if (!user) throw new InvalidCredentialsException();

    // Check password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new InvalidCredentialsException();

    // Generate token and set cookie
    generateToken(user._id, res);

    return res.status(200).json(
        successResponse({
            message: req.t('auth.login_success'),
            data: {
                user: UserResource(user),
            }
        })
    );
};

export const logout = async (req: Request, res: Response) => {
    clearAuthToken(res);
    return res.status(200).json(successResponse({ message: req.t('auth.logout_success') }));
};