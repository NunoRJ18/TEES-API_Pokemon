import { z } from 'zod';

export const pokemonIdParamsSchema = z.object({
  id: z.string().uuid('ID do Pokémon deve ser um UUID válido'),
});

export const listPokemonsQuerySchema = z.object({
  type: z.string().trim().toLowerCase().min(1).optional(),
});

export const createPokemonBodySchema = z.object({
  id: z.string().uuid('ID do Pokémon deve ser um UUID válido').optional(),
  name: z.string().trim().min(1, 'Nome do Pokémon é obrigatório'),
  type: z
    .array(z.string().trim().toLowerCase().min(1))
    .min(1, 'Pokémon precisa ter ao menos um tipo')
    .max(2, 'Pokémon só pode ter no máximo dois tipos'),
  level: z
    .number()
    .int('Nível do Pokémon deve ser um número inteiro')
    .min(1, 'Nível mínimo é 1')
    .max(100, 'Nível máximo é 100'),
  evolution: z
    .number()
    .int('Evolução deve ser um número inteiro')
    .min(1, 'Evolução mínima é 1')
    .max(3, 'Evolução máxima é 3'),
});

export const updatePokemonBodySchema = createPokemonBodySchema.omit({
  id: true,
});
