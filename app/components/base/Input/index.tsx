"use client";

import { cn } from "@/utils/cn";
import React, { useId } from "react";

type InputProps = {
  label: string;
  wrapperClassName?: string;
  hint?: string;
  showHint?: boolean;
  hintClassName?: string;
  defaultValue?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  label,
  wrapperClassName,
  className,
  hint,
  showHint,
  hintClassName,
  defaultValue,
  ...rest
}: InputProps) => {
  const id = useId();
  return (
    <div className={cn("flex flex-col", wrapperClassName)}>
      <label className="mb-1 text-base font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        {...rest}
        className={cn("input-bordered input", className)}
        defaultValue={defaultValue}
      />
      {showHint && <p className={cn("text-xs mt-1", hintClassName)}>{hint}</p>}
    </div>
  );
};

export default Input;
