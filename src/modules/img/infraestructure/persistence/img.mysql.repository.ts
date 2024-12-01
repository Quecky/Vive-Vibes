import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { IImagenAttachedRepository } from '../../application/repository/img.repository';
import { ImageEntity } from './entities/img.entity';
import { ImagenAttached } from '../../domain/img.domain';

@Injectable()
export class ImageAttachedMysqlRepository
    implements IImagenAttachedRepository
{
    constructor(
    @InjectRepository(ImageEntity)
    private readonly imagenAttachedRepository: Repository<ImageEntity>,
    private readonly mapperService: MapperService,
    ) {}
    async findAll(options?: object): Promise<ImagenAttached[]> {
    const imageEntity =
        await this.imagenAttachedRepository.find(options);
    return imageEntity.map((ImageEntity) =>
        this.mapperService.entityToClass(
        ImageEntity,
        new ImagenAttached(),
        ),
    );
    }

    async findById(id: number): Promise<ImagenAttached> {
    const imageEntity = await this.imagenAttachedRepository.findOne({
        where: { id },
    });
    if (!imageEntity)
        throw new BadRequestException('Image not Found');

    return this.mapperService.entityToClass(
        imageEntity,
        new ImagenAttached(),
    );
    }
    
    async findByIds(ids: number[]): Promise<ImagenAttached[]> {
        if (!ids || ids.length === 0) {
            throw new BadRequestException('No image IDs provided');
        }
        const images = await this.imagenAttachedRepository.find({
            where: { id: In(ids) }, 
        });
    
        if (images.length !== ids.length) {
            throw new BadRequestException('Some images not found');
        }
        return images;
        }
    

    async create(imagenAttached: ImagenAttached): Promise<ImagenAttached> {
    const imageAttachedEntity = this.mapperService.classToEntity(
        imagenAttached,
        new ImageEntity(),
    );

    const createImageAttachedEntity =
        await this.imagenAttachedRepository.save(imageAttachedEntity);

    return this.mapperService.entityToClass(
        createImageAttachedEntity,
        new ImagenAttached(),
    );
    }

    async update(
    id: number,
    newImageAttached: ImagenAttached,
    ): Promise<ImagenAttached> {
    const imageAttachedEntity = await this.imagenAttachedRepository.findOne({
        where: {
        id,
        },
    });

    if (!imageAttachedEntity)
        throw new BadRequestException('Image not found');

    this.imagenAttachedRepository.merge(
        imageAttachedEntity,
        newImageAttached,
    );
    const imageAttachedUpdated: ImageEntity =
        await this.imagenAttachedRepository.save(imageAttachedEntity);
    return this.mapperService.entityToClass(
        imageAttachedUpdated,
        new ImagenAttached(),
    );
    } 

    async delete(id: number): Promise<void> {
    const imageAttachedEntity = await this.imagenAttachedRepository.findOne({
        where: {
        id,
        },
    });

    if (!imageAttachedEntity)
        throw new BadRequestException('Image Not Found');

    await this.imagenAttachedRepository.delete(id);
    }
}
