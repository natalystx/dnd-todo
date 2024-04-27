"use client";

import { Status, Todo } from "@/app/store/useTodos";
import { cn } from "@/utils/cn";
import React from "react";
import { toCapitalize } from "@/utils/toCapitalize";
import Button from "../../base/Button";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import Badge from "../../base/Badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Dropdown, { Menu } from "../../base/Dropdown";

type TodoCardProps = {
  todo: Todo;
  className?: string;
  onEdit?: () => void;
  onRemove?: (id: string) => void;
  onChangeStatus?: (id: string, val: Status) => void;
};

const TodoCard = ({
  todo,
  className,
  onEdit,
  onRemove,
  onChangeStatus,
}: TodoCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
      data: {
        type: "sort",
        todo,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const menus: Menu[] = [
    {
      label: "Move to New",
      onClick: () => onChangeStatus?.(todo.id, Status.NEW),
    },
    {
      label: "Move to Inprogress",
      onClick: () => onChangeStatus?.(todo.id, Status.INPROGRESS),
    },
    {
      label: "Move to Completed",
      onClick: () => onChangeStatus?.(todo.id, Status.COMPLETED),
    },
  ];

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className={cn(
        "rounded-lg z-[1] border border-r-4 border-b-4 p-4 hover:border-r-2 hover:border-b-2 transition-[border] duration-100 flex flex-col gap-y-4 cursor-grab  active:cursor-grabbing bg-white touch-none select-none",
        todo.status === Status.NEW && "border-yellow-500",
        todo.status === Status.INPROGRESS && "border-green-900",
        todo.status === Status.COMPLETED && "border-primary",
        className
      )}
      style={style}
    >
      <div className="flex w-full justify-between">
        <Badge
          className={cn(
            "text-xs",
            todo.status === Status.NEW && "badge-accent",
            todo.status === Status.INPROGRESS && "badge-success",
            todo.status === Status.COMPLETED && "badge-primary"
          )}
        >
          {toCapitalize(todo.status)}
        </Badge>
        <div className="flex gap-x-2 items-center">
          <Button
            className="!btn-sm btn-square"
            onClick={() => onRemove?.(todo.id)}
          >
            <IconTrash size={16} />
          </Button>
          <Button
            className="!btn-sm btn-square disabled:bg-transparent"
            disabled={todo.status === Status.COMPLETED}
            onClick={() => onEdit?.()}
          >
            <IconPencil size={16} />
          </Button>

          <Dropdown
            buttonNode={<IconDotsVertical size={16} />}
            menus={menus.filter(
              (item) =>
                !item.label.toLowerCase().includes(todo.status.toLowerCase())
            )}
          />
        </div>
      </div>
      <div>
        <p className="prose text-xl font-medium">{todo.title}</p>
        <p className="prose text-sm">{todo.description}</p>
      </div>

      {todo.tags && (
        <div className="flex flex-wrap gap-1">
          {todo.tags.map((tag) => (
            <Badge key={`${todo.id}-${tag}`} className={cn("badge-sm text-xs")}>
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoCard;
