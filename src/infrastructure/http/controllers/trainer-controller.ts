import { CapturePokemonUseCase } from '@application/use-cases/capture-pokemon';
import { CreateTrainerUseCase } from '@application/use-cases/create-trainer';
import { ListTrainerTeamUseCase } from '@application/use-cases/list-trainer-team';
import { CapturedPokemon } from '@domain/entities/captured-pokemon';
import { Trainer } from '@domain/entities/trainer';
import { Request, Response } from 'express';

import {
  capturePokemonBodySchema,
  createTrainerBodySchema,
  trainerIdParamsSchema,
} from '@infrastructure/http/validation/trainer-schemas';
import { validateRequest } from '@infrastructure/http/validation/validate-request';

export class TrainerController {
  constructor(
    private readonly createTrainerUseCase: CreateTrainerUseCase,
    private readonly capturePokemonUseCase: CapturePokemonUseCase,
    private readonly listTrainerTeamUseCase: ListTrainerTeamUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { name } = validateRequest(createTrainerBodySchema, req.body);

    const trainer = await this.createTrainerUseCase.execute({ name });

    return res.status(201).json({
      message: 'Treinador criado com sucesso!',
      data: this.formatTrainer(trainer),
    });
  }

  async capture(
    req: Request<{ trainerId: string }>,
    res: Response,
  ): Promise<Response> {
    const { trainerId } = validateRequest(trainerIdParamsSchema, req.params);
    const { pokemonName } = validateRequest(capturePokemonBodySchema, req.body);

    const capturedPokemon = await this.capturePokemonUseCase.execute({
      trainerId,
      pokemonName,
    });

    return res.status(201).json({
      message: 'Pokémon capturado com sucesso!',
      data: this.formatCapturedPokemon(capturedPokemon),
    });
  }

  async team(
    req: Request<{ trainerId: string }>,
    res: Response,
  ): Promise<Response> {
    const { trainerId } = validateRequest(trainerIdParamsSchema, req.params);

    const team = await this.listTrainerTeamUseCase.execute(trainerId);

    return res.status(200).json({
      data: team.map((capturedPokemon) =>
        this.formatCapturedPokemon(capturedPokemon),
      ),
    });
  }

  private formatTrainer(trainer: Trainer) {
    return {
      id: trainer.id,
      name: trainer.name,
      createdAt: trainer.createdAt,
    };
  }

  private formatCapturedPokemon(capturedPokemon: CapturedPokemon) {
    return {
      id: capturedPokemon.id,
      trainerId: capturedPokemon.trainerId,
      pokemonName: capturedPokemon.pokemonName,
      imageUrl: capturedPokemon.imageUrl,
      types: capturedPokemon.types,
      baseExperience: capturedPokemon.baseExperience,
      stats: {
        hp: capturedPokemon.hp,
        attack: capturedPokemon.attack,
        defense: capturedPokemon.defense,
        speed: capturedPokemon.speed,
      },
      isActive: capturedPokemon.isActive,
      createdAt: capturedPokemon.createdAt,
    };
  }
}
