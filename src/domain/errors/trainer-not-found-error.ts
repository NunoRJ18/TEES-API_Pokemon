import { AppError } from '@domain/errors/app-error';

export class TrainerNotFoundError extends AppError {
  constructor() {
    super('Treinador não encontrado.', 404);
  }
}
