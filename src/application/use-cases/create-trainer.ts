import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer-repository';

interface CreateTrainerRequest {
  name: string;
}

export class CreateTrainerUseCase {
  constructor(private readonly trainerRepository: ITrainerRepository) {}

  async execute(data: CreateTrainerRequest): Promise<Trainer> {
    const trainer = new Trainer(data);

    await this.trainerRepository.create(trainer);

    return trainer;
  }
}
