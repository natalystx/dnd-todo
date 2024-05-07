import { Status, Todo, useTodos } from "@/app/store/useTodos";
import { useTodoModal } from "@/hooks/useTodoModal";
import { useFormValidation } from "@/utils/useFormValidation";
import { z } from "zod";

export const useViewModel = (close: () => void, todo?: Todo) => {
  const initialValues = {
    title: todo?.title || "",
    description: todo?.description || "",
    tags: todo?.tags?.join(",") || "",
    dueDate: todo?.dueDate || "",
  };

  const { addTodo, updateTodo } = useTodos();

  const schema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().optional(),
    tags: z.string().optional(),
    dueDate: z.string().nonempty("Due date is required"),
  });

  const { validate } = useFormValidation(schema);

  const onSubmit = (values: z.infer<typeof schema>) => {
    if (!global.window) return;
    const tags = values?.tags ? values?.tags?.split(",") : [];
    if (!todo?.id) {
      addTodo({
        id: window.crypto.randomUUID(),
        status: Status.NEW,
        title: values.title,
        description: values.description,
        tags: tags,
        dueDate: new Date().toISOString(),
      });
    } else {
      updateTodo({
        ...todo,
        title: values.title,
        description: values.description,
        tags: tags,
      });
    }

    close();
  };

  return {
    initialValues,
    validate,
    onSubmit,
  };
};
