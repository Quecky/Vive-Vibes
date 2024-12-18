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
import { FilterTourDto } from '../dto/filter-tour.dto';
import { FechaExperienciaEntity } from '../../infrastructure/persistence/entities/fechaExperiencia.entity';

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
    if (createTourDto.experienceDates) {
      newTour.fechasExperiencia = createTourDto.experienceDates.map((date) => {
        const fechaEntity = new FechaExperienciaEntity();

        fechaEntity.fechaDisponible = date.toString().split('T')[0];
        fechaEntity.cupos = createTourDto.slots; // Usar slots del DTO
        return fechaEntity;
      });
    }

    const response = await this.tourRepository.create(newTour);
    return response;
  }

  async finById(id: number) {
    const response = await this.tourRepository.findById(id);
    return response;
  }

  async findAll(filters: FilterTourDto) {
    const response = await this.tourRepository.findAll(filters);
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

  async findAvailableDatesByTourId(
    tourId: number,
  ): Promise<{ id: number; fecha: string; cuposRestantes: number }[]> {
    return this.tourRepository.findAvailableDatesByTourId(tourId);
  }
}
