import Log from "@/utils/logger.js";
import type { NextFunction, Request, Response } from "express";
import { type ZodSchema } from "zod";


export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
        body: req.body,
    });

    if (!result.success) {
        const formatted = result.error.format();
        const bodyErrors = formatted.body;
        const errors = bodyErrors
            ? Object.entries(bodyErrors)
                .filter(([key]) => key !== '_errors')
                .map(([key, value]) => ({
                    [key]: (value as {_errors: string[]})._errors[0]
                }))
            : [{ message: 'Invalid request data' }];

        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    req.body = result.data?.body || {}; // sanitized

    next();
};

