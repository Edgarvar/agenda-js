import './style.css';

import {Todo, TodoList } from './js/classes/index.js'
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );

console.log( 'todos', todoList.todos);

// const tarea = new Todo("Aprende Javascript");
// todoList.nuevoTodo( tarea );

// console.log(todoList);

// crearTodoHtml(tarea);


// localStorage.setItem('mi-key', 'ABC123');

// setTimeout(() => {

//     localStorage.removeItem('mi-key')

// }, 1500 )
// setTimeout(() => {
//     localStorage.removeItem('todo')
// }, 2000);

