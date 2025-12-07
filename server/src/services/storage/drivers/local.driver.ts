import Log from "@/utils/logger.js";
import type { StorageDriver } from "@interfaces/storage.interface.js";
import fs from "fs";
import path from "path";

export class LocalDriver implements StorageDriver {
    constructor(private basePath: string) { }

    async save(file: Express.Multer.File, folder = "") {
        const targetDir = path.join(process.cwd(), this.basePath, folder);
        await fs.promises.mkdir(targetDir, { recursive: true });

        const filePath = await this.generateUniqueName(targetDir, file.originalname);
        await fs.promises.writeFile(filePath, file.buffer);

        const fileName = path.basename(filePath);

        return {
            driver: "local",
            url: `/${folder ? folder + "/" : ""}${fileName}`,
            path: filePath,
        };
    }

    async delete(filePath: string) {
        const fullPath = path.join(process.cwd(), this.basePath, filePath);
        Log.debug(`Deleting file: ${fullPath}`);
        // if (!await this.exists(fullPath)) return;
        await fs.promises.unlink(fullPath);
    }

    async exists(filePath: string): Promise<boolean> {
        try {
            const fullPath = path.join(process.cwd(), this.basePath, filePath);
            Log.info(`Checking if file exists in local storage: ${fullPath}`);
            await fs.promises.access(fullPath);
            return true;
        } catch {
            return false;
        }
    }

    private async generateUniqueName(targetDir: string, originalName: string, attempts = 0): Promise<string> {
        const basename = path.basename(originalName);
        const ext = path.extname(originalName);
        const name = path.basename(originalName, ext);
        const uniqueName = attempts > 0 ? `${name}(${attempts})${ext}` : basename;
        const filePath = path.join(targetDir, uniqueName);

        try {
            await fs.promises.access(filePath); // file exists
            return this.generateUniqueName(targetDir, originalName, attempts + 1);
        } catch {
            return filePath;
        }
    }
}
