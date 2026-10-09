import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer-repository';
import { prisma } from '@infrastructure/database/prisma/prisma-client';

interface PrismaTrainer {
  id: string;
  name: string;
  createdAt: Date;
}

export class PrismaTrainerRepository implements ITrainerRepository {
  async create(trainer: Trainer): Promise<void> {
    await prisma.trainer.create({
      data: {
        id: trainer.id,
        name: trainer.name,
        createdAt: trainer.createdAt,
      },
    });
  }

  async findById(id: string): Promise<Trainer | null> {
    const trainer = await prisma.trainer.findUnique({
      where: { id },
    });

    return trainer ? this.toDomain(trainer) : null;
  }

  private toDomain(trainer: PrismaTrainer): Trainer {
    return new Trainer({
      id: trainer.id,
      name: trainer.name,
      createdAt: trainer.createdAt,
    });
  }
}
