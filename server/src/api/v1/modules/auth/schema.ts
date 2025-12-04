import z from "zod";

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(100),
        username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
        password: z.string().min(8).max(100),
        email: z.string().email(),
    })
});

export const loginSchema = z.object({
    body: z.object({
        username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
        password: z.string().min(8).max(100),
    })
});

export type RegisterForm = z.infer<typeof registerSchema>["body"];
export type LoginForm = z.infer<typeof loginSchema>["body"];
