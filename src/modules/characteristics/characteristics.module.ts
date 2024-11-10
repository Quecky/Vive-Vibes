import { Module } from '@nestjs/common';
import { CharacteristicsService } from './application/service/characteristics.service';
import { CharacteristicsController } from './interface/characteristics.controller';
import { CHARACTERISTIC_REPOSITORY } from './application/repository/characteristic.repository';
import { CharacteristicMysqlRepository } from './infrastructure/persistence/characteristic.mysql.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicEntity } from './infrastructure/persistence/entities/characteristic.entity';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([CharacteristicEntity]), CommonModule],
  controllers: [CharacteristicsController],
  providers: [
    CharacteristicsService,
    {
      provide: CHARACTERISTIC_REPOSITORY,
      useClass: CharacteristicMysqlRepository,
    },
  ],
  exports: [CharacteristicsService],
})
export class CharacteristicsModule {}
