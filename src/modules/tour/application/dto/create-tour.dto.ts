import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTourDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  recommendations: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  estimatedTime: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsBoolean()
  suitableForChildren: boolean;

  @ApiProperty()
  @IsDateString()
  experienceDate: Date;

  @ApiProperty()
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsString()
  endTime: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  slots: number;

  // @ApiProperty()
  // @IsOptional()
  // @IsNumber()
  // userId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  characteristicId: number;
}
