import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

export class ListPokemonsUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(type?: string): Promise<Pokemon[]> {
    return this.pokemonRepository.findAll(type);
  }
}
