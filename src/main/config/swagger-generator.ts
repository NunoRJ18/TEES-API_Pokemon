import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Pokemon Manager API',
    description: 'API para gerenciamento de Pokémons em catálogo local',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Endpoints de gerenciamento de Pokémons',
    },
  ],
  definitions: {
    Pokemon: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Charmander',
      type: ['fire'],
      level: 5,
      evolution: 1,
    },
    CreatePokemonDto: {
      $name: 'Charmander',
      $type: ['fire'],
      $level: 5,
      $evolution: 1,
    },
    UpdatePokemonDto: {
      $name: 'Charmeleon',
      $type: ['fire'],
      $level: 16,
      $evolution: 2,
    },
    ErrorResponse: {
      error: 'Pokémon não encontrado.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemon-routes.ts'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
