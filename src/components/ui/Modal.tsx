import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { cn } from "../../lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) setVisible(true);
        else setTimeout(() => setVisible(false), 200); // Wait for animation
    }, [isOpen]);

    if (!visible && !isOpen) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
            <div className={cn(
                "bg-card text-card-foreground w-full max-w-md rounded-2xl shadow-xl border border-border overflow-hidden transform transition-all duration-200",
                isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            )}>
                <div className="flex justify-between items-center p-4 border-b border-border bg-muted/5">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
