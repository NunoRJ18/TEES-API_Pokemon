import { AppError } from '@domain/errors/app-error';

export class NotFoundError extends AppError {
  constructor(resource = 'Recurso') {
    super(`${resource} não encontrado.`, 404);
  }
}
