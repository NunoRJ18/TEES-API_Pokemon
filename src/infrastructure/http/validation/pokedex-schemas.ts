import { z } from 'zod';

export const searchPokedexQuerySchema = z.object({
  name: z.string().min(1, 'Nome do Pokémon é obrigatório'),
});
