import { Injectable, NotFoundException,HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../infrastructure/persistence/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { MapperService } from '@/common/application/mapper/mapper.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mapperService: MapperService,
  ) {}

  // Método para crear un nuevo usuario
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const findEmail = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (findEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    if (!createUserDto.email.includes('@') || !createUserDto.email.includes('.')) {
      throw new HttpException('Email not valid', HttpStatus.BAD_REQUEST);
    }
  
    if (!createUserDto.name || createUserDto.name.trim() === '') {
      throw new HttpException('Name cannot be empty', HttpStatus.BAD_REQUEST);
    }
  
    if (!createUserDto.password || createUserDto.password.trim() === '') {
      throw new HttpException('Password cannot be empty', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  // Método para obtener todos los usuarios
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  // Método para obtener un usuario por su ID
  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Método para actualizar un usuario por su ID
  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneBy({ id });
  }

  // Método para eliminar un usuario por su ID
  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  // buscar usuario por email
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }
}
