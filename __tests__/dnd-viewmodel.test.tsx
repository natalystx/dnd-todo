import { renderHook } from "@testing-library/react";
import { useViewModel } from "../app/components/module/TodoSection/viewmodel";
import { describe, test, expect } from "vitest";
import { Status } from "@/app/store/useTodos";
import { getActiveEvent } from "@/__mocks__/getActiveEvent";
import { over } from "lodash";
import { getOverEvent } from "@/__mocks__/getOverEvent";
import { Over } from "@dnd-kit/core";

const { result, rerender } = renderHook(useViewModel);
const todo = {
  id: "1",
  title: "Test",
  status: Status.NEW,
};

describe("DND viewmodel", () => {
  test("should return an array of todos", () => {
    expect(Array.isArray(result.current.todos)).toBe(true);
  });

  test("should initial value is empty array", () => {
    expect(result.current.todos.length).toEqual(0);
  });

  test("should return getStatus return correct", () => {
    let status = result.current.getStatus("NEW");
    expect(status).toEqual(Status.NEW);
    status = result.current.getStatus("Inprogress");
    expect(status).toEqual(Status.INPROGRESS);
    status = result.current.getStatus("Completed");
    expect(status).toEqual(Status.COMPLETED);
    status = result.current.getStatus(Date.now().toString());
    expect(status).toEqual(Status.NEW);
  });

  test("should drag start set a activeTodo", () => {
    expect(result.current.activeTodo).toBeNull();
    result.current.handleDragStart(getActiveEvent(todo));
    rerender();
    expect(result.current.activeTodo?.id).toEqual(todo.id);
  });

  test("should drag to column need to change status", () => {
    expect(result.current.todos.length).toEqual(0);
    // setup todos
    result.current.setTodos([todo]);
    rerender();
    expect(result.current.todos.length).toEqual(1);
    result.current.handleDragStart(getActiveEvent(todo));
    rerender();
    result.current.handleDragEnd({
      active: getActiveEvent(todo).active,
      over: getOverEvent("Inprogress", todo).over as unknown as Over,
      delta: { x: 0, y: 0 },
      collisions: null,
      activatorEvent: new Event(""),
    });
    rerender();
    expect(result.current.todos[0].status).toEqual(Status.INPROGRESS);
  });

  test("should drop over todo card need to reorder", () => {
    // reset todos
    result.current.setTodos([]);
    rerender();
    expect(result.current.todos.length).toEqual(0);
    // setup todos
    result.current.setTodos([todo, { ...todo, id: "2" }]);
    rerender();
    expect(result.current.todos.length).toEqual(2);
    result.current.handleDragStart(getActiveEvent(todo));
    rerender();
    result.current.handleDragEnd({
      active: getActiveEvent(todo).active,
      over: getOverEvent("2", { ...todo, id: "2" }).over as unknown as Over,
      delta: { x: 0, y: 0 },
      collisions: null,
      activatorEvent: new Event(""),
    });
    rerender();
    expect(result.current.todos[0].id).toEqual("2");
  });

  test("should drag over todo card need to reorder", () => {
    // reset todos
    result.current.setTodos([]);
    rerender();
    expect(result.current.todos.length).toEqual(0);
    // setup todos
    result.current.setTodos([todo, { ...todo, id: "2" }]);
    rerender();
    expect(result.current.todos.length).toEqual(2);
    result.current.handleDragStart(getActiveEvent(todo));
    rerender();
    result.current.onDragOver({
      active: getActiveEvent(todo).active,
      over: getOverEvent("2", { ...todo, id: "2" }).over as unknown as Over,
      delta: { x: 0, y: 0 },
      collisions: null,
      activatorEvent: new Event(""),
    });
    rerender();
    expect(result.current.todos[0].id).toEqual("2");
  });
});
