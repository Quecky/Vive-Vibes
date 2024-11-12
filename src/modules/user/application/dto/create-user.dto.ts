import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserType } from './user-type.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
