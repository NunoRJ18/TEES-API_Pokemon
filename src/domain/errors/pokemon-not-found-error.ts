import { AppError } from '@domain/errors/app-error';

export class PokemonNotFoundError extends AppError {
  constructor() {
    super('Pokémon não encontrado.', 404);
  }
}
