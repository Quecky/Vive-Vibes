import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class TourService {
  constructor(
    @Inject(TOUR_REPOSITORY) private readonly tourRepository: ITourRepository,
    private readonly characteristicsService: CharacteristicsService,
    private readonly categoryService: CategoryService,
    private readonly mapperService: MapperService,
  ) {}

  async create(createTourDto: CreateTourDto) {
    const category = await this.categoryService.finById(
      createTourDto.categoryId,
    );
    const newTour: Tour = this.mapperService.dtoToClass(
      createTourDto,
      new Tour(),
    );
    newTour.category = category;
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
}
