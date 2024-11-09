import { Module } from '@nestjs/common';

import { TourModule } from './modules/tour/tour.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '@configuration/orm.configuration';
import { configuration } from '@configuration/configuration';
import { ConfigModule } from '@nestjs/config';
import { configurationValidate } from '@configuration/configuration.validate';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';

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
    CategoryModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
