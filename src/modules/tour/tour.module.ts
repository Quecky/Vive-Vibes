import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './interface/tour.controller';

@Module({
  controllers: [TourController],
  providers: [TourService],
})
export class TourModule {}
