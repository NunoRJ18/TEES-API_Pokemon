import { Router } from 'express';

import { pokedexRoutes } from '@infrastructure/http/routes/pokedex-routes';
import { pokemonRoutes } from '@infrastructure/http/routes/pokemon-routes';
import { trainerRoutes } from '@infrastructure/http/routes/trainer-routes';

const routes = Router();

routes.use('/api/v1/pokedex', pokedexRoutes);
routes.use('/api/v1/pokemons', pokemonRoutes);
routes.use('/api/v1/trainers', trainerRoutes);

export { routes };
