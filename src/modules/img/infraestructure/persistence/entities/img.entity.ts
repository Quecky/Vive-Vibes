import { TourEntity } from '@/modules/tour/infrastructure/persistence/entities/tour.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    } from 'typeorm';
    

@Entity('image')
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToOne(() => TourEntity, (tour) => tour.category)
    tours?: TourEntity[];
} 