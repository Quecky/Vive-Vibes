import { Base } from 'src/common/domain/base.domain';
import { UserType } from '@/modules/user/application/dto/user-type.enum';

export class User extends Base {
  name: string;
  email: string;
  password: string;
  registrationDate: Date;
  type: UserType;
}
