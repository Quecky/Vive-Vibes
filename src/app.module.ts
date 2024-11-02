import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { TourModule } from './modules/tour/tour.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [TourModule, CategoriesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
