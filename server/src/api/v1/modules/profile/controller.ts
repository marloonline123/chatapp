import type { Request, Response } from "express";
import type { PasswordForm, ProfileForm } from "@v1Modules/profile/schema.js";
import { successResponse } from "@/utils/response.js";
import { UserModel } from "@v1Modules/auth/model.js";
import { UserResource } from "@v1Modules/auth/resource.js";
import { StorageService } from "@storage/index.js";
import { InvalidPasswordException, UserNotFoundException } from "@/exceptions/auth/index.js";
import bcrypt from "bcryptjs";
import Log from "@/utils/logger.js";

export const updateProfile = async (req: Request, res: Response) => {
    const { name, username, email, bio } = req.body as ProfileForm['body'];
    const userId = req.auth.userId;
    const files = req.files as Express.Multer.File[];
    const profilePicture = files?.find(f => f.fieldname === "profilePicture");

    let updateData: ProfileForm['body'] = { name, username, email, bio };

    let user = await UserModel.findById(userId);

    if (!user) throw new UserNotFoundException();

    // upload profile picture
    if (profilePicture) {
        const storage = new StorageService();
        const profilePictureUrl = await storage.save(profilePicture, "profile-pictures");
        updateData.profilePicture = profilePictureUrl.path;
        if (await storage.exists(user.profilePicture)) await storage.delete(user.profilePicture);
    }

    await user.updateOne(updateData, { new: true }).exec();

    user = await UserModel.findById(userId);

    return res.status(200).json(successResponse({
        message: "Profile updated successfully",
        data: {
            user: UserResource(user!),
        }
    }));
}

export const updatePassword = async (req: Request, res: Response) => {
    const { currentPassword, newPassword, newPasswordConfirmation } = req.body as PasswordForm['body'];
    const userId = req.auth.userId;

    const user = await UserModel.findById(userId);

    if (!user) throw new UserNotFoundException();

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) throw new InvalidPasswordException();

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json(successResponse({ message: "Password updated successfully" }));
}