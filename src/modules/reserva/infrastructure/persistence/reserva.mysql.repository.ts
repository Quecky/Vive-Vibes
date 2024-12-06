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

  async findAll(): Promise<Reserva[]> {
    const reservas = await this.reservaRepository.find({
      relations: ['tour', 'usuario', 'fechaExperiencia'],
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
          precioTotal: entity.precioTotal,
          fechaExperienciaId: entity.fechaExperiencia?.id,
        }),
    );
  }

  async findById(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['tour', 'usuario', 'fechaExperiencia'],
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    return new Reserva({
      id: reserva.id,
      tourId: reserva.tour.id,
      usuarioId: reserva.usuario.id,
      fechaReserva: reserva.fechaReserva,
      cantidadPersonas: reserva.cantidadPersonas,
      estado: reserva.estado,
      precioTotal: reserva.precioTotal,
      fechaExperienciaId: reserva.fechaExperiencia?.id,
    });
  }

  async create(reserva: Reserva): Promise<Reserva> {
    const reservaEntity = this.reservaRepository.create({
      tour: { id: reserva.tourId },
      usuario: { id: reserva.usuarioId },
      fechaReserva: reserva.fechaReserva,
      cantidadPersonas: reserva.cantidadPersonas,
      estado: reserva.estado,
      precioTotal: reserva.precioTotal,
      fechaExperiencia: { id: reserva.fechaExperienciaId },
    });

    const savedReserva = await this.reservaRepository.save(reservaEntity);

    return new Reserva({
      id: savedReserva.id,
      tourId: savedReserva.tour.id,
      usuarioId: savedReserva.usuario.id,
      fechaReserva: savedReserva.fechaReserva,
      cantidadPersonas: savedReserva.cantidadPersonas,
      estado: savedReserva.estado,
      precioTotal: savedReserva.precioTotal,
      fechaExperienciaId: savedReserva.fechaExperiencia.id,
    });
  }

  async update(id: number, reserva: Reserva): Promise<Reserva> {
    const reservaEntity = await this.reservaRepository.findOne({
      where: { id },
      relations: ['tour', 'fechaExperiencia'],
    });

    if (!reservaEntity) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    Object.assign(reservaEntity, {
      tour: { id: reserva.tourId },
      usuario: { id: reserva.usuarioId },
      fechaReserva: reserva.fechaReserva,
      cantidadPersonas: reserva.cantidadPersonas,
      estado: reserva.estado,
      precioTotal: reserva.precioTotal,
      fechaExperiencia: { id: reserva.fechaExperienciaId },
    });

    const updatedReserva = await this.reservaRepository.save(reservaEntity);

    return new Reserva({
      id: updatedReserva.id,
      tourId: updatedReserva.tour.id,
      usuarioId: updatedReserva.usuario.id,
      fechaReserva: updatedReserva.fechaReserva,
      cantidadPersonas: updatedReserva.cantidadPersonas,
      estado: updatedReserva.estado,
      precioTotal: updatedReserva.precioTotal,
      fechaExperienciaId: updatedReserva.fechaExperiencia?.id,
    });
  }

  async delete(id: number): Promise<void> {
    const reservaEntity = await this.reservaRepository.findOne({
      where: { id },
    });

    if (!reservaEntity) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    await this.reservaRepository.delete(id);
  }

  async save(reserva: Reserva): Promise<Reserva> {
    const reservaEntity = this.reservaRepository.create({
      tour: { id: reserva.tourId },
      usuario: { id: reserva.usuarioId },
      fechaReserva: reserva.fechaReserva,
      cantidadPersonas: reserva.cantidadPersonas,
      estado: reserva.estado,
      precioTotal: reserva.precioTotal,
      fechaExperiencia: { id: reserva.fechaExperienciaId },
    });

    const savedReserva = await this.reservaRepository.save(reservaEntity);

    return new Reserva({
      id: savedReserva.id,
      tourId: savedReserva.tour.id,
      usuarioId: savedReserva.usuario.id,
      fechaReserva: savedReserva.fechaReserva,
      cantidadPersonas: savedReserva.cantidadPersonas,
      estado: savedReserva.estado,
      precioTotal: savedReserva.precioTotal,
      fechaExperienciaId: savedReserva.fechaExperiencia?.id,
    });
  }

  async findByFechaExperienciaId(
    fechaExperienciaId: number,
  ): Promise<Reserva[]> {
    const reservas = await this.reservaRepository.find({
      where: { fechaExperiencia: { id: fechaExperienciaId } },
      relations: ['tour', 'usuario', 'fechaExperiencia'], // Incluye relaciones necesarias
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
          precioTotal: entity.precioTotal,
          fechaExperienciaId: entity.fechaExperiencia?.id,
        }),
    );
  }
}
