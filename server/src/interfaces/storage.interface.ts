export interface StorageDriver {
    save(file: Express.Multer.File, folder?: string): Promise<any>;
    delete(fileIdentifier: string): Promise<void>;
}

export interface StorageOptions {
    driver?: "local" | "s3";
    folder?: string;
}