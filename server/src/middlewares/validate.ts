import type { NextFunction, Request, Response } from "express";
import { z, type ZodSchema } from "zod";

// export const validate =
//     (schema: ZodSchema) =>
//         (req: Request, res: Response, next: NextFunction) => {
//             try {
//                 const result = schema.parse({
//                     body: req.body,
//                     query: req.query,
//                     params: req.params,
//                 }) as typeof req;

//                 // sanitized & typed
//                 req.body = result.body || req.body;
//                 req.query = result.query || req.query;
//                 req.params = result.params || req.params;

//                 return next();
//             } catch (err: unknown) {
//                 return res.status(422).json({
//                     success: false,
//                     errors: err.errors, // zod validation messages
//                 });
//             }
//         };

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
        body: req.body,
    });

    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error && result.error.format() && result.error.format().body ? 
                Object.keys(result.error.format().body).map((key) => key !== '_errors' && ({ [key]: result.error.format().body[key]['_errors'][0] })).filter(Boolean) : ['Invalid request data'],
        });
    }

    req.body = result.data || {}; // sanitized

    next();
};

