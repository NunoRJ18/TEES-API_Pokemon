import express from 'express';

import { errorHandler } from '@infrastructure/http/middlewares/error-handler';
import { pokedexRoutes } from '@infrastructure/http/routes/pokedex-routes';
import { pokemonRoutes } from '@infrastructure/http/routes/pokemon-routes';
import { trainerRoutes } from '@infrastructure/http/routes/trainer-routes';
import { setupSwagger } from '@main/config/swagger';

const app = express();

app.use(express.json());

setupSwagger(app);

app.use('/api/v1/pokedex', pokedexRoutes);
app.use('/api/v1/pokemons', pokemonRoutes);
app.use('/api/v1/trainers', trainerRoutes);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger running on http://localhost:${PORT}/api/docs`);
});
