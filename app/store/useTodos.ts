import { Subject } from "rxjs";
import { effect, memo, persist, usePersistShard } from "shimmershards";

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
  dueDate?: string;
};

const todosShard = persist<Todo[]>({
  key: "todos",
  initialValue: [],
  fallback: [],
});

let lastTodo: Todo | null = null;
const deleteSubject = new Subject<string>();
export const useTodos = memo(() => {
  const [todos, setTodos] = usePersistShard(todosShard);

  effect(() => {
    console.log("sadasd");
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const removeTodo = (id: string) => {
    deleteSubject.next(id);
    const todo = todos.find((todo) => todo.id === id);
    lastTodo = todo || null;
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const undoRemoveTodo = () => {
    if (lastTodo !== null) {
      setTodos((prev) => [...prev, lastTodo as Todo]);
    }
  };

  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };

  return {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
    setTodos,
    undoRemoveTodo,
    deleteSubject,
  };
});
