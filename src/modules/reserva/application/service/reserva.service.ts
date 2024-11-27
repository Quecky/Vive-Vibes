import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from '../dto/create-reserva.dto';
import { UpdateReservaDto } from '../dto/update-reserva.dto';
import {
  IReservaRepository,
  RESERVA_REPOSITORY,
} from '../repository/reserva.repository';
import { Reserva } from '../../domain/reserva.domain';

@Injectable()
export class ReservaService {
  constructor(
    @Inject(RESERVA_REPOSITORY)
    private readonly reservaRepository: IReservaRepository,
  ) {}

  /**
   * Obtiene todas las reservas
   */
  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepository.findAll();
  }

  /**
   * Busca una reserva por ID
   * Lanza una excepción si no se encuentra
   */
  async findById(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findById(id);
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }
    return reserva;
  }

  /**
   * Crea una nueva reserva
   */
  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const reserva = new Reserva({
      ...createReservaDto,
      fechaReserva: new Date(createReservaDto.fechaReserva),
    });

    return await this.reservaRepository.create(reserva);
  }

  /**
   * Actualiza una reserva existente
   * Lanza una excepción si no se encuentra
   */
  async update(
    id: number,
    updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    // Verifica si la reserva existe
    const existingReserva = await this.findById(id);

    const reserva = new Reserva({
      ...existingReserva,
      ...updateReservaDto,
      fechaReserva: updateReservaDto.fechaReserva
        ? new Date(updateReservaDto.fechaReserva)
        : existingReserva.fechaReserva,
    });

    return await this.reservaRepository.update(id, reserva);
  }

  /**
   * Elimina una reserva por ID
   * Lanza una excepción si no se encuentra
   */
  async delete(id: number): Promise<void> {
    // Verifica si la reserva existe
    await this.findById(id);
    await this.reservaRepository.delete(id);
  }
}
