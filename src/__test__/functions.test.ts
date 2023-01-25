import { changeTodo, removeAllTodos, addTodo } from "../ts/functions";
import { Todo } from "../ts/models/Todo";
import { IAddResponse } from "../ts/models/IAddResult";

test('should change todo.done to true', () => {
  // Arrange
  const todo = new Todo('Shower', false);

  // Act
  changeTodo(todo);

  // Assert
  expect(todo.done).toBe(true);
});

test('should clear array', () => {
  // 1. Arrange
  const arr: Todo[] = [new Todo('Fold laundry', false), new Todo('Eat lunch', false)];

  // 2. Act
  removeAllTodos(arr);

  // 3. Assert
  expect(arr.length).toBe(0);
});

describe('test function addTodo', () => {
  test('should return success: true and add todo to array', () => {
    const arr: Todo[] = [new Todo('Diska', false)]
    const arrLength = arr.length;
    const todoText = 'Handla';

    const response = addTodo(todoText, arr);

    expect(response.success).toBe(true);
    expect(arr.length).toBe(arrLength + 1);

  })

  test('should return success: false', () => {
    const todos: Todo[] = []
    const todoText = 'WO';
    
    const response: IAddResponse = addTodo(todoText, todos);
    
    expect(response.success).toBe(false);
  })
})


