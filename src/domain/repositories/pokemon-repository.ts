import { Pokemon } from '@domain/entities/pokemon';

export interface IPokemonRepository {
  create(pokemon: Pokemon): Promise<void>;
  findById(id: string): Promise<Pokemon | null>;
  findAll(type?: string): Promise<Pokemon[]>;
  update(id: string, pokemon: Pokemon): Promise<void>;
  delete(id: string): Promise<void>;
}
