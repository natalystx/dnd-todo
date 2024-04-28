import { renderHook } from "@testing-library/react";
import { Status, useTodos } from "../app/store/useTodos";
import { describe, test, expect, beforeEach } from "vitest";

const { result, rerender } = renderHook(useTodos);

beforeEach(() => {
  result.current.setTodos([]);
  rerender();
});

describe("useTodos", () => {
  test("should return an array of todos", () => {
    expect(Array.isArray(result.current.todos)).toBe(true);
  });

  test("should initial value is empty array", () => {
    expect(result.current.todos.length).toEqual(0);
  });

  test("should initial value is empty array", () => {
    expect(result.current.todos.length).toEqual(0);
  });

  test("should return a todo object", () => {
    result.current.addTodo({
      id: "1",
      title: "Test",
      status: Status.NEW,
      tags: ["tag1", "tag2"],
    });
    rerender();
    expect(result.current.todos[0]).toEqual({
      id: "1",
      title: "Test",
      status: Status.NEW,
      tags: ["tag1", "tag2"],
    });
  });

  test("should add a todo", () => {
    result.current.addTodo({
      id: "1",
      title: "Test",
      status: Status.NEW,
    });
    rerender();
    expect(result.current.todos.length).toEqual(1);
  });

  test("should remove a todo", () => {
    result.current.addTodo({
      id: "1",
      title: "Test",
      status: Status.NEW,
    });
    rerender();
    expect(result.current.todos.length).toEqual(1);
    result.current.removeTodo("1");
    rerender();
    expect(result.current.todos.length).toEqual(0);
  });

  test("should update a todo", () => {
    result.current.addTodo({
      id: "1",
      title: "Test",
      status: Status.NEW,
    });
    rerender();
    expect(result.current.todos[0].status).toEqual(Status.NEW);

    result.current.updateTodo({
      id: "1",
      title: "Test",
      status: Status.COMPLETED,
    });
    rerender();
    expect(result.current.todos[0].status).toEqual(Status.COMPLETED);
  });
});
