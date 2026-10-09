import {
  IPokeApiGateway,
  PokeApiPokemonDTO,
} from '@application/gateways/poke-api-gateway';
import { PokemonNotFoundError } from '@domain/errors/pokemon-not-found-error';

export class SearchPokedexUseCase {
  constructor(private readonly pokeApiGateway: IPokeApiGateway) {}

  async execute(name: string): Promise<PokeApiPokemonDTO> {
    const pokemon = await this.pokeApiGateway.findByName(name);

    if (!pokemon) {
      throw new PokemonNotFoundError();
    }

    return pokemon;
  }
}
