import { CapturedPokemon } from '@domain/entities/captured-pokemon';

export interface ICapturedPokemonRepository {
  create(capturedPokemon: CapturedPokemon): Promise<void>;
  countActiveByTrainerId(trainerId: string): Promise<number>;
  findActiveByTrainerId(trainerId: string): Promise<CapturedPokemon[]>;
}
