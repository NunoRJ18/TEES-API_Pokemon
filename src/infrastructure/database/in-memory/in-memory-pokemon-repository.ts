import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  private pokemons: Pokemon[] = [];

  async create(pokemon: Pokemon): Promise<void> {
    this.pokemons.push(pokemon);
  }

  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = this.pokemons.find((pokemon) => pokemon.id === id);

    return pokemon ?? null;
  }

  async findAll(type?: string): Promise<Pokemon[]> {
    if (!type) {
      return this.pokemons;
    }

    return this.pokemons.filter((pokemon) => pokemon.type.includes(type));
  }

  async update(id: string, pokemon: Pokemon): Promise<void> {
    const index = this.pokemons.findIndex((pokemon) => pokemon.id === id);

    if (index === -1) {
      return;
    }

    this.pokemons[index] = pokemon;
  }

  async delete(id: string): Promise<void> {
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
  }
}
