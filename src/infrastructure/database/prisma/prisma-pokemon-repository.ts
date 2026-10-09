import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';
import { prisma } from '@infrastructure/database/prisma/prisma-client';

interface PrismaPokemon {
  id: string;
  name: string;
  type: string;
  level: number;
  evolution: number;
}

export class PrismaPokemonRepository implements IPokemonRepository {
  async create(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.create({
      data: {
        id: pokemon.id,
        name: pokemon.name,
        type: JSON.stringify(pokemon.type),
        level: pokemon.level,
        evolution: pokemon.evolution,
      },
    });
  }

  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = await prisma.pokemon.findUnique({
      where: { id },
    });

    return pokemon ? this.toDomain(pokemon) : null;
  }

  async findAll(type?: string): Promise<Pokemon[]> {
    const pokemons = await prisma.pokemon.findMany();
    const domainPokemons = pokemons.map((pokemon) => this.toDomain(pokemon));

    if (!type) {
      return domainPokemons;
    }

    return domainPokemons.filter((pokemon) => pokemon.type.includes(type));
  }

  async update(id: string, pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.update({
      where: { id },
      data: {
        name: pokemon.name,
        type: JSON.stringify(pokemon.type),
        level: pokemon.level,
        evolution: pokemon.evolution,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.pokemon.delete({
      where: { id },
    });
  }

  private toDomain(pokemon: PrismaPokemon): Pokemon {
    return new Pokemon({
      id: pokemon.id,
      name: pokemon.name,
      type: JSON.parse(pokemon.type) as string[],
      level: pokemon.level,
      evolution: pokemon.evolution,
    });
  }
}
