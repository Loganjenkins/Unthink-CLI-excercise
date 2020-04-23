import {TodoModel} from '../../../server/models/todo-model';

export async function getTodos(): Promise<TodoModel[]> {
  const response = await window.fetch (
    '/api/todo',
    {
      headers: {
        'Content-type': 'application/json'
      }
    }
  );

  return (await response.json()).map((record: Record<string, unknown>) => new TodoModel(record));
}

export async function createTodo(newTodo: TodoModel): Promise<void> {
  const response = await window.fetch (
    '/api/add-todo',
    {
      method: 'POST',
      body: JSON.stringify({
        newTodo: newTodo
      })
    }
  );

  if (!response.ok) {
    console.log('something went wrong...');
  }
}
