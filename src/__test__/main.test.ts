/**
 * @jest-environment jsdom
*/

import { createHtml, toggleTodo } from "../ts/main";
import { Todo } from "../ts/models/Todo";

test('todosContainer.length should be 1', () => {
  document.body.innerHTML = '<ul id="todos" class="todo"></ul>';
  const todos: Todo[] = [new Todo('Springa', false)];
  const todosContainer = document.getElementById('todos');
  const body = document.querySelector('body');

  createHtml(todos);
  expect(todosContainer?.children.length).toBe(1);

})
