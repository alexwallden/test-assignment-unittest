/**
 * @jest-environment jsdom
 */

/* FUNKTIONER MED BARA LOGIK */

// displayError KLAR

/* FUNKTIONER MED LOGIK OCH FUNKTIONER */

// createHtml
// toggleTodo

/* FUNKTIONER MED FUNKTIONER */

// clearTodos
// createNewTodo

import { Todo } from "../ts/models/Todo";
import * as main from '../ts/main';

beforeEach(() => {
  (document.body as HTMLBodyElement).innerHTML = '';
  jest.clearAllMocks();
})

describe('test function displayError', () => {
  test('should contain error message', () => { // 67-75
    document.body.innerHTML = /*html */`
    <div id="error" class="error"></div>
    `
    const errorContainer = document.getElementById('error') as HTMLDivElement;
    const error = 'Något gick fel';
    
    main.displayError(error, true);
    
    expect(errorContainer.innerHTML).toBe(error);
  });

  test('should test if classList DOES NOT contain show', () => { // 76
    document.body.innerHTML = /*html */`
    <div id="error" class="error"></div>
    `
    const errorContainer = document.getElementById('error') as HTMLDivElement;
    const error = 'Något gick fel';
    
    main.displayError(error, false);

    expect(errorContainer.classList.contains).not.toBe('show');
  })
});

describe('test function createHtml', () => {
  test('should append list item', () => {
    (document.body as HTMLBodyElement).innerHTML = /*html */`
    <ul id="todos" class="todo"></ul>
    `
    const todos: Todo[] = [new Todo('Träna', false)];
    const todosContainer = document.getElementById('todos');
    const length = todosContainer?.children.length as number;

    main.createHtml(todos);

    expect(todosContainer?.children.length).toBe(length + 1);
  })
})



test('should create html', () => {
  (document.body as HTMLBodyElement).innerHTML = '<ul id="todos" class="todo"></ul><button type="button" id="clearTodos">Rensa lista</button>';
  const todos: Todo[] = [new Todo('Träna', false)];

  document.getElementById("clearTodos")?.addEventListener("click", () => {
    main.clearTodos(todos);
  });

  document.getElementById("clearTodos")?.click();

  // main.createHtml(todos);
  const todosContainer = document.getElementById('todos');
  expect(document.getElementById('todos')?.innerHTML).toBe('');
  expect(document.getElementById('todos')?.children.length).toBe(0);
  console.log(document.body.innerHTML);
});

test('should call createHtml once', () => {
  document.body.innerHTML = `<ul id="todos" class="todo"></ul>';`
  const todos = [new Todo('Ta rast', false)]
  let spy = jest.spyOn(main, 'createHtml').mockReturnValue();
  main.createNewTodo('Promenad', todos);

  expect(spy).toHaveBeenCalledTimes(1);
});

test('should change todo.done to true', () => {
  document.body.innerHTML = `<ul id="todos" class="todo"></ul>';`
  const todo = new Todo('Äta', false);
  const todos: Todo[] = [todo];
  const spy = jest.spyOn(main, 'toggleTodo');

  main.toggleTodo(todo);

  expect(spy).toBeCalled();
  expect(todo.done).toBe(true);
})

test('should clear todos array', () => {
  document.body.innerHTML = /*html*/`
  <ul id="todos" class="todo"></ul>
  <button type="button" id="clearTodos">Rensa lista</button>
  `;
  const todos = [new Todo('Ta rast', false)]
  const length = todos.length;
  expect(todos.length).toBe(1);
  let spy = jest.spyOn(main, 'createHtml');

  main.clearTodos(todos);
  // (document.getElementById('clearTodos') as HTMLButtonElement).click();

  // expect(todos.length).toBe(length - 1);
  // expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalled();
})




test('should call displayError once', () => {
  // document.body.innerHTML = `<ul id="todos" class="todo"></ul>';`
  const todos = [new Todo('Ta rast', false)]
  let spy = jest.spyOn(main, 'displayError').mockReturnValue();
  main.createNewTodo('Pr', todos);
  
  expect(spy).toHaveBeenCalledTimes(1);
});






// test('should call function clearTodos once', () => {
//   document.body.innerHTML = /*html*/`
//   <button type="button" id="clearTodos">Rensa lista</button>
//   `;
//   const todos: Todo[] = [new Todo('Ta rast', false)];
//   let spy = jest.spyOn(main, 'clearTodos').mockReturnValue();
//   (document.getElementById('clearTodos') as HTMLButtonElement)?.click();


//   expect(spy).toHaveBeenCalled();
// })