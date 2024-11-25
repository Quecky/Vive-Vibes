import { Base } from '@/common/domain/base.domain';
import { Tour } from '@/modules/tour/domain/tour.domain';

export class Characteristic extends Base {
  name: string;
  description: string;
  image: string;
  date: Date;  
  tours?: Tour[];
}

