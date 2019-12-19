import { inject } from 'aurelia-framework';
import { Todo } from '../resources/data/todo-object';
@inject(Todo)

export class Todos {
    constructor(todo) {
        this.todo = todo;
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
        this.statuses = ['Todo', 'In Process', 'Completed'];
        this.isCheckedCompleted = true;
    }

    async attached() {
        await this.getTodos();
    }

    async getTodos() {
        await this.todo.getTodos(this.userObj._id);
        this.showForm = false;
    }

    async saveTodo() {
        await this.todo.saveTodo()
        this.getTodos();
    }

    editTodo(todo) {
        this.todo.selectedTodo = todo;
        this.showForm = true;
    }

    updateTodo(todo) {
        this.todo.selectedTodo = todo;
        this.saveTodo();
    }

    newTodo() {
        this.todo.newTodo(this.userObj._id);
        this.showForm = true;
    }

    async deleteTodo(todo) {
        await this.todo.deleteTodo(todo._id);
        this.getTodos();
    }

    Cancel() {
        this.showForm = false;
    }
}