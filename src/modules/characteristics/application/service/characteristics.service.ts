import { Inject, Injectable } from '@nestjs/common';
import { CreateCharacteristicDto } from '../dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from '../dto/update-characteristic.dto';
import {
  CHARACTERISTIC_REPOSITORY,
  ICharacteristicRepository,
} from '../repository/characteristic.repository';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { Characteristic } from '../../domain/characteristic.domain';

@Injectable()
export class CharacteristicsService {
  constructor(
    @Inject(CHARACTERISTIC_REPOSITORY)
    private readonly characteristicRepository: ICharacteristicRepository,
    private readonly mapperService: MapperService,
  ) {}

  async create(createCharacteristicDto: CreateCharacteristicDto) {
    const newCharacteristic: Characteristic = this.mapperService.dtoToClass(
      createCharacteristicDto,
      new Characteristic(),
    );
    const response =
      await this.characteristicRepository.create(newCharacteristic);
    return response;
  }

  async finById(id: number) {
    const response = await this.characteristicRepository.findById(id);
    return response;
  }

  async findAll() {
    const response = await this.characteristicRepository.findAll();
    return response;
  }

  async update(id: number, updateCharacteristicDto: UpdateCharacteristicDto) {
    const characteristicUpdated = this.mapperService.dtoToClass(
      updateCharacteristicDto,
      new Characteristic(),
    );
    return await this.characteristicRepository.update(
      id,
      characteristicUpdated,
    );
  }

  async delete(id: number) {
    return this.characteristicRepository.delete(id);
  }
}
