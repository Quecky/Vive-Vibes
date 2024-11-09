import { BadRequestException, Injectable } from '@nestjs/common';
import { ITourRepository } from '../../application/repository/tour.repository';
import { Tour } from '../../domain/tour.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from './entities/tour.entity';
import { Repository } from 'typeorm';
import { MapperService } from '@/common/application/mapper/mapper.service';

@Injectable()
export class TourMySQLRepository implements ITourRepository {
  constructor(
    @InjectRepository(TourEntity)
    private readonly tourRepository: Repository<TourEntity>,
    private readonly mapperService: MapperService,
  ) {}

  async findAll(options?: object): Promise<Tour[]> {
    const tourEntities = await this.tourRepository.find(options);
    return tourEntities.map((tourEntity) =>
      this.mapperService.entityToClass(tourEntity, new Tour()),
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
}
