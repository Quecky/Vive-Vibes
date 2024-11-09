import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from '../application/service/user.service';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Crear un nuevo usuario
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  // Obtener todos los usuarios
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  // Obtener un usuario por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findById(+id);
  }

  // Actualizar un usuario por su ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(+id, updateUserDto);
  }

  // Eliminar un usuario por su ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.deleteUser(+id);
  }
}
