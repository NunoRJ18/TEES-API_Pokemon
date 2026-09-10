import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

interface UpdatePokemonRequest {
  name: string;
  type: string[];
  level: number;
  evolution: number;
}

export class UpdatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(
    id: string,
    data: UpdatePokemonRequest,
  ): Promise<Pokemon | null> {
    const pokemonExists = await this.pokemonRepository.findById(id);

    if (!pokemonExists) {
      return null;
    }

    const pokemon = new Pokemon({
      id,
      ...data,
    });

    await this.pokemonRepository.update(id, pokemon);

    return pokemon;
  }
}
