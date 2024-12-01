import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucketName = process.env.AWS_BUCKET_NAME;

    constructor() {
    this.s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    }

    async uploadImage(file: Buffer, filename: string, mimeType: string): Promise<string> {
    const key = `${uuidv4()}-${filename}`;

    const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: mimeType,
    });

    await this.s3.send(command);

    // Devuelve la URL del archivo subido
    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
}
