// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './application/service/auth.service';
import { AuthController } from './interface/auth.controller';
import { UserService } from '@/modules/user/application/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/user/infrastructure/persistence/entities/user.entity';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CommonModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
