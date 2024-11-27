import { Reserva } from '../../domain/reserva.domain';
export const RESERVA_REPOSITORY = 'RESERVA_REPOSITORY';

export interface IReservaRepository {
  findAll(): Promise<Reserva[]>;
  findById(id: number): Promise<Reserva>;
  create(reserva: Reserva): Promise<Reserva>;
  update(id: number, reserva: Reserva): Promise<Reserva>;
  delete(id: number): Promise<void>;
}
