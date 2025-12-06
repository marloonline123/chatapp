import { z } from "zod";
import type { Express } from "express";

/**
 * Reusable Zod file validator for Multer files
 * @param options - validation options
 *   maxSize in bytes
 *   allowedTypes array of mime types
 */
export const zFile = (options?: { maxSize?: number; allowedTypes?: string[] }) =>
    z.custom<Express.Multer.File>((data: unknown) => {
        const file = data as Express.Multer.File;
        if (!file) return true; // allow undefined if optional

        if (options?.maxSize && file.size > options.maxSize) return false;
        if (options?.allowedTypes && !options.allowedTypes.includes(file.mimetype)) return false;

        return true;
    }, { message: "Invalid file" });
