import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCharacteristicDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty()
  date: Date;
}
