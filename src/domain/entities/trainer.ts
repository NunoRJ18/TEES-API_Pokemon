export interface TrainerProps {
  id?: string;
  name: string;
  createdAt?: Date;
}

export class Trainer {
  private props: TrainerProps;

  constructor(props: TrainerProps) {
    if (!props.name) {
      throw new Error('O treinador precisa ter um nome');
    }

    this.props = {
      ...props,
      id: props.id ?? crypto.randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
