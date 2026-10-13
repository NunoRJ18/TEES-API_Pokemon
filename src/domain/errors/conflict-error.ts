import { AppError } from '@domain/errors/app-error';

export class ConflictError extends AppError {
  constructor(message = 'Recurso já cadastrado.') {
    super(message, 409);
  }
}
