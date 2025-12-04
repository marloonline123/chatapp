import type { User } from "@/api/v1/modules/auth/model.js";
import type { HydratedDocument } from "mongoose";

export const UserResource = (user: HydratedDocument<User>) => ({
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    joinedAt: user.createdAt.toLocaleDateString(),
});
