import { ResourceBase } from './resource-base';
import { resource, get, post, body, template,
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
    dateCreated: new Date('2020-03-01')

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
  async createTodo(@body() newTodo: TodoModel): Promise<ApiResponse | CookieResponse | void> {
    if(newTodo.id === null) {
      let id = 0;
      const lastTodo = _allTodos[_allTodos.length - 1]
      if(lastTodo !== null && lastTodo.id !== null) {
        id = lastTodo.id + 1;
      }
      newTodo.id = id;
    }

    _allTodos.push(newTodo);


    return new ApiResponse(_allTodos);
  }
}
