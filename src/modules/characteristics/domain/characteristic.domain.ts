import { Base } from '@/common/domain/base.domain';

export class Characteristic extends Base {
  name: string;
  description: string;
  image: string;
  date: Date;
}
