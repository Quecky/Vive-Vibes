import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { UserType } from './user-type.enum';
import { User } from '../../domain/user.domain';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;

  @IsOptional()
  @IsString()
  registrationDate?: string;
}
