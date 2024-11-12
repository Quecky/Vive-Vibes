import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '@/modules/user/application/dto/user-type.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;

  @Column({
    type: 'enum',
    enum: UserType,
    default: 3,
  })
  type: UserType;
}
