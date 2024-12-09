import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateReservaDto } from '../dto/create-reserva.dto';
import { UpdateReservaDto } from '../dto/update-reserva.dto';
import {
  IReservaRepository,
  RESERVA_REPOSITORY,
} from '../repository/reserva.repository';
import {
  ITourRepository,
  TOUR_REPOSITORY,
} from '../../../tour/application/repository/tour.repository';
import { FechaExperienciaEntity } from '../../../tour/infrastructure/persistence/entities/fechaExperiencia.entity';
import { Repository } from 'typeorm';
import { Reserva } from '../../domain/reserva.domain';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservaService {
  constructor(
    @Inject(RESERVA_REPOSITORY)
    private readonly reservaRepository: IReservaRepository,
    @Inject(TOUR_REPOSITORY)
    private readonly tourRepository: ITourRepository,
    @InjectRepository(FechaExperienciaEntity)
    private readonly fechaExperienciaRepository: Repository<FechaExperienciaEntity>,
  ) {}

  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepository.findAll();
  }

  async findById(id: number): Promise<Reserva> {
    return await this.reservaRepository.findById(id);
  }

  /**
   * Valida si hay suficientes cupos para la fecha de experiencia seleccionada.
   */
  private async validateFechaExperiencia(
    fechaExperienciaId: number,
    cantidadPersonas: number,
  ): Promise<FechaExperienciaEntity> {
    // Busca la fecha de experiencia con la relación del tour.
    const fechaExperiencia = await this.fechaExperienciaRepository.findOne({
      where: { id: fechaExperienciaId },
      relations: ['tour'],
    });

    if (!fechaExperiencia) {
      throw new NotFoundException(
        `Fecha de experiencia con ID ${fechaExperienciaId} no encontrada`,
      );
    }

    const slots = fechaExperiencia.tour.slots;

    const reservasExistentes =
      await this.reservaRepository.findByFechaExperienciaId(fechaExperienciaId);

    // Sumar todas las personas ya reservadas.
    const cuposReservados = reservasExistentes.reduce(
      (sum, reserva) => sum + reserva.cantidadPersonas,
      0,
    );

    // Calcular los cupos restantes.
    const cuposDisponibles = slots - cuposReservados;

    if (cuposDisponibles < cantidadPersonas) {
      throw new BadRequestException(
        `No hay suficientes cupos disponibles para esta fecha. Cupos disponibles: ${cuposDisponibles}`,
      );
    }

    return fechaExperiencia;
  }

  async createReserva(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const fechaExperiencia = await this.validateFechaExperiencia(
      createReservaDto.fechaExperienciaId,
      createReservaDto.cantidadPersonas,
    );

    const precioTotal =
      createReservaDto.cantidadPersonas * fechaExperiencia.tour.price;

    const reserva = new Reserva({
      usuarioId: createReservaDto.usuarioId,
      tourId: fechaExperiencia.tour.id,
      fechaReserva: new Date(fechaExperiencia.fechaDisponible),
      cantidadPersonas: createReservaDto.cantidadPersonas,
      estado: 'pendiente', // Estado inicial predeterminado.
      precioTotal,
      fechaExperienciaId: createReservaDto.fechaExperienciaId,
    });

    return await this.reservaRepository.save(reserva);
  }

  async update(
    id: number,
    updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    const existingReserva = await this.reservaRepository.findById(id);

    const fechaExperiencia = await this.validateFechaExperiencia(
      existingReserva.fechaExperienciaId,
      updateReservaDto.cantidadPersonas || existingReserva.cantidadPersonas,
    );

    const precioTotal = updateReservaDto.cantidadPersonas
      ? updateReservaDto.cantidadPersonas * fechaExperiencia.tour.price
      : existingReserva.precioTotal;

    const reserva = new Reserva({
      ...existingReserva,
      ...updateReservaDto,
      fechaReserva: new Date(fechaExperiencia.fechaDisponible),
      precioTotal,
    });

    return await this.reservaRepository.update(id, reserva);
  }

  async delete(id: number): Promise<void> {
    await this.reservaRepository.delete(id);
  }
}
