import { Request, Response } from 'express';
import { CreatePokemonUseCase } from '@application/use-cases/create-pokemon';
import { ListPokemonsUseCase } from '@application/use-cases/list-pokemons';
import { FindPokemonByIdUseCase } from '@application/use-cases/find-pokemon-by-id';
import { UpdatePokemonUseCase } from '@application/use-cases/update-pokemon';
import { DeletePokemonUseCase } from '@application/use-cases/delete-pokemon';
import {
  createPokemonBodySchema,
  listPokemonsQuerySchema,
  pokemonIdParamsSchema,
  updatePokemonBodySchema,
} from '@infrastructure/http/validation/pokemon-schemas';
import { validateRequest } from '@infrastructure/http/validation/validate-request';

export class PokemonController {
  constructor(
    private createPokemonUseCase: CreatePokemonUseCase,
    private listPokemonsUseCase: ListPokemonsUseCase,
    private findPokemonByIdUseCase: FindPokemonByIdUseCase,
    private updatePokemonUseCase: UpdatePokemonUseCase,
    private deletePokemonUseCase: DeletePokemonUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { id, name, type, level, evolution } = validateRequest(
      createPokemonBodySchema,
      req.body,
    );

    const pokemon = await this.createPokemonUseCase.execute({
      id,
      name,
      type,
      level,
      evolution,
    });

    return res.status(201).json({
      message: 'Pokémon criado com sucesso!',
      data: {
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.type,
        level: pokemon.level,
        evolution: pokemon.evolution,
      },
    });
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { type } = validateRequest(listPokemonsQuerySchema, req.query);

    const pokemons = await this.listPokemonsUseCase.execute(type);

    const formattedPokemons = pokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      type: pokemon.type,
      level: pokemon.level,
      evolution: pokemon.evolution,
    }));

    return res.status(200).json({ data: formattedPokemons });
  }

  async findById(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> {
    const { id } = validateRequest(pokemonIdParamsSchema, req.params);

    const pokemon = await this.findPokemonByIdUseCase.execute(id);

    if (!pokemon) {
      return res.status(404).json({
        message: 'Pokémon não encontrado!',
      });
    }

    return res.status(200).json({
      data: {
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.type,
        level: pokemon.level,
        evolution: pokemon.evolution,
      },
    });
  }

  async update(req: Request<{ id: string }>, res: Response): Promise<Response> {
    const { id } = validateRequest(pokemonIdParamsSchema, req.params);
    const { name, type, level, evolution } = validateRequest(
      updatePokemonBodySchema,
      req.body,
    );

    const pokemon = await this.updatePokemonUseCase.execute(id, {
      name,
      type,
      level,
      evolution,
    });

    if (!pokemon) {
      return res.status(404).json({
        message: 'Pokémon não encontrado!',
      });
    }

    return res.status(200).json({
      message: 'Pokémon atualizado com sucesso!',
      data: {
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.type,
        level: pokemon.level,
        evolution: pokemon.evolution,
      },
    });
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<Response> {
    const { id } = validateRequest(pokemonIdParamsSchema, req.params);

    const deleted = await this.deletePokemonUseCase.execute(id);

    if (!deleted) {
      return res.status(404).json({
        message: 'Pokémon não encontrado!',
      });
    }

    return res.status(200).json({
      message: 'Pokémon removido com sucesso!',
    });
  }
}
