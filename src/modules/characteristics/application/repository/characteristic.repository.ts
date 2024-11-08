import { Characteristic } from '../../domain/characteristic.domain';

export const CHARACTERISTIC_REPOSITORY = 'CHARACTERISTIC_REPOSITORY';
export interface ICharacteristicRepository {
  findAll(options?: object): Promise<Characteristic[]>;
  findById(id: number): Promise<Characteristic>;
  create(characteristic: Characteristic): Promise<Characteristic>;
  update(
    id: number,
    newCharacteristic: Characteristic,
  ): Promise<Characteristic>;
  delete(id: number): Promise<void>;
}
