"use client";

import React from "react";
import Button from "../../base/Button";
import { IconPin } from "@tabler/icons-react";
import TodoModal from "../TodoModal";
import { useTodoModal } from "@/hooks/useTodoModal";

const Navbar = () => {
  const { setOpenTodoModal, openTodoModal, selectedTodo, setSelectedTodo } =
    useTodoModal();
  return (
    <>
      <nav className="top-0 sticky left-0 w-full h-[90px] flex justify-between items-center border-b-4 border-base-content px-4 lg:px-16 bg-white z-10">
        <h4 className="text-2xl lg:text-3xl font-bold">Todos</h4>
        <Button onClick={() => setOpenTodoModal(true)}>
          <IconPin />
          Add todo
        </Button>
      </nav>
      <TodoModal
        onClose={() => setSelectedTodo(null)}
        open={openTodoModal}
        setIsOpen={setOpenTodoModal}
        todo={selectedTodo || undefined}
      />
    </>
  );
};

export default Navbar;
