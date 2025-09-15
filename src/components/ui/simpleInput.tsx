import * as React from "react";
import { cn } from "@/lib/utils";

type SimpleInputProps = React.InputHTMLAttributes<HTMLInputElement>
export const SimpleInput = React.forwardRef<HTMLInputElement, SimpleInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "px-2 py-2 w-full rounded-md border placeholder-[#d0d0d0] focus:outline-none focus:ring-2 focus:ring-red-500",
                    className
                )}
                {...props}
            />
        );
    }
);
