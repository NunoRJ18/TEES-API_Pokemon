import { SearchPokedexUseCase } from '@application/use-cases/search-pokedex';
import { Request, Response } from 'express';

import { searchPokedexQuerySchema } from '@infrastructure/http/validation/pokedex-schemas';
import { validateRequest } from '@infrastructure/http/validation/validate-request';

export class PokedexController {
  constructor(private readonly searchPokedexUseCase: SearchPokedexUseCase) {}

  async search(req: Request, res: Response): Promise<Response> {
    const { name } = validateRequest(searchPokedexQuerySchema, req.query);

    const pokemon = await this.searchPokedexUseCase.execute(name);

    return res.status(200).json({
      data: pokemon,
    });
  }
}
