import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from '../application/service/auth.service';
import { LoginUserDto } from '../application/dto/login-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('findByEmail/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.authService.findByEmail(email);
  }
}
