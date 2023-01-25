/**
 * @jest-environment jsdom
 */

import { createHtml } from "../ts/main";
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
  (document.body as HTMLBodyElement).innerHTML = '';
})

test('should create html', () => {
  (document.body as HTMLBodyElement).innerHTML = '<ul id="todos" class="todo">fdsafdsaa</ul>';
  const todos: Todo[] = [new Todo('Träna', false)];
  console.log(todos);
  console.log(document.body.innerHTML);
  
  createHtml(todos);
  
  expect(document.getElementById('todos')?.innerHTML).toBe('<li class="todo__text">Träna</li>');
  console.log(document.body.innerHTML);
})
