import { CategoryEntity } from '@/modules/category/infrastructure/persistence/entities/category.entity';
import { CharacteristicEntity } from '@/modules/characteristics/infrastructure/persistence/entities/characteristic.entity';
import { FechaExperienciaEntity } from '@/modules/tour/infrastructure/persistence/entities/fechaExperiencia.entity';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity('tour')
export class TourEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  recommendations: string;

  @Column()
  image: string;

  @Column({ type: 'time' })
  estimatedTime: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  suitableForChildren: boolean;

  @Column()
  experienceDate: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column()
  price: number;

  @Column()
  slots: number;

  // @Column()
  // userId: number;

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
  characteristics: CharacteristicEntity[];

  @OneToMany(
    () => FechaExperienciaEntity,
    (fechaExperiencia) => fechaExperiencia.tour,
  )
  fechasExperiencia: FechaExperienciaEntity[]; // Relación con FechaExperienciaEntity
}
