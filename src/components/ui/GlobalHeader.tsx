"use client";

import { useSettings } from "@/context/SettingsContext";

interface GlobalHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    className?: string;
}

export default function GlobalHeader({ title, subtitle, children, className = "" }: GlobalHeaderProps) {
    const { settings } = useSettings();

    return (
        <header
            className={`flex flex-wrap justify-between items-center gap-4 shrink-0 transition-all duration-300 ${className}`}
            style={{ fontSize: `${settings.header_font_scale || 100}%` }}
        >
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-1" style={{ fontSize: '1.5em' }}>{title}</h1>
                {subtitle && <p className="text-muted-foreground text-sm" style={{ fontSize: '0.875em' }}>{subtitle}</p>}
            </div>
            {children && (
                <div className="flex items-center gap-2">
                    {children}
                </div>
            )}
        </header>
    );
}
