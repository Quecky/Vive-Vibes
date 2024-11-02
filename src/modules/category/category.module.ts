import { Module } from '@nestjs/common';
import { CategoryService } from './application/service/category.service';
import { CategoryController } from './interface/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './infrastructure/persistence/entities/category.entity';
import { CommonModule } from '@/common/common.module';
import { CATEGORY_REPOSITORY } from './application/repository/category.repository';
import { CategoryMysqlRepository } from './infrastructure/persistence/category.mysql.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), CommonModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryMysqlRepository,
    },
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
