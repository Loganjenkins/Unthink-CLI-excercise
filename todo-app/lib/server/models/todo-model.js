"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TodoModel {
    constructor(init) {
        this.completed = false;
        Object.assign(this, init);
        if (this.dateCreated) {
            this.dateCreated = new Date(this.dateCreated);
        }
    }
}
exports.TodoModel = TodoModel;
//# sourceMappingURL=todo-model.js.map