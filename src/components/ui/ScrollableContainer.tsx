"use client";

import { ReactNode } from "react";

interface ScrollableContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollableContainer({
  children,
  className = "",
}: ScrollableContainerProps) {
  return (
    <div className={`custom-scrollbar h-full w-full ${className}`}>
      {children}
    </div>
  );
}
