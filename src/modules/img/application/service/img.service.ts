import { Inject, Injectable } from '@nestjs/common';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { IImagenAttachedRepository, IMAGEN_REPOSITORY } from '../repository/img.repository';
import { CreateImagenDto } from '../dto/create-imagen.dto';
import { ImagenAttached } from '../../domain/img.domain';
import { UpdateImagenDto } from '../dto/update-imagen.dto';
import { S3Service } from '@/modules/img/s3.service';
import * as sharp from 'sharp';

@Injectable()
export class ImagesAttachedsService {
    constructor(
    @Inject(IMAGEN_REPOSITORY)
    private readonly imagenAttachedRepository: IImagenAttachedRepository,
    private readonly mapperService: MapperService,    
    private readonly s3Service: S3Service,
    ) {}

    async create(createImagenDto: CreateImagenDto) {
    const newImagenAttached: ImagenAttached = this.mapperService.dtoToClass(
        createImagenDto,
        new ImagenAttached(),
    );
    const response =
        await this.imagenAttachedRepository.create(newImagenAttached);
    return response;
    }

    async finById(id: number) {
    const response = await this.imagenAttachedRepository.findById(id);
    return response;
    }

    async finByIds(ids: number[]) {
        const response = await this.imagenAttachedRepository.findByIds(ids);
        return response;
        }

    async findAll(options?: object) {
    const response = await this.imagenAttachedRepository.findAll(options);
    return response;
    }

    async update(id: number, updateImagenDto: UpdateImagenDto) {
    const imagenAttachedUpdated = this.mapperService.dtoToClass(
        updateImagenDto,
        new ImagenAttached(),
    );
    return await this.imagenAttachedRepository.update(
        id,
        imagenAttachedUpdated,
    );
    }

    async delete(id: number) {
    return this.imagenAttachedRepository.delete(id);
    }

    
    async uploadImages(files: Express.Multer.File[]): Promise<ImagenAttached[]> {
        const uploadedImages: ImagenAttached[] = [];
    
        for (const file of files) {
            const processedImage = await sharp(file.buffer)
            .resize({ width: 1000, height: 1000, fit: 'contain' })
            .toBuffer();

            const url = await this.s3Service.uploadImage(
                processedImage,
                file.originalname,
                file.mimetype,
            );

            const image: ImagenAttached = new ImagenAttached();
            image.name = file.originalname;  
            image.url = url;          
    
            uploadedImages.push(image);
        }
    
        return uploadedImages;
    }
}
