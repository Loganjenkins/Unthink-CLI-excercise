import { ResourceBase } from './resource-base';
import { resource, get, post, put, ResourceError, body, del, template,
  ApiResponse, TemplateResponse, RedirectResponse,
  CookieResponse } from 'resource-decorator';
import {TodoModel} from '../models/todo-model';

const _allTodos: TodoModel[] = [
  new TodoModel({
    id: 0,
    title: 'The first one!',
    completed: true,
    dateCreated: new Date('2020-01-21')
  }),
  new TodoModel({
    id: 1,
    title: 'SECOND one!',
    completed: false,
    dateCreated: new Date('2020-02-11')
  })
];

@resource({
  basePath: '',
})
export class TodoResource extends ResourceBase {
  @template()
  async todoPage(): Promise<TemplateResponse | RedirectResponse> {
    return new TemplateResponse('todo.html');
  }

  @get({
    path: '/api/todo'
  })
  async getTodos(): Promise<ApiResponse | CookieResponse | void> {
    return new ApiResponse(_allTodos);
  }

  @post({
    path: '/api/add-todo'
  })
  async createTodo(@body() model: TodoModel): Promise<ApiResponse | CookieResponse | void> {

    let id = 0;
    const lastTodo = _allTodos[_allTodos.length - 1]
    if (lastTodo !== null && lastTodo.id !== null) {
      id = lastTodo.id + 1;
    }

    const result = new TodoModel({
      id: id,
      title: model.title,
      completed: model.completed,
      dateCreated: new Date()
    });

    _allTodos.push(result);

    return new ApiResponse(_allTodos);
  }

  @put({
    path: '/api/update-todo'
  })
  async editTodo(@body() model: TodoModel): Promise<ApiResponse | CookieResponse | void> {
    let foundId = false;

    for (let i = 0; i < _allTodos.length; i++) {
      if (_allTodos[i].id === model.id) {
        _allTodos[i].title = model.title;
        _allTodos[i].completed = model.completed;
        foundId = true;
      }
    }

    if (!foundId) {
      throw new ResourceError(`Toto with ID ${model.id} does not exist.`);
    }

    return new ApiResponse(_allTodos);
  }

  @del({
    path: '/api/delete-todo'
  })
  async deleteTodo(@body() model: TodoModel): Promise<ApiResponse | CookieResponse | void> {
    let foundId = false;

    for (let i = _allTodos.length; i--; i < 0) {
      if (_allTodos[i].id === model.id) {
        _allTodos.splice(i, 1);
        foundId = true;
      }
    }

    if (!foundId) {
      throw new ResourceError(`Toto with ID ${model.id} does not exist.`);
    }

    return new ApiResponse(_allTodos);
  }
}
