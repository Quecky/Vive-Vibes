import { Module } from '@nestjs/common';
import { TourService } from './application/service/tour.service';
import { TourController } from './interface/tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from './infrastructure/persistence/entities/tour.entity';
import { FechaExperienciaEntity } from '@/modules/tour/infrastructure/persistence/entities/fechaExperiencia.entity';
import { CommonModule } from '@/common/common.module';
import { TOUR_REPOSITORY } from './application/repository/tour.repository';
import { TourMySQLRepository } from './infrastructure/persistence/tour.myslq.repository';
import { CategoryModule } from '../category/category.module';
import { CharacteristicsModule } from '../characteristics/characteristics.module';
import { ReservaModule } from '../../modules/reserva/reserva.module';
import { ReservaEntity } from '@/modules/reserva/infrastructure/persistence/entities/reserva.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TourEntity,
      FechaExperienciaEntity,
      ReservaEntity,
    ]),
    CommonModule,
    CategoryModule,
    CharacteristicsModule,
    ReservaModule,
  ],
  controllers: [TourController],
  providers: [
    TourService,
    {
      provide: TOUR_REPOSITORY,
      useClass: TourMySQLRepository,
    },
  ],
})
export class TourModule {}
