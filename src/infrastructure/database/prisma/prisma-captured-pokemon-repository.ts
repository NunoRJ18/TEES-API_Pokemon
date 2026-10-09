import { CapturedPokemon } from '@domain/entities/captured-pokemon';
import { ICapturedPokemonRepository } from '@domain/repositories/captured-pokemon-repository';
import { prisma } from '@infrastructure/database/prisma/prisma-client';

interface PrismaCapturedPokemon {
  id: string;
  trainerId: string;
  pokemonName: string;
  imageUrl: string;
  types: string;
  baseExperience: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  isActive: boolean;
  createdAt: Date;
}

export class PrismaCapturedPokemonRepository implements ICapturedPokemonRepository {
  async create(capturedPokemon: CapturedPokemon): Promise<void> {
    await prisma.capturedPokemon.create({
      data: {
        id: capturedPokemon.id,
        trainerId: capturedPokemon.trainerId,
        pokemonName: capturedPokemon.pokemonName,
        imageUrl: capturedPokemon.imageUrl,
        types: JSON.stringify(capturedPokemon.types),
        baseExperience: capturedPokemon.baseExperience,
        hp: capturedPokemon.hp,
        attack: capturedPokemon.attack,
        defense: capturedPokemon.defense,
        speed: capturedPokemon.speed,
        isActive: capturedPokemon.isActive,
        createdAt: capturedPokemon.createdAt,
      },
    });
  }

  async countActiveByTrainerId(trainerId: string): Promise<number> {
    return prisma.capturedPokemon.count({
      where: {
        trainerId,
        isActive: true,
      },
    });
  }

  async findActiveByTrainerId(trainerId: string): Promise<CapturedPokemon[]> {
    const capturedPokemons = await prisma.capturedPokemon.findMany({
      where: {
        trainerId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return capturedPokemons.map((capturedPokemon) =>
      this.toDomain(capturedPokemon),
    );
  }

  private toDomain(capturedPokemon: PrismaCapturedPokemon): CapturedPokemon {
    return new CapturedPokemon({
      id: capturedPokemon.id,
      trainerId: capturedPokemon.trainerId,
      pokemonName: capturedPokemon.pokemonName,
      imageUrl: capturedPokemon.imageUrl,
      types: JSON.parse(capturedPokemon.types) as string[],
      baseExperience: capturedPokemon.baseExperience,
      hp: capturedPokemon.hp,
      attack: capturedPokemon.attack,
      defense: capturedPokemon.defense,
      speed: capturedPokemon.speed,
      isActive: capturedPokemon.isActive,
      createdAt: capturedPokemon.createdAt,
    });
  }
}
