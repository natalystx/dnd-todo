import { Status, Todo } from "@/app/store/useTodos";

export const getOverEvent = (id: string, todo: Todo) => {
  return {
    over: {
      disabled: false,
      id: id,
      data: {
        current: {
          type: "sort",
          todo,
        },
      },
      rect: {
        current: {
          initial: {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
          },
          translated: {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
          },
        },
      },
    },
  };
};
