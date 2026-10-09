import { Trainer } from '@domain/entities/trainer';

export interface ITrainerRepository {
  create(trainer: Trainer): Promise<void>;
  findById(id: string): Promise<Trainer | null>;
}
