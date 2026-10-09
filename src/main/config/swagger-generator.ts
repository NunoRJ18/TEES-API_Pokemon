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
    {
      name: 'Pokedex',
      description: 'Endpoints de consulta à PokéAPI externa',
    },
    {
      name: 'Trainers',
      description: 'Endpoints de gerenciamento de treinadores e capturas',
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
    PokeApiPokemonDto: {
      name: 'pikachu',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      types: ['electric'],
      baseExperience: 112,
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        speed: 90,
      },
    },
    Trainer: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Ash',
      createdAt: '2026-10-09T14:00:00.000Z',
    },
    CreateTrainerDto: {
      $name: 'Ash',
    },
    CapturePokemonDto: {
      $pokemonName: 'pikachu',
    },
    CapturedPokemon: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      trainerId: '123e4567-e89b-12d3-a456-426614174000',
      pokemonName: 'pikachu',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      types: ['electric'],
      baseExperience: 112,
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        speed: 90,
      },
      isActive: true,
      createdAt: '2026-10-09T14:00:00.000Z',
    },
    ErrorResponse: {
      error: 'Pokémon não encontrado.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [
  path.resolve(__dirname, '../../infrastructure/http/routes/pokedex-routes.ts'),
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemon-routes.ts'),
  path.resolve(__dirname, '../../infrastructure/http/routes/trainer-routes.ts'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
