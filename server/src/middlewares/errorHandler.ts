import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "@/utils/response.js";
import Log from "@/utils/logger.js";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500;

    // If it's a known custom exception
    if (err.status) {
        return res.status(status).json(
            errorResponse({
                message: req.t(err.message),
                code: status
            })
        );
    }

    // All other unexpected errors
    Log.error("Unhandled Error:", {
        error: err.message,
        stack: err.stack,
    });

    return res.status(500).json(
        errorResponse({
            message: req.t("errors.internal_server_error"),
            code: 500
        })
    );
};
