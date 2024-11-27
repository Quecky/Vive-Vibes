import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateReservaDto {
  @ApiProperty({ description: 'ID del usuario que realiza la reserva' })
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({ description: 'ID del tour reservado' })
  @IsInt()
  @IsNotEmpty()
  tourId: number;

  @ApiProperty({ description: 'Fecha de la reserva' })
  @IsDateString()
  @IsNotEmpty()
  fechaReserva: string;

  @ApiProperty({ description: 'Cantidad de personas incluidas en la reserva' })
  @IsInt()
  @IsNotEmpty()
  cantidadPersonas: number;

  @ApiProperty({ description: 'Estado de la reserva' })
  @IsNotEmpty()
  estado: string;
}
