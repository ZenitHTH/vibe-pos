"use client";

import { useState, useEffect } from "react";
import { FaPalette, FaFont, FaMousePointer } from "react-icons/fa";
import { SelectorTuner } from "@/components/design-tuner/SelectorTuner";
import { ButtonTuner } from "@/components/design-tuner/ButtonTuner";
import { TypographyTuner } from "@/components/design-tuner/TypographyTuner";
import { NavButton } from "@/components/design-tuner/NavButton";

export default function DesignTunerPage() {
    const [activeTab, setActiveTab] = useState<"selector" | "button" | "typography">("selector");

    // State for tuning variables
    const [radius, setRadius] = useState(0.5);
    // Initial primary color default blue-500 #3b82f6
    const [primaryColor, setPrimaryColor] = useState("#3b82f6");
    const [baseFontSize, setBaseFontSize] = useState(16);

    useEffect(() => {
        document.documentElement.style.setProperty("--radius", `${radius}rem`);
    }, [radius]);

    useEffect(() => {
        // We might need to handle HSL if the theme uses it, but looking at globals.css it uses hex for --primary in :root
        // but the tailwind config might be using HSL.
        // Let's check globals.css again. It defines --primary: #3b82f6; 
        // So setting it directly should work for the CSS variable.
        document.documentElement.style.setProperty("--primary", primaryColor);
    }, [primaryColor]);

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-border p-4 space-y-2 flex-shrink-0 bg-card">
                <h1 className="text-xl font-bold mb-6 flex items-center gap-2 px-2">
                    <FaPalette /> Design Tuner
                </h1>
                <div className="space-y-1">
                    <NavButton
                        active={activeTab === "selector"}
                        onClick={() => setActiveTab("selector")}
                        icon={<FaMousePointer />}
                        label="Selector"
                    />
                    <NavButton
                        active={activeTab === "button"}
                        onClick={() => setActiveTab("button")}
                        icon={<FaMousePointer />}
                        label="Buttons"
                    />
                    <NavButton
                        active={activeTab === "typography"}
                        onClick={() => setActiveTab("typography")}
                        icon={<FaFont />}
                        label="Typography"
                    />
                </div>

                <div className="mt-8 border-t border-border pt-4 px-2">
                    <h2 className="text-sm font-semibold mb-4 text-foreground/80">Global Styles</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs text-muted-foreground">Radius</label>
                                <span className="text-xs text-muted-foreground">{radius}rem</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={radius}
                                onChange={(e) => setRadius(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs text-muted-foreground">Base Scale (Px)</label>
                                <span className="text-xs text-muted-foreground">{baseFontSize}px</span>
                            </div>
                            <input
                                type="range"
                                min="12"
                                max="32"
                                step="1"
                                value={baseFontSize}
                                onChange={(e) => setBaseFontSize(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground block mb-1">Primary Color</label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                />
                                <input
                                    type="text"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="flex-1 text-xs border border-input rounded px-2 bg-background"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div
                className="flex-1 p-8 overflow-y-auto bg-background/50"
                style={{
                    // Use zoom to simulate base font size change for the preview area
                    // @ts-ignore
                    zoom: baseFontSize / 16
                }}
            >
                <div className="max-w-4xl mx-auto">
                    {activeTab === "selector" && <SelectorTuner />}
                    {activeTab === "button" && <ButtonTuner />}
                    {activeTab === "typography" && <TypographyTuner />}
                </div>
            </div>
        </div>
    );
}
