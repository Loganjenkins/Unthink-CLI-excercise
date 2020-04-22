import { ResourceBase } from './resource-base';
import { resource, get, template, TemplateResponse, RedirectResponse, ApiResponse, CookieResponse } from 'resource-decorator';
import {TodoModel} from "../models/todo-model";

const _allTodos: TodoModel[] = [
  new TodoModel({
    id: 0,
    title: 'The first one!',
    completed: true
  }),
  new TodoModel({
    id: 1,
    title: 'SECOND one!'
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
  async getMessage(): Promise<ApiResponse | CookieResponse | void> {
    return new ApiResponse(_allTodos);
  }
}
