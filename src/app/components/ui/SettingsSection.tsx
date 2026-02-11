"use client";

import { ReactNode } from "react";
import { IconType } from "react-icons";

interface SettingsSectionProps {
    title: string;
    icon?: IconType;
    children: ReactNode;
    className?: string;
}

export default function SettingsSection({ title, icon: Icon, children, className = "" }: SettingsSectionProps) {
    return (
        <section className={`bg-card-bg border border-border rounded-xl p-6 mb-8 shadow-sm ${className}`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                    {Icon && <Icon className="text-primary" />}
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );
}
