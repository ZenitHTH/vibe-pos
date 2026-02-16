import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps {
    label?: string;
    value?: string | number;
    onChange: (value: string | number) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
}

export function Select({
    label,
    value,
    onChange,
    options,
    placeholder = "Select...",
    className = "",
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue: string | number) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`w-full ${className}`} ref={containerRef}>
            {label && (
                <label className="block text-sm font-medium mb-1 text-foreground">
                    {label}
                </label>
            )}
            <div className="relative">
                <div
                    className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground cursor-pointer flex justify-between items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={!selectedOption ? "text-muted-foreground" : ""}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <FaChevronDown
                        size={14}
                        className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                className={`px-3 py-2 cursor-pointer hover:bg-muted/10 transition-colors ${value === opt.value ? "bg-primary/10 text-primary" : ""
                                    }`}
                                onClick={() => handleSelect(opt.value)}
                            >
                                {opt.label}
                            </div>
                        ))}
                        {options.length === 0 && (
                            <div className="px-3 py-2 text-muted-foreground text-sm">
                                No options
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Export Option for compatibility if needed, though we moved to props
export function Option({ children }: { children: React.ReactNode }) {
    return <option>{children}</option>;
}
