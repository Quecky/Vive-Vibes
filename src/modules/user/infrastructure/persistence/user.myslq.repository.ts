import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError  } from 'typeorm';
import { IUserRepository } from '../../application/repository/user.repository';
import { User } from '../../domain/user.domain';
import { UserEntity } from './entities/user.entity';
import { MapperService } from '@/common/application/mapper/mapper.service';

@Injectable()
export class UserMysqlRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mapperService: MapperService,
  ) {}

  async findAll(options?: object): Promise<User[]> {
    const userEntities = await this.userRepository.find(options);
    return userEntities.map((userEntity) =>
      this.mapperService.entityToClass(userEntity, new User()),
    );
  }

  async findById(id: number): Promise<User> {
    const userEntity = await this.userRepository.findOne({ where: { id } });
    if (!userEntity) throw new BadRequestException('User not found');
    return this.mapperService.entityToClass(userEntity, new User());
  }

  async create(user: User): Promise<User> {
    const userEntity = this.mapperService.classToEntity(user, new UserEntity());
    const createdUserEntity = await this.userRepository.save(userEntity);
    return this.mapperService.entityToClass(createdUserEntity, new User());
  }

  async update(id: number, newUser: User): Promise<User> {
    const userEntity = await this.userRepository.findOne({ where: { id } });
    if (!userEntity) throw new BadRequestException('User not found');
    this.userRepository.merge(userEntity, newUser);
    const updatedUserEntity = await this.userRepository.save(userEntity);
    return this.mapperService.entityToClass(updatedUserEntity, new User());
  }

  async delete(id: number): Promise<void> {
    const userEntity = await this.userRepository.findOne({ where: { id } });
    if (!userEntity) throw new BadRequestException('User not found');
    await this.userRepository.delete(id);
  }
}
