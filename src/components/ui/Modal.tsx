import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { cn } from "@/lib";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  style,
  contentClassName,
}: ModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else setTimeout(() => setVisible(false), 200); // Wait for animation
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        className={cn(
          "bg-card text-card-foreground border-border w-full max-w-md transform overflow-hidden rounded-2xl border shadow-xl transition-all duration-200",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className,
        )}
        style={style}
      >
        <div className="border-border bg-muted/5 flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-1 transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        <div className={cn("p-6", contentClassName)}>{children}</div>
      </div>
    </div>
  );
}
