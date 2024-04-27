"use client";

import React, { useRef } from "react";
import Button from "../Button";
import { useViewModel } from "./viewmodel";
import { createPortal } from "react-dom";

export type Menu = {
  label: string;
  onClick: () => void;
};

type DropdownProps = {
  buttonNode: React.ReactNode;
  menus: Menu[];
};

const Dropdown = ({ buttonNode, menus }: DropdownProps) => {
  const { setIsOpen, isOpen } = useViewModel();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="dropdown dropdown-end" ref={ref}>
      <Button
        className="!btn-sm btn-square disabled:bg-transparent"
        tabIndex={0}
        type="button"
        id="lang-dropdown"
        onClick={(e: any) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        {buttonNode}
      </Button>
      {isOpen &&
        createPortal(
          <ul
            tabIndex={0}
            className="menu dropdown-content fixed z-[20] mt-1 w-52 rounded-lg p-2 shadow bg-white space-y-2"
            style={{
              top: (ref.current?.getBoundingClientRect().bottom || 0) + 8,
              left: (ref.current?.getBoundingClientRect().left || 0) - 180,
            }}
          >
            {menus.map((menu) => (
              <Button
                key={menu.label}
                className={
                  "cursor-pointer justify-start text-left btn-ghost !btn-sm text-xs"
                }
                onClick={menu.onClick}
              >
                {menu.label}
              </Button>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
