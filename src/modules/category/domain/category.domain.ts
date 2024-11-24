import { Base } from '@/common/domain/base.domain';
import { Tour } from '@/modules/tour/domain/tour.domain';

export class Category extends Base {
  name: string;
  description: string;
  photo: string;
  tours?: Tour[];
}
