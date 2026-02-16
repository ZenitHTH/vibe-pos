"use client";

import { ReactNode } from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  icon?: IconType;
  children: ReactNode;
  className?: string;
}

export default function SettingsSection({
  title,
  icon: Icon,
  children,
  className = "",
}: SettingsSectionProps) {
  return (
    <section
      className={cn(
        "bg-card text-card-foreground border-border mb-8 rounded-xl border p-6 shadow-sm",
        className,
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-foreground flex items-center gap-2 text-xl font-bold">
          {Icon && <Icon className="text-primary" />}
          {title}
        </h2>
      </div>
      <div className="text-card-foreground">{children}</div>
    </section>
  );
}
