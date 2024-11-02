import { Category } from '../../domain/category.domain';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';
export interface ICategoryRepository {
  findAll(options?: object): Promise<Category[]>;
  findById(id: number): Promise<Category>;
  create(category: Category): Promise<Category>;
  update(id: number, newCategory: Category): Promise<Category>;
  delete(id: number): Promise<void>;
}
