import { BadRequestException, Injectable } from '@nestjs/common';
import { ITourRepository } from '../../application/repository/tour.repository';
import { Tour } from '../../domain/tour.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from './entities/tour.entity';
import { Like, Repository } from 'typeorm';
import { MapperService } from '@/common/application/mapper/mapper.service';

@Injectable()
export class TourMySQLRepository implements ITourRepository {
  constructor(
    @InjectRepository(TourEntity)
    private readonly tourRepository: Repository<TourEntity>,
    private readonly mapperService: MapperService,
  ) {}

  async findAll(search?: string): Promise<Tour[]> {
    const tourEntities = await this.tourRepository.find({
      where: [
        { name: Like(`%${search}%`) },
        { country: Like(`%${search}%`) },
      ],
      relations: ['category', 'characteristics'],
    });
  
    if (!tourEntities || tourEntities.length === 0) {
      throw new BadRequestException('No tours found with the given search term');
    }
  
    return tourEntities.map((entity) =>
      this.mapperService.entityToClass(entity, new Tour()),
    );
  }
  async findById(id: number): Promise<Tour> {
    const tourEntity = await this.tourRepository.findOne({
      where: { id },
      relations: ['category', 'characteristics'],
    });
    if (!tourEntity) throw new BadRequestException('Tour not Found');

    return this.mapperService.entityToClass(tourEntity, new Tour());
  }
  async create(tour: Tour): Promise<Tour> {
    const tourEntity = this.mapperService.classToEntity(tour, new TourEntity());

    const createTourEntity = await this.tourRepository.save(tourEntity);
    return this.mapperService.entityToClass(createTourEntity, new Tour());
  }
  async update(id: number, newTour: Tour): Promise<Tour> {
    const tourEntity = await this.tourRepository.findOne({
      where: {
        id,
      },
      relations: ['characteristics'],
    });

    if (!tourEntity) throw new BadRequestException('Tour not found');

    this.tourRepository.merge(tourEntity, newTour);
    const tourUpdated: Tour = await this.tourRepository.save(tourEntity);
    return this.mapperService.entityToClass(tourUpdated, new Tour());
  }
  async delete(id: number): Promise<void> {
    const tourEntity = await this.tourRepository.findOne({
      where: {
        id,
      },
    });

    if (!tourEntity) throw new BadRequestException('Tour Not Found');

    await this.tourRepository.delete(id);
  }

  async deleteCharacteristicFromTour(
    tourId: number,
    characteristicId: number,
  ): Promise<Tour> {
    const tourEntity = await this.tourRepository.findOne({
      where: { id: tourId },
      relations: ['characteristics'],
    });

    if (!tourEntity) {
      throw new BadRequestException('Tour not found');
    }
    tourEntity.characteristics = tourEntity.characteristics.filter(
      (characteristic) => characteristic.id !== characteristicId,
    );

    const updatedTourEntity = await this.tourRepository.save(tourEntity);

    return this.mapperService.entityToClass(updatedTourEntity, new Tour());
  }

  async findDatesByTourId(
    tourId: number,
  ): Promise<{ fechaDisponible: string; cuposRestantes: number }[]> {
    const tour = await this.tourRepository.findOne({
      where: { id: tourId },
      relations: ['fechasExperiencia'],
    });

    if (!tour) {
      throw new BadRequestException('Tour not found');
    }

    return tour.fechasExperiencia.map((fecha) => ({
      fechaDisponible: fecha.fechaDisponible,
      cuposRestantes: fecha.cupos,
    }));
  }
}
