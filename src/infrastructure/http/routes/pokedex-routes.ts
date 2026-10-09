import { Router } from 'express';

import { makePokedexController } from '@main/factories/makePokedexController.factory';

const pokedexRoutes = Router();
const pokedexController = makePokedexController();

pokedexRoutes.get('/search', (req, res) => {
  /*
    #swagger.path = '/api/v1/pokedex/search'
    #swagger.tags = ['Pokedex']
    #swagger.summary = 'Consulta Pokémon na PokéAPI'
    #swagger.description = 'Endpoint para consultar diretamente a PokéAPI externa pelo nome do Pokémon.'
    #swagger.parameters['name'] = {
      in: 'query',
      description: 'Nome do Pokémon',
      required: true,
      schema: { type: 'string' }
    }
    #swagger.responses[200] = {
      description: 'Pokémon retornado com sucesso pela PokéAPI.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/PokeApiPokemonDto' }
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
  return pokedexController.search(req, res);
});

export { pokedexRoutes };
