import { SearchPokedexUseCase } from '@application/use-cases/search-pokedex';
import { PokedexController } from '@infrastructure/http/controllers/pokedex-controller';
import { PokeApiProvider } from '@infrastructure/providers/poke-api-provider';

export function makePokedexController(): PokedexController {
  const pokeApiProvider = new PokeApiProvider();
  const searchPokedexUseCase = new SearchPokedexUseCase(pokeApiProvider);

  return new PokedexController(searchPokedexUseCase);
}
