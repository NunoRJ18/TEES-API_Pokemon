import { IPokeApiGateway } from '@application/gateways/poke-api-gateway';
import { CapturedPokemon } from '@domain/entities/captured-pokemon';
import { PokemonNotFoundError } from '@domain/errors/pokemon-not-found-error';
import { TeamLimitExceededError } from '@domain/errors/team-limit-exceeded-error';
import { TrainerNotFoundError } from '@domain/errors/trainer-not-found-error';
import { ICapturedPokemonRepository } from '@domain/repositories/captured-pokemon-repository';
import { ITrainerRepository } from '@domain/repositories/trainer-repository';

interface CapturePokemonRequest {
  trainerId: string;
  pokemonName: string;
}

export class CapturePokemonUseCase {
  private readonly maxActivePokemons = 6;

  constructor(
    private readonly trainerRepository: ITrainerRepository,
    private readonly capturedPokemonRepository: ICapturedPokemonRepository,
    private readonly pokeApiGateway: IPokeApiGateway,
  ) {}

  async execute(data: CapturePokemonRequest): Promise<CapturedPokemon> {
    const trainer = await this.trainerRepository.findById(data.trainerId);

    if (!trainer) {
      throw new TrainerNotFoundError();
    }

    const activePokemons =
      await this.capturedPokemonRepository.countActiveByTrainerId(
        data.trainerId,
      );

    if (activePokemons >= this.maxActivePokemons) {
      throw new TeamLimitExceededError();
    }

    const pokemon = await this.pokeApiGateway.findByName(data.pokemonName);

    if (!pokemon) {
      throw new PokemonNotFoundError();
    }

    const capturedPokemon = new CapturedPokemon({
      trainerId: data.trainerId,
      pokemonName: pokemon.name,
      imageUrl: pokemon.imageUrl,
      types: pokemon.types,
      baseExperience: pokemon.baseExperience,
      hp: pokemon.stats.hp,
      attack: pokemon.stats.attack,
      defense: pokemon.stats.defense,
      speed: pokemon.stats.speed,
    });

    await this.capturedPokemonRepository.create(capturedPokemon);

    return capturedPokemon;
  }
}
