import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '@/modules/user/application/dto/user-type.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  registrationDate: Date;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.USER,
  })
  type: UserType;
}
