import { Router } from 'express';

import {
  createPokemonBodySchema,
  listPokemonsQuerySchema,
  pokemonIdParamsSchema,
  updatePokemonBodySchema,
} from '@infrastructure/http/validation/pokemon-schemas';
import { validateRequest } from '@infrastructure/http/validation/validate-request';
import { makePokemonController } from '@main/factories/makePokemonController.factory';

const pokemonRoutes = Router();

const pokemonController = makePokemonController();

pokemonRoutes.get(
  '/',
  validateRequest({ query: listPokemonsQuerySchema }),
  (req, res) => {
    /*
    #swagger.path = '/api/v1/pokemons'
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Lista todos os Pokémons'
    #swagger.description = 'Endpoint para listar Pokémons cadastrados, com filtro opcional por tipo.'
    #swagger.parameters['type'] = {
      in: 'query',
      description: 'Tipo do Pokémon para filtro',
      required: false,
      schema: { type: 'string' }
    }
    #swagger.responses[200] = {
      description: 'Lista de Pokémons retornada com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/Pokemon' }
              }
            }
          }
        }
      }
    }
  */
    return pokemonController.list(req, res);
  },
);

pokemonRoutes.get(
  '/:id',
  validateRequest({ params: pokemonIdParamsSchema }),
  (req, res) => {
    /*
    #swagger.path = '/api/v1/pokemons/{id}'
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Busca um Pokémon por ID'
    #swagger.description = 'Endpoint para buscar um Pokémon cadastrado pelo ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      schema: { type: 'string' }
    }
    #swagger.responses[200] = {
      description: 'Pokémon encontrado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Pokémon não encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
    return pokemonController.findById(req, res);
  },
);

pokemonRoutes.post(
  '/',
  validateRequest({ body: createPokemonBodySchema }),
  (req, res) => {
    /*
    #swagger.path = '/api/v1/pokemons'
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Cria um novo Pokémon'
    #swagger.description = 'Endpoint para cadastrar manualmente um Pokémon no catálogo local.'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreatePokemonDto' }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Pokémon criado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Pokémon criado com sucesso!'
              },
              data: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Dados inválidos.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
    return pokemonController.create(req, res);
  },
);

pokemonRoutes.put(
  '/:id',
  validateRequest({
    params: pokemonIdParamsSchema,
    body: updatePokemonBodySchema,
  }),
  (req, res) => {
    /*
    #swagger.path = '/api/v1/pokemons/{id}'
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualiza um Pokémon'
    #swagger.description = 'Endpoint para atualizar os dados de um Pokémon cadastrado no catálogo local.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      schema: { type: 'string' }
    }
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/UpdatePokemonDto' }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Pokémon atualizado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Pokémon atualizado com sucesso!'
              },
              data: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Pokémon não encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
    return pokemonController.update(req, res);
  },
);

pokemonRoutes.delete(
  '/:id',
  validateRequest({ params: pokemonIdParamsSchema }),
  (req, res) => {
    /*
    #swagger.path = '/api/v1/pokemons/{id}'
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Remove um Pokémon'
    #swagger.description = 'Endpoint para remover um Pokémon do catálogo local.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      schema: { type: 'string' }
    }
    #swagger.responses[200] = {
      description: 'Pokémon removido com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Pokémon removido com sucesso!'
              }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Pokémon não encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
    return pokemonController.delete(req, res);
  },
);

export { pokemonRoutes };
