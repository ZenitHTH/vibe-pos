"use client";

import {
  FaPalette,
  FaFont,
  FaMousePointer,
  FaShoppingCart,
} from "react-icons/fa";
import { NavButton } from "./NavButton";
import { GlobalStylesPanel } from "./GlobalStylesPanel";
import { CartItemStylesPanel } from "./CartItemStylesPanel";
import { AppSettings } from "@/lib";
import GlobalHeader from "@/components/ui/GlobalHeader";

export type TunerTab = "selector" | "button" | "typography" | "cart";

interface TunerSidebarProps {
  activeTab: TunerTab;
  setActiveTab: (tab: TunerTab) => void;
  radius: number;
  setRadius: (v: number) => void;
  baseFontSize: number;
  setBaseFontSize: (v: number) => void;
  primaryColor: string;
  setPrimaryColor: (v: string) => void;
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

export function TunerSidebar({
  activeTab,
  setActiveTab,
  radius,
  setRadius,
  baseFontSize,
  setBaseFontSize,
  primaryColor,
  setPrimaryColor,
  settings,
  updateSettings,
}: TunerSidebarProps) {
  return (
    <div className="border-border bg-card flex h-full w-64 shrink-0 flex-col border-r p-4">
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
        <NavButton
          active={activeTab === "cart"}
          onClick={() => setActiveTab("cart")}
          icon={<FaShoppingCart />}
          label="Cart Item"
        />
      </div>

      <div
        className="mt-2 min-h-0 flex-1 space-y-2 overflow-y-auto pb-30"
        data-lenis-prevent
      >
        <GlobalStylesPanel
          radius={radius}
          setRadius={setRadius}
          baseFontSize={baseFontSize}
          setBaseFontSize={setBaseFontSize}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
        />

        {activeTab === "cart" && (
          <CartItemStylesPanel
            settings={settings}
            updateSettings={updateSettings}
          />
        )}
      </div>
    </div>
  );
}
