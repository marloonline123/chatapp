import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const signToken = (payload: object, options?: jwt.SignOptions): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: options?.expiresIn || "1h",
        issuer: options?.issuer || "http://localhost:3000",
        audience: options?.audience || "user",
    });
}

export default signToken;