import { UserType } from './user-type.enum';

export class CreateUserDto {
  name: string;
  email: string;
  passworde: string;
  type: UserType;
}
