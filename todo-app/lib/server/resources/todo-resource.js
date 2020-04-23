"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const resource_base_1 = require("./resource-base");
const resource_decorator_1 = require("resource-decorator");
const todo_model_1 = require("../models/todo-model");
const _allTodos = [
    new todo_model_1.TodoModel({
        id: 0,
        title: 'The first one!',
        completed: true,
        dateCreated: new Date('2020-01-21')
    }),
    new todo_model_1.TodoModel({
        id: 1,
        title: 'SECOND one!',
        dateCreated: new Date('2020-03-01')
    })
];
let TodoResource = class TodoResource extends resource_base_1.ResourceBase {
    async todoPage() {
        return new resource_decorator_1.TemplateResponse('todo.html');
    }
    async getTodos() {
        return new resource_decorator_1.ApiResponse(_allTodos);
    }
    async createTodo(newTodo) {
        if (newTodo.id === null) {
            let id = 0;
            const lastTodo = _allTodos[_allTodos.length - 1];
            if (lastTodo !== null && lastTodo.id !== null) {
                id = lastTodo.id + 1;
            }
            newTodo.id = id;
        }
        _allTodos.push(newTodo);
        return new resource_decorator_1.ApiResponse(_allTodos);
    }
};
__decorate([
    resource_decorator_1.template(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "todoPage", null);
__decorate([
    resource_decorator_1.get({
        path: '/api/todo'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "getTodos", null);
__decorate([
    resource_decorator_1.post({
        path: '/api/add-todo'
    }),
    __param(0, resource_decorator_1.body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_model_1.TodoModel]),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "createTodo", null);
TodoResource = __decorate([
    resource_decorator_1.resource({
        basePath: '',
    })
], TodoResource);
exports.TodoResource = TodoResource;
//# sourceMappingURL=todo-resource.js.map