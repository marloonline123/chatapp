import multer from "multer";
import { storageConfig } from "@config/storage.js";
import type { NextFunction, Request, Response } from "express";
import Log from "@/utils/logger.js";

export const multerMiddleware = () => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: storageConfig.local.maxFileSize },
        fileFilter: (req, file, cb) => {
            if (storageConfig.local.allowedMimeTypes.includes(file.mimetype)) {
                Log.debug("File accepted");
                return cb(null, true);
            }
            return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
        },
    }).any();

    return (req: Request, res: Response, next: NextFunction) => {
        const contentType = req.headers["content-type"] || "";

        if (!contentType.includes("multipart/form-data")) {
            return next();
        }

        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    status: "error",
                    message: err.message,
                });
            }

            if (err) {
                return res.status(500).json({
                    status: "error",
                    message: "File upload error",
                });
            }

            next();
        });
    };
};
