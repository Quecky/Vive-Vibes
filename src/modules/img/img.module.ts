import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@/common/common.module';
import { ImageEntity } from './infraestructure/persistence/entities/img.entity';
import { ImagesAttachedController } from './interface/img.controller';
import { ImagesAttachedsService } from './application/service/img.service';
import { IMAGEN_REPOSITORY } from './application/repository/img.repository';
import { ImageAttachedMysqlRepository } from './infraestructure/persistence/img.mysql.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ImageEntity]), CommonModule],
    controllers: [ImagesAttachedController],
    providers: [
    ImagesAttachedsService,
    {
        provide: IMAGEN_REPOSITORY,
        useClass: ImageAttachedMysqlRepository,
    },
    ],
    exports: [ImagesAttachedsService],
})
export class ImageAttachedModule {}
