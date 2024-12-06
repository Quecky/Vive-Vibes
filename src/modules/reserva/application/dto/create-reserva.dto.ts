import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateReservaDto {
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @IsInt()
  @IsNotEmpty()
  fechaExperienciaId: number;

  @IsInt()
  @IsNotEmpty()
  cantidadPersonas: number;
}
