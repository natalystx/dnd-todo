import { useMemo } from "react";
import { persist, usePersistShard } from "shimmershards";

export enum Status {
  NEW = "NEW",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED",
}

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  tags?: string[];
};

const todosShard = persist<Todo[]>({
  key: "todos",
  initialValue: [],
  fallback: [],
});

export const useTodos = () => {
  const [todos, setTodos] = usePersistShard(todosShard);

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };

  return { todos, addTodo, removeTodo, updateTodo, setTodos };
};
