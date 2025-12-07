import { storageConfig } from "@/config/storage.js";
import { S3Driver } from "@/services/storage/drivers/s3.driver.js";
import { LocalDriver } from "@/services/storage/drivers/local.driver.js";


export class StorageService {
    private driver: any;

    constructor() {
        if (storageConfig.driver === "s3") {
            this.driver = new S3Driver(storageConfig.s3);
        } else {
            this.driver = new LocalDriver(storageConfig.local.basePath);
        }
    }

    save(file: Express.Multer.File, folder?: string|null|undefined) {
        if (!file) return null;
        return this.driver.save(file, folder);
    }

    delete(identifier: string|null|undefined) {
        if (!identifier) return null;
        return this.driver.delete(identifier);
    }

    exists(identifier: string|null|undefined) {
        if (!identifier) return null;
        return this.driver.exists(identifier);
    }
}
