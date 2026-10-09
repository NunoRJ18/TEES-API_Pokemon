import { z } from 'zod';

export const trainerIdParamsSchema = z.object({
  trainerId: z.string().min(1, 'ID do treinador é obrigatório'),
});

export const createTrainerBodySchema = z.object({
  name: z.string().min(1, 'Nome do treinador é obrigatório'),
});

export const capturePokemonBodySchema = z.object({
  pokemonName: z.string().min(1, 'Nome do Pokémon é obrigatório'),
});
