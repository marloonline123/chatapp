import { zFile } from "@/api/rules/multer.js";
import z from "zod";

export const profileSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(100).optional(),
        username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, "Username must be alphanumeric and can contain only '_' as a special character").optional(),
        email: z.string().email().optional(),
        bio: z.string().max(160).optional(),
        profilePicture: zFile().optional(),
    }),
});

export const passwordSchema = z.object({
    body: z.object({
        currentPassword: z.string().min(8).max(100),
        newPassword: z.string().min(8).max(100),
        newPasswordConfirmation: z.string().min(8).max(100)
    }).refine((data) => data.newPassword === data.newPasswordConfirmation, {
        message: "Passwords do not match", path: ["newPasswordConfirmation"]
    }),
});


export type ProfileForm = z.infer<typeof profileSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;