import { cn } from "@/utils/cn";
import { useDroppable } from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";

type ColumnProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
  items: any[];
};

const Column = ({ children, title, className, items }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: title,
    data: {
      accepts: ["sort"],
    },
  });

  return (
    <div
      className={cn(
        "h-full space-y-4 rounded-xl border-4 border-base-content overflow-x-visible !overflow-y-auto",
        className
      )}
    >
      <p className="text-xl font-semibold top-0 sticky p-4 bg-white border-b z-10">
        {title}
      </p>
      <div
        className="overflow-x-visible flex flex-col gap-y-4 p-4 relative z-0"
        ref={setNodeRef}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
