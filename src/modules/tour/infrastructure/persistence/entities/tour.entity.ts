import { CategoryEntity } from '@/modules/category/infrastructure/persistence/entities/category.entity';
import { CharacteristicEntity } from '@/modules/characteristics/infrastructure/persistence/entities/characteristic.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('tour')
export class TourEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  recomendaciones: string;

  @Column()
  imagen: string;

  @Column({ type: 'time' })
  tiempoEstimado: string;

  @Column()
  pais: string;

  @Column()
  ciudad: string;

  @Column()
  aptoParaNinos: boolean;

  @Column()
  fechaExperiencia: Date;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @Column()
  valor: number;

  @Column()
  cupos: number;

  @Column()
  userId: number;

  @Column()
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.tours)
  category: CategoryEntity;

  @ManyToMany(() => CharacteristicEntity)
  @JoinTable({
    name: 'tour_characteristic',
    joinColumn: { name: 'tour_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'characteristic_id',
      referencedColumnName: 'id',
    },
  })
  tours: CharacteristicEntity[];
}
