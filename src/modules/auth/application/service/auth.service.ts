import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '@/modules/user/application/service/user.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // Login del usuario
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Buscar el usuario por email
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no registrado');
    }

    // Verificar la contraseña
    if (user.password !== password) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    };
  }
}
