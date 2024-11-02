import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { TourModule } from './modules/tour/tour.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '@configuration/orm.configuration';
import { configuration } from '@configuration/configuration';
import { ConfigModule } from '@nestjs/config';
import { configurationValidate } from '@configuration/configuration.validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    TourModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
