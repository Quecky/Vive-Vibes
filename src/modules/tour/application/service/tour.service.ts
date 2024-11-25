import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  TOUR_REPOSITORY,
  ITourRepository,
} from '../repository/tour.repository';
import { MapperService } from '@common/application/mapper/mapper.service';
import { CreateTourDto } from '../dto/create-tour.dto';
import { Tour } from '../../domain/tour.domain';
import { UpdateTourDto } from '../dto/update-tour.dto';
import { CategoryService } from '@/modules/category/application/service/category.service';
import { Characteristic } from '@/modules/characteristics/domain/characteristic.domain';
import { CharacteristicsService } from '@/modules/characteristics/application/service/characteristics.service';
import { In } from 'typeorm';
import { ImagesAttachedsService } from '@/modules/img/application/service/img.service';

@Injectable()
export class TourService {
  constructor(
    @Inject(TOUR_REPOSITORY) private readonly tourRepository: ITourRepository,
    private readonly characteristicsService: CharacteristicsService,
    private readonly categoryService: CategoryService,
    private readonly imageAttachedService: ImagesAttachedsService,
    private readonly mapperService: MapperService,
  ) {}

  async create(createTourDto: CreateTourDto) {
    const category = await this.categoryService.findById(
      createTourDto.categoryId,
    );
    const characteristics = await this.characteristicsService.findByIds(
      createTourDto.characteristicId, // Aquí esperamos un array de IDs
    );
    if (characteristics.length !== createTourDto.characteristicId.length) {
      throw new BadRequestException('Una o más características no se encontraron');
    }

    const images = await this.imageAttachedService.finByIds(
      createTourDto.imageId, // Aquí esperamos un array de IDs
    );
    if (images.length !== createTourDto.imageId.length) {
      throw new BadRequestException('Una o más características no se encontraron');
    }

    const newTour: Tour = this.mapperService.dtoToClass(
      createTourDto,
      new Tour(),
    );

    newTour.category = category;
    newTour.characteristics = characteristics;
    newTour.images = images;

    const response = await this.tourRepository.create(newTour);
    return response;
  }

  async finById(id: number) {
    const response = await this.tourRepository.findById(id);
    return response;
  }

  async findAll() {
    const response = await this.tourRepository.findAll();
    return response;
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    let characteristic: Characteristic[];
    if (updateTourDto.characteristicId) {
      const idsQuery = {
        where: { id: In(updateTourDto.characteristicId) },
      };
      characteristic = await this.characteristicsService.findAll(idsQuery);
    }

    const tourUpdated = this.mapperService.dtoToClass(
      updateTourDto,
      new Tour(),
    );
    tourUpdated.characteristics = characteristic;
    return await this.tourRepository.update(id, tourUpdated);
  }

  async delete(id: number) {
    return this.tourRepository.delete(id);
  }
  async deleteCharacteristic(tourId: number, characteristicId: number) {
    return await this.tourRepository.deleteCharacteristicFromTour(
      tourId,
      characteristicId,
    );
  }

  async findDatesByTourId(
    tourId: number,
  ): Promise<{ fechaDisponible: string; cuposRestantes: number }[]> {
    return this.tourRepository.findDatesByTourId(tourId);
  }
}
