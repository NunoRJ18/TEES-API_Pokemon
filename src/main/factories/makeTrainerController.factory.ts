import { CapturePokemonUseCase } from '@application/use-cases/capture-pokemon';
import { CreateTrainerUseCase } from '@application/use-cases/create-trainer';
import { ListTrainerTeamUseCase } from '@application/use-cases/list-trainer-team';
import { PrismaCapturedPokemonRepository } from '@infrastructure/database/prisma/prisma-captured-pokemon-repository';
import { PrismaTrainerRepository } from '@infrastructure/database/prisma/prisma-trainer-repository';
import { TrainerController } from '@infrastructure/http/controllers/trainer-controller';
import { PokeApiProvider } from '@infrastructure/providers/poke-api-provider';

const trainerRepository = new PrismaTrainerRepository();
const capturedPokemonRepository = new PrismaCapturedPokemonRepository();
const pokeApiProvider = new PokeApiProvider();

export function makeTrainerController(): TrainerController {
  const createTrainerUseCase = new CreateTrainerUseCase(trainerRepository);
  const capturePokemonUseCase = new CapturePokemonUseCase(
    trainerRepository,
    capturedPokemonRepository,
    pokeApiProvider,
  );
  const listTrainerTeamUseCase = new ListTrainerTeamUseCase(
    trainerRepository,
    capturedPokemonRepository,
  );

  return new TrainerController(
    createTrainerUseCase,
    capturePokemonUseCase,
    listTrainerTeamUseCase,
  );
}
