import { z } from 'zod';

export const pokemonIdParamsSchema = z.object({
  id: z.string().min(1, 'ID do Pokémon é obrigatório'),
});

export const listPokemonsQuerySchema = z.object({
  type: z.string().min(1).optional(),
});

export const createPokemonBodySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome do Pokémon é obrigatório'),
  type: z
    .array(z.string().min(1))
    .min(1, 'Pokémon precisa ter ao menos um tipo')
    .max(2, 'Pokémon só pode ter no máximo dois tipos'),
  level: z.number().int().min(1).max(100),
  evolution: z.number().int().min(1).max(3),
});

export const updatePokemonBodySchema = createPokemonBodySchema.omit({
  id: true,
});
