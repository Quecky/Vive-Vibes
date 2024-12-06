import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/modules/user/infrastructure/persistence/entities/user.entity';
import { TourEntity } from '@/modules/tour/infrastructure/persistence/entities/tour.entity';
import { FechaExperienciaEntity } from '@/modules/tour/infrastructure/persistence/entities/fechaExperiencia.entity';

@Entity('reservas')
export class ReservaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fecha_reserva', type: 'date' })
  fechaReserva: Date;

  @Column({ name: 'cantidad_personas', type: 'int' })
  cantidadPersonas: number;

  @Column({ name: 'precio_total', type: 'decimal', precision: 10, scale: 2 })
  precioTotal: number;

  @Column({ name: 'estado', type: 'varchar', length: 50, default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'usuario_id', type: 'int' })
  usuarioId: number;

  @Column({ name: 'tour_id', type: 'int' })
  tourId: number;

  @Column({ name: 'fecha_experiencia_id', type: 'int', nullable: true })
  fechaExperienciaId: number;

  @ManyToOne(() => TourEntity, (tour) => tour.id)
  @JoinColumn({ name: 'tour_id' })
  tour: TourEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UserEntity;

  @OneToMany(() => ReservaEntity, (reserva) => reserva.fechaExperiencia)
  reservas: ReservaEntity[];

  @ManyToOne(() => FechaExperienciaEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fecha_experiencia_id' })
  fechaExperiencia: FechaExperienciaEntity;
}
