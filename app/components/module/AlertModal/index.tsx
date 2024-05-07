import React from "react";
import Modal from "../../base/Modal";
import Button from "../../base/Button";
import { IconX } from "@tabler/icons-react";

type AlertModalProps = {
  open: boolean;
  setIsOpen: (open: boolean) => void;

  onCancel: () => void;
  onConfirm: () => void;
};

const AlertModal = ({
  open,
  setIsOpen,
  onCancel,
  onConfirm,
}: AlertModalProps) => {
  return (
    <Modal
      isOpen={open}
      setIsOpen={setIsOpen}
      onClose={onCancel}
      className="border border-error border-r-8 border-b-8 md:w-[640px] md:h-fit w-screen h-screen flex flex-col gap-y-6"
    >
      <div className="w-full px-4 py-6 flex justify-between items-center">
        <h3 className="text-2xl font-medium">Delete todo</h3>
        <Button
          className="!btn-md !btn-square"
          onClick={() => {
            onCancel();
          }}
        >
          <IconX />
        </Button>
      </div>
      <div className="flex flex-col justify-between h-full gap-y-6">
        <div />
        <p className="text-center text-2xl font-medium text-red-500">
          Are you sure to delete?
        </p>
        <div className="flex justify-center gap-x-2">
          <Button onClick={onCancel} className="flex-1">
            No
          </Button>
          <Button onClick={onConfirm} className="flex-1 btn-error">
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
