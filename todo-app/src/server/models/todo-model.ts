export class TodoModel {
  id?: number;
  title: string;
  completed: boolean = false;

  constructor(init?: Partial<TodoModel>) {
    Object.assign(this, init);
  }
}