import { Router } from 'express';

import { makeTrainerController } from '@main/factories/makeTrainerController.factory';

const trainerRoutes = Router();
const trainerController = makeTrainerController();

trainerRoutes.post('/', (req, res) => {
  /*
    #swagger.path = '/api/v1/trainers'
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Cria um novo treinador'
    #swagger.description = 'Endpoint para cadastrar treinadores no banco de dados.'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreateTrainerDto' }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Treinador criado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Treinador criado com sucesso!'
              },
              data: { $ref: '#/components/schemas/Trainer' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Payload inválido.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
  return trainerController.create(req, res);
});

trainerRoutes.post('/:trainerId/captures', (req, res) => {
  /*
    #swagger.path = '/api/v1/trainers/{trainerId}/captures'
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Captura um Pokémon'
    #swagger.description = 'Endpoint para capturar um Pokémon consultando a PokéAPI e associando ao treinador.'
    #swagger.parameters['trainerId'] = {
      in: 'path',
      description: 'ID do treinador',
      required: true,
      schema: { type: 'string' }
    }
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CapturePokemonDto' }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Pokémon capturado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Pokémon capturado com sucesso!'
              },
              data: { $ref: '#/components/schemas/CapturedPokemon' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Payload inválido ou limite de 6 Pokémons atingido.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Treinador ou Pokémon não encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
  return trainerController.capture(req, res);
});

trainerRoutes.get('/:trainerId/team', (req, res) => {
  /*
    #swagger.path = '/api/v1/trainers/{trainerId}/team'
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Lista o time atual do treinador'
    #swagger.description = 'Endpoint para listar Pokémons ativos no time do treinador.'
    #swagger.parameters['trainerId'] = {
      in: 'path',
      description: 'ID do treinador',
      required: true,
      schema: { type: 'string' }
    }
    #swagger.responses[200] = {
      description: 'Time atual retornado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/CapturedPokemon' }
              }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Treinador não encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
  return trainerController.team(req, res);
});

export { trainerRoutes };
