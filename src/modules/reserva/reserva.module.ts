import { Module } from '@nestjs/common';
import { ReservaService } from './application/service/reserva.service';
import { ReservaController } from './interface/reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from './infrastructure/persistence/entities/reserva.entity';
import { TourEntity } from '@/modules/tour/infrastructure/persistence/entities/tour.entity';
import { UserEntity } from '@/modules/user/infrastructure/persistence/entities/user.entity';
import { CommonModule } from '@/common/common.module';
import { RESERVA_REPOSITORY } from './application/repository/reserva.repository';
import { ReservaMySQLRepository } from './infrastructure/persistence/reserva.mysql.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservaEntity, TourEntity, UserEntity]),
    CommonModule,
  ],
  controllers: [ReservaController],
  providers: [
    ReservaService,
    {
      provide: RESERVA_REPOSITORY,
      useClass: ReservaMySQLRepository,
    },
  ],
  exports: [TypeOrmModule, ReservaService],
})
export class ReservaModule {}
