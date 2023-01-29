/**
 * @jest-environment jsdom
 */

/* FUNKTIONER MED BARA LOGIK */

// displayError KLAR

/* FUNKTIONER MED LOGIK OCH FUNKTIONER */

// createHtml KLAR
// toggleTodo KLAR

/* FUNKTIONER MED FUNKTIONER */

// clearTodos
// createNewTodo

import { Todo } from "../ts/models/Todo";
import * as main from '../ts/main';
import * as functions from '../ts/functions';

beforeEach(() => {
  (document.body as HTMLBodyElement).innerHTML = '';
  // jest.clearAllMocks();
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

  test('test if classList DOES NOT contain show', () => { // 76
    document.body.innerHTML = /*html*/`
    <div id="error" class="error"></div>
    `
    const errorContainer = document.getElementById('error') as HTMLDivElement;
    const error = 'Något gick fel';
    
    main.displayError(error, false);

    expect(errorContainer.classList.contains('show')).toBe(false);
  })
});

describe('test function createHtml', () => {

  test('should append list item', () => {
    (document.body as HTMLBodyElement).innerHTML = /*html*/`
    <ul id="todos" class="todo"></ul>
    `;
    const todos: Todo[] = [new Todo('Träna', false)];
    const todosContainer = document.getElementById('todos');
    const length = todosContainer?.children.length as number;

    main.createHtml(todos);

    expect(todosContainer?.children.length).toBe(length + 1);
  });

  test('should call function sortTodos', () => {
    (document.body as HTMLBodyElement).innerHTML = /*html*/`
    <ul id="todos" class="todo"></ul>
    `;
    const todos: Todo[] = [];
    const spy = jest.spyOn(functions, 'sortTodos').mockReturnValue();

    main.createHtml(todos);

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test('should add class todo__text--done', () => { // 48
    (document.body as HTMLBodyElement).innerHTML = /*html*/`
    <ul id="todos" class="todo"></ul>
    `;
    const todosContainer = document.getElementById('todos');
    const todos: Todo[] = [new Todo('Träna', true)];

    main.createHtml(todos);

    expect(todosContainer?.children[0].classList.contains('todo__text--done')).toBe(true);
  });
  
  test('should add todo name to childs innerHTML', () => {
    (document.body as HTMLBodyElement).innerHTML = /*html*/`
    <ul id="todos" class="todo"></ul>
    `;
    const todosContainer = document.getElementById('todos');
    const todoName = 'Träna'
    const todos: Todo[] = [new Todo(todoName, true)];

    main.createHtml(todos);

    expect(todosContainer?.children[0].innerHTML).toBe(todoName);
  });

  test('should call toggleTodo once', () => {
    (document.body as HTMLBodyElement).innerHTML = /*html*/`
    <ul id="todos" class="todo"></ul>
    `;
    const todos: Todo[] = [new Todo('Träna', false)];
    const spy = jest.spyOn(main, 'toggleTodo');
    main.createHtml(todos);
    const todosContainer = document.getElementById('todos');
    const todoListItem = todosContainer?.children[0] as HTMLLIElement;

    todoListItem.click()

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});

describe('test function toggleTodo', () => {

  test('should call function changeTodo once', () => {
    (document.body as HTMLBodyElement).innerHTML = /*html*/`
    <ul id="todos" class="todo"></ul>
    `;
    const todo = new Todo('Äta', false);
    const spy = jest.spyOn(functions, 'changeTodo');

    main.toggleTodo(todo);

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test('should call function changeHtml once', () => {
    (document.body as HTMLBodyElement).innerHTML = /*html*/`
    <ul id="todos" class="todo"></ul>
    `;
    const todo = new Todo('Äta', false);
    const spy = jest.spyOn(main, 'createHtml');

    main.toggleTodo(todo);

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});

describe('test function createNewTodo', () => {

  test('should call addTodo once', () => {
    document.body.innerHTML = /*html*/`
    <div id="error" class="error"></div>
    `;
    const todoText = 'He';
    const todos = [new Todo('Diska', false)];
    const spy = jest.spyOn(functions, 'addTodo')
    
    main.createNewTodo(todoText, todos);

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  })
  
  test('should call createHtml once', () => {
    document.body.innerHTML = /*html*/`
    <ul id="todos" class="todo"></ul>
    `;
    const todos = [new Todo('Ta rast', false)];
    let spy = jest.spyOn(main, 'createHtml').mockReturnValue();
    main.createNewTodo('Promenad', todos);
  
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
  test('should call displayError once', () => {
    const todos = [new Todo('Ta rast', false)]
    let spy = jest.spyOn(main, 'displayError').mockReturnValue();
    main.createNewTodo('Pr', todos);
    
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
})



// test('should create html', () => {
//   (document.body as HTMLBodyElement).innerHTML = '<ul id="todos" class="todo"></ul><button type="button" id="clearTodos">Rensa lista</button>';
//   const todos: Todo[] = [new Todo('Träna', false)];

//   document.getElementById("clearTodos")?.addEventListener("click", () => {
//     main.clearTodos(todos);
//   });

//   document.getElementById("clearTodos")?.click();

//   // main.createHtml(todos);
//   const todosContainer = document.getElementById('todos');
//   expect(document.getElementById('todos')?.innerHTML).toBe('');
//   expect(document.getElementById('todos')?.children.length).toBe(0);
//   console.log(document.body.innerHTML);
// });



test('should change todo.done to true', () => {
  document.body.innerHTML = `<ul id="todos" class="todo"></ul>';`
  const todo = new Todo('Äta', false);
  const todos: Todo[] = [todo];
  const spy = jest.spyOn(main, 'toggleTodo');

  main.toggleTodo(todo);

  expect(spy).toBeCalled();
  expect(todo.done).toBe(true);
  spy.mockRestore();
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
  spy.mockRestore();
})







// test('should call function clearTodos once', () => {
//   document.body.innerHTML = /*html*/`
//   <button type="button" id="clearTodos">Rensa lista</button>
//   `;
//   const todos: Todo[] = [new Todo('Ta rast', false)];
//   let spy = jest.spyOn(main, 'clearTodos').mockReturnValue();
//   (document.getElementById('clearTodos') as HTMLButtonElement)?.click();


//   expect(spy).toHaveBeenCalled();
// })