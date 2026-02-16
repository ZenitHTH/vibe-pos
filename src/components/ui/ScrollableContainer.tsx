"use client";

import { ReactNode } from "react";

interface ScrollableContainerProps {
    children: ReactNode;
    className?: string;
}

export default function ScrollableContainer({ children, className = "" }: ScrollableContainerProps) {
    return (
        <div className={`h-full w-full custom-scrollbar ${className}`}>
            {children}
        </div>
    );
}
