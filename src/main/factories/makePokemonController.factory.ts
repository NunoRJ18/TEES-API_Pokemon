import { CreatePokemonUseCase } from '@application/use-cases/create-pokemon';
import { DeletePokemonUseCase } from '@application/use-cases/delete-pokemon';
import { FindPokemonByIdUseCase } from '@application/use-cases/find-pokemon-by-id';
import { ListPokemonsUseCase } from '@application/use-cases/list-pokemons';
import { UpdatePokemonUseCase } from '@application/use-cases/update-pokemon';
import { PrismaPokemonRepository } from '@infrastructure/database/prisma/prisma-pokemon-repository';
import { PokemonController } from '@infrastructure/http/controllers/pokemon-controller';

const pokemonRepository = new PrismaPokemonRepository();

export function makePokemonController(): PokemonController {
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);
  const findPokemonByIdUseCase = new FindPokemonByIdUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);

  return new PokemonController(
    createPokemonUseCase,
    listPokemonsUseCase,
    findPokemonByIdUseCase,
    updatePokemonUseCase,
    deletePokemonUseCase,
  );
}
