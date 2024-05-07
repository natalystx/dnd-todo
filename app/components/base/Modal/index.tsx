"use client";

import { cn } from "@/utils/cn";
import * as Dialog from "@radix-ui/react-dialog";
import React, { Fragment, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  className,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) onClose && onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen} modal>
      <Dialog.Trigger asChild />

      <Dialog.Portal>
        <Dialog.Content className="fixed left-0 top-0 z-[20] m-0 flex h-screen w-screen items-center justify-between">
          <Dialog.Close>
            <Dialog.Overlay
              className="z-1 fixed inset-0 left-0 top-0 bg-black/60"
              onClick={() => setIsOpen(false)}
            />
          </Dialog.Close>
          <div
            className={cn(
              "z-[2] my-8 w-full transform overflow-hidden rounded-lg bg-white p-6 align-middle shadow-xl transition-all m-auto overflow-y-auto",
              className
            )}
          >
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
