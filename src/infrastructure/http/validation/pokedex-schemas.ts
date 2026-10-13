import { z } from 'zod';

export const searchPokedexQuerySchema = z.object({
  name: z.string().trim().toLowerCase().min(1, 'Nome do Pokémon é obrigatório'),
});
