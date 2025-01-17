import { changeTodo, removeAllTodos, addTodo, sortTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

describe("test function addTodo", () => {
  test("should add one item to todos array", () => {
    const todos = [new Todo("Programmera", false), new Todo("Laga mat", true)];
    const todoText = "Städa";
    const length = todos.length;

    const response = addTodo(todoText, todos);

    expect(response.success).toBe(true);
    expect(todos.length).toBe(length + 1);
  });

  test("should fail to add item to todos array", () => {
    const todos = [new Todo("Programmera", false), new Todo("Laga mat", true)];
    const todoText = "St";
    const length = todos.length;

    const response = addTodo(todoText, todos);

    expect(response.success).toBe(false);
    expect(response.error.length > 0).toBe(true);
    expect(todos.length).toBe(length);
  });
});

describe("test function changeTodo", () => {
  test("should change todo.done to true", () => {
    // Arrange
    const todo = new Todo("Shower", false);

    // Act
    changeTodo(todo);

    // Assert
    expect(todo.done).toBe(true);
  });

  test("should change todo.done to false", () => {
    // Arrange
    const todo = new Todo("Shower", true);

    // Act
    changeTodo(todo);

    // Assert
    expect(todo.done).toBe(false);
  });
});

describe("test function removeAllTodos", () => {
  test("should clear array successfully", () => {
    // 1. Arrange
    const arr: Todo[] = [new Todo("Fold laundry", false), new Todo("Eat lunch", false)];

    // 2. Act
    removeAllTodos(arr);

    // 3. Assert
    expect(arr.length).toBe(0);
  });

  test("should not alter array", () => {
    const todos: Todo[] = [];
    let length = todos.length;

    removeAllTodos(todos);

    expect(todos.length).toBe(length);
  });
});

describe("test function sortTodos", () => {
  test("should sort array after name", () => {
    const todos = [new Todo("Träna", false), new Todo("Utred", false), new Todo("Agna bete", false)];

    sortTodos(todos);

    expect(todos[0].text.slice(0, 1).toUpperCase() < todos[todos.length - 1].text.slice(0, 1).toUpperCase()).toBe(true);
    expect(todos[0].text.slice(0, 1).toUpperCase() < todos[1].text.slice(0, 1).toUpperCase()).toBe(true);
    expect(todos[1].text.slice(0, 1).toUpperCase() < todos[todos.length - 1].text.slice(0, 1).toUpperCase()).toBe(true);
    expect(todos[0].text).toBe("Agna bete");
  });

  test("should not alter array", () => {
    const todos = [new Todo("Baka", false), new Todo("Fika", false), new Todo("Äta", false)];

    sortTodos(todos);

    expect(todos[0].text).toBe("Baka");
    expect(todos[1].text).toBe("Fika");
    expect(todos[2].text).toBe("Äta");
  });
});
