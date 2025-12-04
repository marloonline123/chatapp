import type { NextFunction, Request, Response } from "express";

// Middleware wrapper to handle async errors by wrapping them with a try-catch block
// and passing errors to the next middleware (which is the error handler)

interface CallBackType {
    (req: Request, res: Response, next?: NextFunction): Promise<void>| any;
}

export const asyncHandler = (fn: CallBackType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
