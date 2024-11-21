import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TourEntity } from './tour.entity';

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
  tour: TourEntity; // Relación con la entidad TourEntity

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
