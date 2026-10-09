import { CapturedPokemon } from '@domain/entities/captured-pokemon';
import { TrainerNotFoundError } from '@domain/errors/trainer-not-found-error';
import { ICapturedPokemonRepository } from '@domain/repositories/captured-pokemon-repository';
import { ITrainerRepository } from '@domain/repositories/trainer-repository';

export class ListTrainerTeamUseCase {
  constructor(
    private readonly trainerRepository: ITrainerRepository,
    private readonly capturedPokemonRepository: ICapturedPokemonRepository,
  ) {}

  async execute(trainerId: string): Promise<CapturedPokemon[]> {
    const trainer = await this.trainerRepository.findById(trainerId);

    if (!trainer) {
      throw new TrainerNotFoundError();
    }

    return this.capturedPokemonRepository.findActiveByTrainerId(trainerId);
  }
}
