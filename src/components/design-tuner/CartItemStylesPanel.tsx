import { SidebarSlider } from "./SidebarSlider";
import { AppSettings } from "@/lib/settings";

interface CartItemStylesPanelProps {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

export function CartItemStylesPanel({
  settings,
  updateSettings,
}: CartItemStylesPanelProps) {
  return (
    <div className="border-border mt-6 border-t px-2 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <h2 className="text-foreground/80 mb-4 text-sm font-semibold">
        Cart Item Styles
      </h2>
      <div className="space-y-3">
        <SidebarSlider
          label="Font Size"
          value={settings.cart_item_font_size ?? 100}
          onChange={(v) => updateSettings({ cart_item_font_size: v })}
          min={50} max={200} unit="%"
        />
        <SidebarSlider
          label="Header Font"
          value={settings.cart_item_header_font_size ?? 100}
          onChange={(v) => updateSettings({ cart_item_header_font_size: v })}
          min={50} max={200} unit="%"
        />
        <SidebarSlider
          label="Price Font"
          value={settings.cart_item_price_font_size ?? 100}
          onChange={(v) => updateSettings({ cart_item_price_font_size: v })}
          min={50} max={200} unit="%"
        />
        <SidebarSlider
          label="Padding"
          value={settings.cart_item_padding ?? 10}
          onChange={(v) => updateSettings({ cart_item_padding: v })}
          min={0} max={32} unit="px"
        />
        <SidebarSlider
          label="Margin"
          value={settings.cart_item_margin ?? 8}
          onChange={(v) => updateSettings({ cart_item_margin: v })}
          min={0} max={24} unit="px"
        />
      </div>
    </div>
  );
}
