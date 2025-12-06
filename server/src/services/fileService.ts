import { storageConfig } from "@/config/storage.js";
import type { StorageOptions } from "@interfaces/storage.interface.js";
import fs from "fs";
import path from "path";

export class FileService {
    private defaultDriver: string;
    private defaultFolder: string;

    constructor() {
        this.defaultDriver = storageConfig.driver;
        this.defaultFolder = storageConfig.local.basePath;
    }

    private getDriver(options?: StorageOptions) {
        return options?.driver || this.defaultDriver;
    }

    private getFolder(options?: StorageOptions) {
        return options?.folder || this.defaultFolder;
    }

    async saveFile(file: Express.Multer.File, options?: StorageOptions) {
        const driver = this.getDriver(options);
        const folder = this.getFolder(options);

        if (driver === "local") {
            const folderPath = path.join(process.cwd(), folder);
            if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

            const filePath = path.join(folderPath, file.originalname);
            const writeStream = fs.createWriteStream(filePath);

            return new Promise<{ driver: string; filePath: string }>((resolve, reject) => {
                writeStream.write(file.buffer, (err) => {
                    if (err) reject(err);
                    else resolve({ driver, filePath });
                });
                writeStream.end();
            });
        }

        if (driver === "s3") {
            // TODO: S3 logic using AWS SDK streams
            return { driver, url: "s3-url-placeholder" };
        }
    }

    async deleteFile(filePath: string, options?: StorageOptions) {
        const driver = this.getDriver(options);

        if (driver === "local") {
            await fs.promises.unlink(filePath);
        }

        if (driver === "s3") {
            // TODO: S3 delete logic
        }
    }
}
