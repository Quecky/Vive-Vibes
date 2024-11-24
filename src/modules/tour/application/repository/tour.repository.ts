import { Tour } from '../../domain/tour.domain';

export const TOUR_REPOSITORY = 'TOUR_REPOSITORY';
export interface ITourRepository {
  findAll(search?: string): Promise<Tour[]>;
  findById(id: number): Promise<Tour>;
  create(tour: Tour): Promise<Tour>;
  update(id: number, newTour: Tour): Promise<Tour>;
  delete(id: number): Promise<void>;
  deleteCharacteristicFromTour(
    tourId: number,
    characteristicId: number,
  ): Promise<Tour>;
  findDatesByTourId(
    tourId: number,
  ): Promise<{ fechaDisponible: string; cuposRestantes: number }[]>;
}
