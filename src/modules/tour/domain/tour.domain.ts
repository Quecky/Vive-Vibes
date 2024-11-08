import { Category } from '@/modules/category/domain/category.domain';
import { Base } from 'src/common/domain/base.domain';

export class Tour extends Base {
  id: number;
  title: string;
  description: string;
  image: string;
  spots: number;
  category: Category;
}
