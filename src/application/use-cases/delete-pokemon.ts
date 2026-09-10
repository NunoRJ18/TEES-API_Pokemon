import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

export class DeletePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<boolean> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      return false;
    }

    await this.pokemonRepository.delete(id);

    return true;
  }
}
