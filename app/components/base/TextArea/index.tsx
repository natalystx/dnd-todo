"use client";

import { cn } from "@/utils/cn";
import React, { useId } from "react";

type InputProps = {
  label: string;
  wrapperClassName?: string;
  hint?: string;
  showHint?: boolean;
  hintClassName?: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

const Input = ({
  label,
  wrapperClassName,
  className,
  hint,
  showHint,
  hintClassName,
  ...rest
}: InputProps) => {
  const id = useId();
  return (
    <div className={cn("flex flex-col", wrapperClassName)}>
      <label className="mb-1 text-base font-semibold" htmlFor={id}>
        {label}
      </label>
      <textarea
        {...rest}
        className={cn("textarea-bordered textarea", className)}
      />
      {showHint && <p className={cn("text-xs mt-1", hintClassName)}>{hint}</p>}
    </div>
  );
};

export default Input;
