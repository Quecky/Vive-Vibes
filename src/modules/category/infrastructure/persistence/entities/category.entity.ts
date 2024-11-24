import { TourEntity } from '@/modules/tour/infrastructure/persistence/entities/tour.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  photo: string;

  @OneToMany(() => TourEntity, (tour) => tour.category)
  tours?: TourEntity[];
}
