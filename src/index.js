import './style.css';
import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHTML);
// todoList.todos.forEach((todo) => crearTodoHTML(todo));
