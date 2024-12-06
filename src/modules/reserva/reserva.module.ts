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
import { TOUR_REPOSITORY } from '../tour/application/repository/tour.repository';
import { TourMySQLRepository } from '../tour/infrastructure/persistence/tour.myslq.repository';
import { FechaExperienciaEntity } from '../tour/infrastructure/persistence/entities/fechaExperiencia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservaEntity,
      TourEntity,
      UserEntity,
      FechaExperienciaEntity,
    ]),
    CommonModule,
  ],
  controllers: [ReservaController],
  providers: [
    ReservaService,
    {
      provide: RESERVA_REPOSITORY,
      useClass: ReservaMySQLRepository,
    },
    {
      provide: TOUR_REPOSITORY,
      useClass: TourMySQLRepository,
    },
  ],
  exports: [TypeOrmModule, ReservaService, TOUR_REPOSITORY],
})
export class ReservaModule {}
