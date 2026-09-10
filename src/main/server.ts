import express from 'express';

import { pokemonRoutes } from '@infrastructure/http/routes/pokemon-routes';
import { setupSwagger } from '@main/config/swagger';

const app = express();

app.use(express.json());

setupSwagger(app);

app.use('/api/v1/pokemons', pokemonRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger running on http://localhost:${PORT}/api/docs`);
});
