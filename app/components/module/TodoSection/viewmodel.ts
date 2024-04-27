import { Status, Todo, useTodos } from "@/app/store/useTodos";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";

export const useViewModel = () => {
  const { todos, setTodos, removeTodo, updateTodo } = useTodos();

  const containers = ["New", "Inprogress", "Completed"];

  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const getStatus = (id: string) => {
    switch (id) {
      case "New":
        return Status.NEW;
      case "Inprogress":
        return Status.INPROGRESS;
      case "Completed":
        return Status.COMPLETED;
      default:
        return Status.NEW;
    }
  };

  const changeStatus = (arr: Todo[], id: string, overId: string) => {
    const newTodos = arr.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: getStatus(overId),
        };
      }
      return todo;
    });

    setTodos(newTodos as Todo[]);
  };

  const updateStatus = (id: string, status: Status) => {
    const todo = todos.find((todo) => todo.id === id);
    todo && updateTodo({ ...todo, status });
  };

  const findContainer = (id: string) => {
    const status = todos.find((todo) => todo.id === id)?.status;
    switch (status) {
      case Status.NEW:
        return "New";
      case Status.INPROGRESS:
        return "Inprogress";
      case Status.COMPLETED:
        return "Completed";
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (containers.includes(over?.id as string)) {
      active.id && changeStatus(todos, active.id as string, over?.id as string);
    } else {
      if (active.id !== over?.id) {
        const activeIndex = todos.findIndex((todo) => todo.id === active.id);
        const overIndex = todos.findIndex((todo) => todo.id === over?.id);
        const newTodos = moveArray(todos, activeIndex, overIndex);
        const changeTo = findContainer(over?.id as string) as string;

        changeStatus(newTodos, active.id as string, changeTo);
      }
      setActiveTodo(null);
    }
  };

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data?.current?.todo) {
      setActiveTodo(e.active.data.current.todo as Todo);
    }
  };
  const moveArray = (arr: Todo[], from: number, to: number) => {
    const clone = [...arr];
    const [removed] = clone.splice(from, 1);
    clone.splice(to, -1, removed);
    return clone;
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (containers.includes(over?.id as string)) {
      active.id && changeStatus(todos, active.id as string, over?.id as string);
    } else {
      if (active.id !== over?.id) {
        const activeIndex = todos.findIndex((todo) => todo.id === active.id);
        const overIndex = todos.findIndex((todo) => todo.id === over?.id);
        const newTodos = moveArray(todos, activeIndex, overIndex);
        const changeTo = findContainer(over?.id as string) as string;

        changeStatus(newTodos, active.id as string, changeTo);
      }
    }
  };

  return {
    handleDragEnd,
    findContainer,
    handleDragStart,
    activeTodo,
    todos,
    onDragOver,
    removeTodo,
    containers,
    getStatus,
    updateStatus,
  };
};
