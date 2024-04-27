"use client";

import { cn } from "@/utils/cn";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn("btn btn-outline btn-md lg:btn-lg", className)}
    >
      {children}
    </button>
  );
};

export default Button;
