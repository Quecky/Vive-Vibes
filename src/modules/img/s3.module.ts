import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';

@Module({
  providers: [S3Service], // Registrar el servicio
  exports: [S3Service],   // Exportar para que otros módulos puedan usarlo
})
export class S3Module {}