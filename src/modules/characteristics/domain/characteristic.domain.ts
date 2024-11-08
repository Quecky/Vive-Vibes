import { Base } from '@/common/domain/base.domain';

export class Characteristic extends Base {
  nombre: string;
  descripcion: string;
  imagen: string;
  fecha: Date;
}
