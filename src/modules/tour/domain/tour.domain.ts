import { Category } from '@/modules/category/domain/category.domain';
import { Base } from 'src/common/domain/base.domain';

export class Tour extends Base {
  nombre: string;
  descripcion: string;
  recomendaciones: string;
  imagen: string;
  tiempoEstimado: string;
  pais: string;
  ciudad: string;
  aptoParaNinos: boolean;
  fechaExperiencia: Date;
  horaInicio: string;
  horaFin: string;
  valor: number;
  cupos: number;
  userId: number;
  categoryId: number;
  category: Category;
}
