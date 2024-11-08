import { BadRequestException, Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../application/repository/category.repository';
import { Category } from '../../domain/category.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { MapperService } from '@/common/application/mapper/mapper.service';

@Injectable()
export class CategoryMysqlRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly mapperService: MapperService,
  ) {}
  async findAll(options?: object): Promise<Category[]> {
    const categoryEntities = await this.categoryRepository.find(options);
    return categoryEntities.map((categoryEntity) =>
      this.mapperService.entityToClass(categoryEntity, new Category()),
    );
  }
  async findById(id: number): Promise<Category> {
    const categoryEntity = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!categoryEntity) throw new BadRequestException('Category not Found');

    return this.mapperService.entityToClass(categoryEntity, new Category());
  }
  async create(category: Category): Promise<Category> {
    const categoryEntity = this.mapperService.classToEntity(
      category,
      new CategoryEntity(),
    );

    const createCategoryEntity =
      await this.categoryRepository.save(categoryEntity);
    return this.mapperService.entityToClass(
      createCategoryEntity,
      new Category(),
    );
  }
  async update(id: number, newCategory: Category): Promise<Category> {
    const categoryEntity = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoryEntity) throw new BadRequestException('Category not found');

    this.categoryRepository.merge(categoryEntity, newCategory);
    const categoryUpdated: Category =
      await this.categoryRepository.save(categoryEntity);
    return this.mapperService.entityToClass(categoryUpdated, new Category());
  }
  async delete(id: number): Promise<void> {
    const categoryEntity = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoryEntity) throw new BadRequestException('Category Not Found');

    await this.categoryRepository.delete(id);
  }
}
