import { AppError } from '@domain/errors/app-error';

export class TeamLimitExceededError extends AppError {
  constructor() {
    super('Treinador não pode ter mais de 6 Pokémons no time ativo.', 400);
  }
}
