"use client";

import { AppSettings } from "@/lib/settings";
import NumberStepper from "../ui/NumberStepper";

interface GlobalLayoutControlsProps {
    settings: AppSettings;
    updateSettings: (updates: Partial<AppSettings>) => void;
}

export default function GlobalLayoutControls({ settings, updateSettings }: GlobalLayoutControlsProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted uppercase tracking-wider">Header Size</span>
                <NumberStepper
                    min={50}
                    max={150}
                    step={5}
                    value={settings.header_font_scale || 100}
                    onChange={(val) => updateSettings({ header_font_scale: val })}
                />
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted uppercase tracking-wider">Page Width</span>
                <NumberStepper
                    min={400}
                    max={2500}
                    step={50}
                    value={settings.layout_max_width || 1280}
                    onChange={(val) => updateSettings({ layout_max_width: val })}
                />
            </div>
        </div>
    );
}
