import { Category } from '@/modules/category/domain/category.domain';
import { Characteristic } from '@/modules/characteristics/domain/characteristic.domain';
import { Base } from 'src/common/domain/base.domain';
import { FechaExperienciaEntity } from '../infrastructure/persistence/entities/fechaExperiencia.entity';

export class Tour extends Base {
  name: string;
  description: string;
  recommendations: string;
  image: string;
  estimatedTime: string;
  country: string;
  city: string;
  suitableForChildren: boolean;
  // experienceDates: Date[];
  startTime: string;
  endTime: string;
  price: number;
  slots: number;
  // userId: number;
  categoryId: number;
  category: Category;
  characteristics: Characteristic[];
  fechasExperiencia: FechaExperienciaEntity[];
}
