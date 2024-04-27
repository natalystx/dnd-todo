import { cn } from "@/utils/cn";
import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

const Badge = ({ children, className, onClick, ...rest }: BadgeProps) => {
  return (
    <span
      {...rest}
      className={cn("badge badge-outline", className)}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Badge;
