import { User } from '../../domain/user.domain';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  findAll(options?: object): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: number, newUser: User): Promise<User>;
  delete(id: number): Promise<void>;
}
