import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../../application/dto/create-category.dto';
import { UpdateCategoryDto } from '../../application/dto/update-category.dto';
import {
  CATEGORY_REPOSITORY,
  ICategoryRepository,
} from '../repository/category.repository';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { Category } from '../../domain/category.domain';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
    private readonly mapperService: MapperService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory: Category = this.mapperService.dtoToClass(
      createCategoryDto,
      new Category(),
    );
    const response = await this.categoryRepository.create(newCategory);
    return response;
  }

  async findById(id: number) {
    const response = await this.categoryRepository.findById(id);
    return response;
  }

  async findAll() {
    const response = await this.categoryRepository.findAll();
    return response;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const CategoryUpdated = this.mapperService.dtoToClass(
      updateCategoryDto,
      new Category(),
    );
    return await this.categoryRepository.update(id, CategoryUpdated);
  }

  async delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}
