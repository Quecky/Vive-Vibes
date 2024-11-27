import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IReservaRepository } from '../../application/repository/reserva.repository';
import { Reserva } from '../../domain/reserva.domain';
import { ReservaEntity } from './entities/reserva.entity';

@Injectable()
export class ReservaMySQLRepository implements IReservaRepository {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepository: Repository<ReservaEntity>,
  ) {}

  // Obtener todas las reservas
  async findAll(): Promise<Reserva[]> {
    const reservas = await this.reservaRepository.find({
      relations: ['tour', 'usuario'],
    });
    return reservas.map(
      (entity) =>
        new Reserva({
          id: entity.id,
          tourId: entity.tour.id,
          usuarioId: entity.usuario.id,
          fechaReserva: entity.fechaReserva,
          cantidadPersonas: entity.cantidadPersonas,
          estado: entity.estado,
        }),
    );
  }

  // Obtener una reserva por ID
  async findById(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['tour', 'usuario'],
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva with ID ${id} not found`);
    }
    return new Reserva({
      id: reserva.id,
      tourId: reserva.tour.id,
      usuarioId: reserva.usuario.id,
      fechaReserva: reserva.fechaReserva,
      cantidadPersonas: reserva.cantidadPersonas,
      estado: reserva.estado,
    });
  }

  // Crear una nueva reserva
  async create(reserva: Reserva): Promise<Reserva> {
    // Validación de IDs antes de crear la reserva
    if (!reserva.tourId || !reserva.usuarioId) {
      throw new NotFoundException('Tour ID or Usuario ID cannot be null');
    }

    const reservaEntity = this.reservaRepository.create({
      ...reserva,
      tour: { id: reserva.tourId }, // Asociar ID del tour
      usuario: { id: reserva.usuarioId }, // Asociar ID del usuario
    });

    const savedReserva = await this.reservaRepository.save(reservaEntity);

    return new Reserva({
      id: savedReserva.id,
      tourId: savedReserva.tour.id,
      usuarioId: savedReserva.usuario.id,
      fechaReserva: savedReserva.fechaReserva,
      cantidadPersonas: savedReserva.cantidadPersonas,
      estado: savedReserva.estado,
    });
  }

  // Actualizar una reserva existente
  async update(id: number, reserva: Reserva): Promise<Reserva> {
    const reservaEntity = await this.reservaRepository.findOne({
      where: { id },
    });
    if (!reservaEntity) {
      throw new NotFoundException(`Reserva with ID ${id} not found`);
    }

    Object.assign(reservaEntity, {
      ...reserva,
      tour: { id: reserva.tourId }, // Asociar ID del tour
      usuario: { id: reserva.usuarioId }, // Asociar ID del usuario
    });

    const updatedReserva = await this.reservaRepository.save(reservaEntity);

    return new Reserva({
      id: updatedReserva.id,
      tourId: updatedReserva.tour.id,
      usuarioId: updatedReserva.usuario.id,
      fechaReserva: updatedReserva.fechaReserva,
      cantidadPersonas: updatedReserva.cantidadPersonas,
      estado: updatedReserva.estado,
    });
  }

  // Eliminar una reserva por ID
  async delete(id: number): Promise<void> {
    const reservaEntity = await this.reservaRepository.findOne({
      where: { id },
    });
    if (!reservaEntity) {
      throw new NotFoundException(`Reserva with ID ${id} not found`);
    }

    await this.reservaRepository.delete(id);
  }
}
