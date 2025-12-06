import type { StorageDriver } from "@interfaces/storage.interface.js";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";


export class S3Driver implements StorageDriver {
    private s3: S3Client;

    constructor(private config: any) {
        this.s3 = new S3Client({
            region: config.region,
            credentials: {
                accessKeyId: config.key,
                secretAccessKey: config.secret,
            },
        });
    }

    async save(file: Express.Multer.File, folder = "") {
        const key = `${folder}/${Date.now()}_${file.originalname}`;

        await this.s3.send(
            new PutObjectCommand({
                Bucket: this.config.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        );

        return {
            driver: "s3",
            url: `https://${this.config.bucket}.s3.amazonaws.com/${key}`,
            key,
        };
    }

    async delete(key: string) {
        await this.s3.send(
            new DeleteObjectCommand({
                Bucket: this.config.bucket,
                Key: key,
            })
        );
    }
}
