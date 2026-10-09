import {
  IPokeApiGateway,
  PokeApiPokemonDTO,
} from '@application/gateways/poke-api-gateway';

interface PokeApiTypeResponse {
  type: {
    name: string;
  };
}

interface PokeApiStatResponse {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokeApiPokemonResponse {
  name: string;
  base_experience: number;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  types: PokeApiTypeResponse[];
  stats: PokeApiStatResponse[];
}

export class PokeApiProvider implements IPokeApiGateway {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  async findByName(name: string): Promise<PokeApiPokemonDTO | null> {
    const response = await fetch(
      `${this.baseUrl}/pokemon/${name.toLowerCase()}`,
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Erro ao consultar a PokéAPI');
    }

    const data = (await response.json()) as PokeApiPokemonResponse;
    const stats = this.getStats(data.stats);

    return {
      name: data.name,
      imageUrl:
        data.sprites.other?.['official-artwork']?.front_default ??
        data.sprites.front_default ??
        '',
      types: data.types.map((type) => type.type.name),
      baseExperience: data.base_experience,
      stats,
    };
  }

  private getStats(stats: PokeApiStatResponse[]): PokeApiPokemonDTO['stats'] {
    return {
      hp: this.getStatValue(stats, 'hp'),
      attack: this.getStatValue(stats, 'attack'),
      defense: this.getStatValue(stats, 'defense'),
      speed: this.getStatValue(stats, 'speed'),
    };
  }

  private getStatValue(stats: PokeApiStatResponse[], statName: string): number {
    const stat = stats.find((item) => item.stat.name === statName);

    return stat?.base_stat ?? 0;
  }
}
