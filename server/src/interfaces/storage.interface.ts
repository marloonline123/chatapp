export interface StorageDriver {
    save(file: Express.Multer.File, folder?: string): Promise<SaveFileResult>;
    delete(fileIdentifier: string): Promise<void>;
    exists(fileIdentifier: string): Promise<boolean>;
}

interface SaveFileResult {
    driver: string;
    url: string;
    key?: string;
}

export interface StorageOptions {
    driver?: "local" | "s3";
    folder?: string;
}