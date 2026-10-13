import { SearchPokedexUseCase } from '@application/use-cases/search-pokedex';
import { Request, Response } from 'express';

export class PokedexController {
  constructor(private readonly searchPokedexUseCase: SearchPokedexUseCase) {}

  async search(req: Request, res: Response): Promise<Response> {
    const { name } = req.query;

    const pokemon = await this.searchPokedexUseCase.execute(String(name));

    return res.status(200).json({
      data: pokemon,
    });
  }
}
