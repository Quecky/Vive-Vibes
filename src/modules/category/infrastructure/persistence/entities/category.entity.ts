import { TourEntity } from '@/modules/tour/infrastructure/persistence/entities/tour.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ length: 2000 })
  description: string;
  
  @Column()
  image: string;

  @OneToMany(() => TourEntity, (tour) => tour.category)
  tours?: TourEntity[];
}
