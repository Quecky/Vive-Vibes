import { UserType } from './user-type.enum';

export class CreateUserDto {
  name: string;
  email: string;
  passworde: string;
  registration_date: Date;
  type: UserType;
}
