/**
 * @jest-environment jsdom
*/

import { createHtml } from "../ts/main";
import { Todo } from "../ts/models/Todo";

interface IDocument {
  body: HTMLBodyElement;
}

test('todosContainer.length should be 1', () => {
  document.body.innerHTML = '<ul id="todos" class="todo"><li>gfds</li></ul>';
  const todos: Todo[] = [new Todo('Springa', false)];
  const todosList = document.getElementById('todos');

  createHtml(todos);
  // localStorage.setItem("todos", JSON.stringify(todos));

  // let todosContainer: HTMLUListElement = document.getElementById(
  //   "todos"
  // ) as HTMLUListElement;

  // todosContainer.innerHTML = "";

  // for (let i = 0; i < todos.length; i++) {
  //   let li: HTMLLIElement = document.createElement("li");

  //   if (todos[i].done) {
  //     li.classList.add("todo__text--done");
  //   }

  //   li.classList.add("todo__text");
  //   li.innerHTML = todos[i].text;
  //   // li.addEventListener("click", () => {
  //   //   toggleTodo(todos[i]);
  //   // });

  //   todosContainer.appendChild(li);

// }
  expect(todosList?.children.length).toBe(1);

})
