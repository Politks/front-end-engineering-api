export interface TodoProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Todo {
  private props: TodoProps;

  constructor(props: TodoProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get completed(): boolean {
    return this.props.completed;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toggleComplete(): void {
    this.props.completed = !this.props.completed;
    this.props.updatedAt = new Date();
  }

  updateTitle(title: string): void {
    this.props.title = title;
    this.props.updatedAt = new Date();
  }

  updateDescription(description: string): void {
    this.props.description = description;
    this.props.updatedAt = new Date();
  }

  toJSON(): TodoProps {
    return { ...this.props };
  }
} 