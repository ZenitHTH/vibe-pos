"use client";

import { ReactNode } from "react";

interface ScrollableContainerProps {
    children: ReactNode;
    className?: string;
}

export default function ScrollableContainer({ children, className = "" }: ScrollableContainerProps) {
    return (
        <div className={`h-full overflow-y-auto w-full custom-scrollbar ${className}`}>
            {children}
        </div>
    );
}
