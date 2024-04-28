"use client";
import React, { use } from "react";
import { useSearch } from "./useSearch";

import TodoCard from "../TodoCard";

import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "../../base/Column";
import { cn } from "@/utils/cn";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useViewModel } from "./viewmodel";
import { useTodoModal } from "@/hooks/useTodoModal";
import SearchSection from "../SearchSection";

const TodoSection = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  const {
    handleDragEnd,
    activeTodo,
    handleDragStart,
    todos,
    onDragOver,
    containers,
    getStatus,
    removeTodo,
    updateStatus,
  } = useViewModel();

  const { tags, updateTag, selectedTag, formattedFilter, onSearch } =
    useSearch(todos);

  const { setOpenTodoModal, setSelectedTodo } = useTodoModal();

  return (
    <div className="w-full space-y-6 lg:space-y-10">
      <SearchSection
        tagList={tags}
        activeTag={selectedTag}
        onSelectTag={updateTag}
        onSearch={onSearch}
      />

      <DndContext
        collisionDetection={closestCorners}
        modifiers={[snapCenterToCursor]}
        sensors={sensors}
        onDragOver={onDragOver}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <div className="overflow-x-auto w-full flex gap-x-4 lg:gap-x-8 flex-1">
          {containers.map((name) => (
            <Column
              key={name}
              items={todos}
              className="w-full grow h-[calc(100vh-180px)] basis-[calc(33%-24px)] min-w-[300px]"
              title={name}
            >
              {todos
                .filter((item) => item.status === getStatus(name))
                .map((todo) =>
                  formattedFilter.includes(todo?.id) ? (
                    <TodoCard
                      todo={todo}
                      key={todo.id}
                      className={cn(activeTodo?.id === todo.id && "opacity-20")}
                      onChangeStatus={updateStatus}
                      onEdit={() => {
                        setOpenTodoModal(true);
                        setSelectedTodo(todo);
                      }}
                      onRemove={removeTodo}
                    />
                  ) : null
                )}
            </Column>
          ))}
        </div>

        <DragOverlay>
          {activeTodo?.id ? <TodoCard todo={activeTodo} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TodoSection;
