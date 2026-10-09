export interface PokeApiPokemonDTO {
  name: string;
  imageUrl: string;
  types: string[];
  baseExperience: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

export interface IPokeApiGateway {
  findByName(name: string): Promise<PokeApiPokemonDTO | null>;
}
