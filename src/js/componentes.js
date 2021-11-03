// Referencias html

import { Todo } from '../classes';
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFlistro = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {
  const htmlTodo = `
  <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
      <label>${todo.tarea}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>`;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);
  return div;
};

txtInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    // console.log(todoList);
    crearTodoHTML(nuevoTodo);
    txtInput.value = '';
  }
});

divTodoList.addEventListener('click', (event) => {
  const nombreElement = event.target.localName;
  const todoElement = event.target.parentElement.parentElement;
  const todoId = todoElement.getAttribute('data-id');

  if (nombreElement.includes('input')) {
    todoList.marcarCompletado(todoId);
    todoElement.classList.toggle('completed');
  } else if (nombreElement.includes('button')) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElement);
  }
});

btnBorrar.addEventListener('click', () => {
  todoList.eliminarCompletado();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains('completed')) {
      divTodoList.removeChild(elemento);
    }
  }
  // console.log(todoList);
});

ulFiltros.addEventListener('click', (event) => {
  const filtro = event.target.text;
  // console.log(filtro);
  if (!filtro) {
    return;
  }

  anchorFlistro.forEach((elem) => elem.classList.remove('selected'));
  event.target.classList.add('selected');

  for (const elemento of divTodoList.children) {
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');
    switch (filtro) {
      case 'Pendientes':
        if (completado) {
          elemento.classList.add('hidden');
        }
        break;

      case 'Completados':
        if (!completado) {
          elemento.classList.add('hidden');
        }
        break;
    }
  }
});