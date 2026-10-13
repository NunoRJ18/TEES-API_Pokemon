import { AppError } from '@domain/errors/app-error';

export class UnauthorizedError extends AppError {
  constructor(message = 'Não autorizado.') {
    super(message, 401);
  }
}
