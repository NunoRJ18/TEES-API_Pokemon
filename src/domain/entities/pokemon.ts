export interface PokemonProps {
  id?: string;
  name: string;
  type: string[];
  level: number;
  evolution: number;
}

export class Pokemon {
  private props: PokemonProps;

  constructor(props: PokemonProps) {
    if (!props.name) {
      throw new Error('O pokemon precisa ter um nome');
    }

    if (!props.type || props.type.length === 0 || props.type.length > 2) {
      throw new Error('O pokemon só pode ter no máximo dois tipos');
    }

    if (!props.level || props.level < 1 || props.level > 100) {
      throw new Error('O pokemon deve ter um nível de 1 a 100');
    }

    if (!props.evolution || props.evolution < 1 || props.evolution > 3) {
      throw new Error('O pokemon precisa ser uma evolução de 1 a 3');
    }

    this.props = {
      ...props,
      id: props.id ?? crypto.randomUUID(),
    };
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get type() {
    return this.props.type;
  }
  get level() {
    return this.props.level;
  }
  get evolution() {
    return this.props.evolution;
  }
}
