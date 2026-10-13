import { z } from 'zod';

export const trainerIdParamsSchema = z.object({
  trainerId: z.string().uuid('ID do treinador deve ser um UUID válido'),
});

export const createTrainerBodySchema = z.object({
  name: z.string().trim().min(1, 'Nome do treinador é obrigatório'),
});

export const capturePokemonBodySchema = z.object({
  pokemonName: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Nome do Pokémon é obrigatório'),
});
