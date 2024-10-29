import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourModule } from './tour/tour.module';

@Module({
  imports: [TourModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
