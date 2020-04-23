import { ResourceBase } from './resource-base';
import { resource, get, template, TemplateResponse, RedirectResponse, ApiResponse, CookieResponse } from 'resource-decorator';
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

  async getMessage(): Promise<ApiResponse | CookieResponse | void> {
    return new ApiResponse(_allTodos);
  }
}
