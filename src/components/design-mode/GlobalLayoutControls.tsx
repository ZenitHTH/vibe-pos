"use client";

import { useRouter } from "next/navigation";
import { useMockup } from "@/context/MockupContext";
import { FaHistory, FaCompass } from "react-icons/fa";
import { AppSettings } from "@/lib/settings";
import NumberStepper from "../ui/NumberStepper";
import NumberSlider from "../ui/NumberSlider";

interface GlobalLayoutControlsProps {
    settings: AppSettings;
    updateSettings: (updates: Partial<AppSettings>) => void;
    currentView?: string;
    pathname: string;
}

export default function GlobalLayoutControls({ settings, updateSettings, currentView, pathname }: GlobalLayoutControlsProps) {
    const router = useRouter();
    const { setMockupView, mockupView } = useMockup();

    if (currentView === 'payment') {
        return (
            <div className="flex items-center gap-2">
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

    const isMainPage = pathname === '/';
    // const isSettingsOrManage = ['/setting', '/manage'].some(p => pathname.startsWith(p));
    // const isHistoryPage = pathname === '/history';

    if (isMainPage) {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setMockupView(mockupView === 'payment' ? 'default' : 'payment')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        mockupView === 'payment'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                >
                    <FaCompass /> Payment Modal
                </button>
                <button
                    onClick={() => router.push('/history')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                    <FaHistory /> History Page
                </button>
            </div>
        );
    }

    // Default for Settings, Manage, History (showing Header Size / Page Width)
    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Header Size</span>
                <NumberStepper
                    min={50}
                    max={150}
                    step={5}
                    value={settings.header_font_scale || 100}
                    onChange={(val) => updateSettings({ header_font_scale: val })}
                    formatValue={(v) => `${v}%`}
                />
            </div>
            {pathname === '/history' && (
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Content Size</span>
                    <NumberStepper
                        min={50}
                        max={150}
                        step={5}
                        value={settings.history_font_scale || 100}
                        onChange={(val) => updateSettings({ history_font_scale: val })}
                        formatValue={(v) => `${v}%`}
                    />
                </div>
            )}
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Page Width</span>
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
