import { Todo } from "@/app/store/useTodos";
import React from "react";
import Modal from "../../base/Modal";
import Button from "../../base/Button";
import { IconX } from "@tabler/icons-react";
import { Field, Form } from "react-final-form";
import { useViewModel } from "./viewmodel";
import Input from "../../base/Input";
import { cn } from "@/utils/cn";

type TodoModalProps = {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  todo?: Todo;
  onClose: () => void;
};

const TodoModal = ({ open, setIsOpen, todo, onClose }: TodoModalProps) => {
  const onCloseModal = () => {
    setIsOpen(false);
  };

  const { initialValues, validate, onSubmit } = useViewModel(
    onCloseModal,
    todo
  );
  return (
    <Modal
      isOpen={open}
      setIsOpen={setIsOpen}
      onClose={onClose}
      className="border border-base-content border-r-8 border-b-8 md:w-[640px] md:h-[640px] w-screen h-screen flex flex-col gap-y-6"
    >
      <div className="w-full px-4 py-6 flex justify-between items-center">
        <h3 className="text-2xl font-medium">Add todo</h3>
        <Button
          className="!btn-md !btn-square"
          onClick={() => setIsOpen(false)}
        >
          <IconX />
        </Button>
      </div>
      <Form
        validate={validate}
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, submitFailed }) => (
          <form
            className="flex flex-col gap-y-4 h-full"
            onSubmit={handleSubmit}
          >
            <Field
              name="title"
              render={({ input, meta }) => (
                <Input
                  {...input}
                  label="Title"
                  placeholder="Enter title"
                  className={cn(
                    "w-full",
                    submitFailed && meta.error && "input-error"
                  )}
                  showHint={submitFailed && meta.error}
                  hint={meta.error}
                  hintClassName="text-error"
                />
              )}
            />
            <Field
              name="description"
              render={({ input }) => (
                <Input
                  {...input}
                  placeholder="Enter description"
                  label="Description"
                  className={cn("w-full")}
                />
              )}
            />
            <Field
              name="tags"
              render={({ input }) => (
                <Input
                  {...input}
                  label="Tags"
                  placeholder="Enter tags"
                  className={cn("w-full")}
                  showHint
                  hint={"Separate tags with comma"}
                />
              )}
            />

            <Button type="submit" className="mt-10">
              {todo?.id ? "Save todo" : "Add todo"}
            </Button>
          </form>
        )}
      />
    </Modal>
  );
};

export default TodoModal;
