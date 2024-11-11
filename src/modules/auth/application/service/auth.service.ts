import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '@/modules/user/application/service/user.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // Login del usuario
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new BadRequestException('Usuario o contraseña incorrectos');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    };
  }
}
