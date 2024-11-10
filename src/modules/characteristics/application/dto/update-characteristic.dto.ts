import { PartialType } from '@nestjs/swagger';
import { CreateCharacteristicDto } from './create-characteristic.dto';

export class UpdateCharacteristicDto extends PartialType(CreateCharacteristicDto) {}
