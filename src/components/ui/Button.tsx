import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "yellow" | "lime" | "pink" | "cyan" | "white" | "dark";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "yellow", children, ...props }, ref) => {
    const variants = {
      yellow: "bg-neoYellow text-black",
      lime: "bg-neoLime text-black",
      pink: "bg-neoPink text-black",
      cyan: "bg-neoCyan text-black",
      white: "bg-white text-black",
      dark: "bg-neoDark text-white",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 font-bold text-sm border-2 border-black rounded-neo shadow-neo transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";