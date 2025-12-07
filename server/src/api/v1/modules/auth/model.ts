import mongoose, { type InferSchemaType } from "mongoose";

const { Schema } = mongoose;

const UserMigrationSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: false },
    profilePicture: { type: String, required: false },
    password: { type: String, required: true },
}, { timestamps: true });

export const UserModel = mongoose.model("User", UserMigrationSchema);
export type User = InferSchemaType<typeof UserMigrationSchema>;