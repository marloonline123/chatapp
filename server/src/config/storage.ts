export const storageConfig = {
    driver: process.env.STORAGE_DRIVER || "local", // local | s3 | etc
    local: {
        basePath: process.env.LOCAL_STORAGE_PATH || "public",
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedMimeTypes: ["image/jpeg", "image/png", "application/pdf"],
    },
    s3: {
        key: process.env.AWS_ACCESS_KEY_ID || "",
        secret: process.env.AWS_SECRET_ACCESS_KEY || "",
        region: process.env.AWS_REGION || "us-east-1",
        bucket: process.env.AWS_BUCKET || "",
        basePath: process.env.AWS_BASE_PATH || "",
    },
};
