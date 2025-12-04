import { expressjwt } from "express-jwt";

export const auth = expressjwt({
    secret: process.env.JWT_SECRET || "supersecretkey",
    algorithms: ["HS256"],
    issuer: "http://localhost:3000",
    audience: "user",
});
