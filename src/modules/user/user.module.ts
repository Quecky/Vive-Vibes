// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/service/user.service';
import { UserController } from './interface/user.controller';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UserMysqlRepository } from './infrastructure/persistence/user.myslq.repository';
import { USER_REPOSITORY } from './application/repository/user.repository';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CommonModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserMysqlRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
