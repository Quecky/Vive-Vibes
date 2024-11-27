import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { TourEntity } from './tour.entity';
import { ReservaEntity } from '../../../../reserva/infrastructure/persistence/entities/reserva.entity';

@Entity('fecha_experiencia')
export class FechaExperienciaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaDisponible: string;

  @Column({ type: 'int' })
  cupos: number;

  @ManyToOne(() => TourEntity, (tour) => tour.fechasExperiencia, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tour_id' }) // Relación con la tabla `tour`
  tour: TourEntity;

  @OneToMany(() => ReservaEntity, (reserva) => reserva.fechaExperiencia) // Relación con las reservas
  reservas: ReservaEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
