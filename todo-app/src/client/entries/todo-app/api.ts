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

export async function createTodo(
  title: string,
  completed: boolean): Promise<string> {

  try {
    const response = await window.fetch (
      '/api/add-todo',
      {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          completed: completed
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return (await response.json());
  } catch (e) {
    throw e;
  }
}

export async function updateTodo(
  id: number,
  title: string,
  completed: boolean): Promise<string> {

  try {
    const response = await window.fetch (
      '/api/update-todo',
      {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: title,
          completed: completed
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return (await response.json());
  } catch (e) {
    throw e;
  }
}

export async function deleteTodo(id: number): Promise<string> {

  try {
    const response = await window.fetch (
      '/api/delete-todo',
      {
        method: 'DELETE',
        body: JSON.stringify({
          id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return (await response.json());
  } catch (e) {
    throw e;
  }
}
