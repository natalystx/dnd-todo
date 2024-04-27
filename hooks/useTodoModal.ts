import { Todo } from "@/app/store/useTodos";
import { shard, useShard } from "shimmershards";

const openModalShard = shard(false);
const selectedTodoShard = shard<Todo | null>(null);

export const useTodoModal = () => {
  const [openTodoModal, setOpenTodoModal] = useShard(openModalShard);
  const [selectedTodo, setSelectedTodo] = useShard(selectedTodoShard);

  return {
    openTodoModal,
    setOpenTodoModal,
    selectedTodo,
    setSelectedTodo,
  };
};
