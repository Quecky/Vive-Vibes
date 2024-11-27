import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '@/modules/user/infrastructure/persistence/entities/user.entity';
import { TourEntity } from '@/modules/tour/infrastructure/persistence/entities/tour.entity';
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

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @Column({ name: 'usuario_id', type: 'int' })
  usuarioId: number;

  @Column({ name: 'tour_id', type: 'int' })
  tourId: number;

  @ManyToOne(() => TourEntity, (tour) => tour.id)
  tour: TourEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  usuario: UserEntity;
}
