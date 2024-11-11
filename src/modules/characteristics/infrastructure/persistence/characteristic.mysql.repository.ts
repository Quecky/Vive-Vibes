import { BadRequestException, Injectable } from '@nestjs/common';
import { ICharacteristicRepository } from '../../application/repository/characteristic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacteristicEntity } from './entities/characteristic.entity';
import { Repository } from 'typeorm';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { Characteristic } from '../../domain/characteristic.domain';

@Injectable()
export class CharacteristicMysqlRepository
  implements ICharacteristicRepository
{
  constructor(
    @InjectRepository(CharacteristicEntity)
    private readonly characteristicRepository: Repository<CharacteristicEntity>,
    private readonly mapperService: MapperService,
  ) {}
  async findAll(options?: object): Promise<Characteristic[]> {
    const characteristicEntities =
      await this.characteristicRepository.find(options);
    return characteristicEntities.map((CharacteristicEntity) =>
      this.mapperService.entityToClass(
        CharacteristicEntity,
        new Characteristic(),
      ),
    );
  }
  async findById(id: number): Promise<Characteristic> {
    const characteristicEntity = await this.characteristicRepository.findOne({
      where: { id },
    });
    if (!characteristicEntity)
      throw new BadRequestException('Characteristic not Found');

    return this.mapperService.entityToClass(
      characteristicEntity,
      new Characteristic(),
    );
  }
  async create(characteristic: Characteristic): Promise<Characteristic> {
    const characteristicEntity = this.mapperService.classToEntity(
      characteristic,
      new CharacteristicEntity(),
    );

    const createCharacteristicEntity =
      await this.characteristicRepository.save(characteristicEntity);

    return this.mapperService.entityToClass(
      createCharacteristicEntity,
      new Characteristic(),
    );
  }
  async update(
    id: number,
    newCharacteristic: Characteristic,
  ): Promise<Characteristic> {
    const characteristicEntity = await this.characteristicRepository.findOne({
      where: {
        id,
      },
    });

    if (!characteristicEntity)
      throw new BadRequestException('Characteristic not found');

    this.characteristicRepository.merge(
      characteristicEntity,
      newCharacteristic,
    );
    const characteristicUpdated: CharacteristicEntity =
      await this.characteristicRepository.save(characteristicEntity);
    return this.mapperService.entityToClass(
      characteristicUpdated,
      new Characteristic(),
    );
  }
  async delete(id: number): Promise<void> {
    const characteristicEntity = await this.characteristicRepository.findOne({
      where: {
        id,
      },
    });

    if (!characteristicEntity)
      throw new BadRequestException('Characteristic Not Found');

    await this.characteristicRepository.delete(id);
  }
}
