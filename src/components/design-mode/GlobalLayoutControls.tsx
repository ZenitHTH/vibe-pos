"use client";

import { AppSettings } from "@/lib/settings";
import NumberStepper from "../ui/NumberStepper";
import NumberSlider from "../ui/NumberSlider";

interface GlobalLayoutControlsProps {
    settings: AppSettings;
    updateSettings: (updates: Partial<AppSettings>) => void;
    currentView?: string;
}

export default function GlobalLayoutControls({ settings, updateSettings, currentView }: GlobalLayoutControlsProps) {

    if (currentView === 'payment') {
        return (
            <div className="flex items-center gap-4 w-64">
                <div className="flex-1">
                    <NumberSlider
                        label="Numpad Height"
                        min={200}
                        max={600}
                        step={10}
                        value={settings.payment_numpad_height || 320}
                        onChange={(val) => updateSettings({ payment_numpad_height: val })}
                        unit="px"
                    />
                </div>
            </div>
        );
    }

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
                    formatValue={(v) => `${v}%`}
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
                    formatValue={(v) => `${v}px`}
                />
            </div>
        </div>
    );
}
