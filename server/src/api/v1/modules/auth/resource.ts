import type { User } from "@/api/v1/modules/auth/model.js";
import type { ObjectIdSchemaDefinition } from "mongoose";

export const UserResource = (user: User & { _id: ObjectIdSchemaDefinition }) => ({
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    joinedAt: user.createdAt.toLocaleDateString(),
});
