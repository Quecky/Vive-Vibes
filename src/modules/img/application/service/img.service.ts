import { Inject, Injectable } from '@nestjs/common';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { IImagenAttachedRepository, IMAGEN_REPOSITORY } from '../repository/img.repository';
import { CreateImagenDto } from '../dto/create-imagen.dto';
import { ImagenAttached } from '../../domain/img.domain';
import { UpdateImagenDto } from '../dto/update-imagen.dto';

@Injectable()
export class ImagesAttachedsService {
    constructor(
    @Inject(IMAGEN_REPOSITORY)
    private readonly imagenAttachedRepository: IImagenAttachedRepository,
    private readonly mapperService: MapperService,
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
}
