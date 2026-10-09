export interface CapturedPokemonProps {
  id?: string;
  trainerId: string;
  pokemonName: string;
  imageUrl: string;
  types: string[];
  baseExperience: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  isActive?: boolean;
  createdAt?: Date;
}

export class CapturedPokemon {
  private props: CapturedPokemonProps;

  constructor(props: CapturedPokemonProps) {
    if (!props.trainerId) {
      throw new Error('A captura precisa estar associada a um treinador');
    }

    if (!props.pokemonName) {
      throw new Error('A captura precisa ter o nome do Pokémon');
    }

    if (!props.imageUrl) {
      throw new Error('A captura precisa ter a imagem do Pokémon');
    }

    if (!props.types || props.types.length === 0) {
      throw new Error('A captura precisa ter ao menos um tipo');
    }

    this.props = {
      ...props,
      id: props.id ?? crypto.randomUUID(),
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id() {
    return this.props.id;
  }

  get trainerId() {
    return this.props.trainerId;
  }

  get pokemonName() {
    return this.props.pokemonName;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get types() {
    return this.props.types;
  }

  get baseExperience() {
    return this.props.baseExperience;
  }

  get hp() {
    return this.props.hp;
  }

  get attack() {
    return this.props.attack;
  }

  get defense() {
    return this.props.defense;
  }

  get speed() {
    return this.props.speed;
  }

  get isActive() {
    return this.props.isActive;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
