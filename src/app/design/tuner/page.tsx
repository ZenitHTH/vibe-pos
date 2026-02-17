"use client";

import { useState, useEffect } from "react";
import { FaPalette, FaFont, FaMousePointer } from "react-icons/fa";
import { SelectorTuner } from "@/components/design-tuner/SelectorTuner";
import { ButtonTuner } from "@/components/design-tuner/ButtonTuner";
import { TypographyTuner } from "@/components/design-tuner/TypographyTuner";
import { NavButton } from "@/components/design-tuner/NavButton";

import GlobalHeader from "@/components/ui/GlobalHeader";

export default function DesignTunerPage() {
  const [activeTab, setActiveTab] = useState<
    "selector" | "button" | "typography"
  >("selector");

  // State for tuning variables
  const [radius, setRadius] = useState(0.5);
  // Initial primary color default blue-500 #3b82f6
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [baseFontSize, setBaseFontSize] = useState(16);

  useEffect(() => {
    document.documentElement.style.setProperty("--radius", `${radius}rem`);
  }, [radius]);

  useEffect(() => {
    // Set primary color CSS variable securely
    document.documentElement.style.setProperty("--primary", primaryColor);
  }, [primaryColor]);

  return (
    <div className="bg-background text-foreground flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="border-border bg-card w-64 shrink-0 space-y-2 border-r p-4">
        <GlobalHeader
          title="Design Tuner"
          icon={FaPalette}
          className="mb-6 px-2"
        />
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

        <div className="border-border mt-8 border-t px-2 pt-4">
          <h2 className="text-foreground/80 mb-4 text-sm font-semibold">
            Global Styles
          </h2>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-muted-foreground text-xs">Radius</label>
                <span className="text-muted-foreground text-xs">
                  {radius}rem
                </span>
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
              <div className="mb-1 flex items-center justify-between">
                <label className="text-muted-foreground text-xs">
                  Base Scale (Px)
                </label>
                <span className="text-muted-foreground text-xs">
                  {baseFontSize}px
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setBaseFontSize(Math.max(12, baseFontSize - 1))
                  }
                  className="bg-secondary hover:bg-secondary/80 text-foreground flex h-6 w-6 items-center justify-center rounded text-xs"
                >
                  -
                </button>
                <input
                  type="range"
                  min="12"
                  max="32"
                  step="1"
                  value={baseFontSize}
                  onChange={(e) => setBaseFontSize(parseInt(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={() =>
                    setBaseFontSize(Math.min(32, baseFontSize + 1))
                  }
                  className="bg-secondary hover:bg-secondary/80 text-foreground flex h-6 w-6 items-center justify-center rounded text-xs"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="text-muted-foreground mb-1 block text-xs">
                Primary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded border-0 p-0"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="border-input bg-background flex-1 rounded border px-2 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="bg-background/50 flex-1 overflow-y-auto p-8"
        style={{
          // Use zoom to simulate base font size change for the preview area
          zoom: baseFontSize / 16,
        }}
      >
        <div className="mx-auto max-w-4xl">
          {activeTab === "selector" && <SelectorTuner />}
          {activeTab === "button" && <ButtonTuner />}
          {activeTab === "typography" && <TypographyTuner />}
        </div>
      </div>
    </div>
  );
}
