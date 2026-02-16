import { memo } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useMockup } from "@/context/MockupContext";
import { FaDesktop } from "react-icons/fa";
import SettingsSection from "@/components/ui/SettingsSection";

const DisplaySettings = memo(() => {
  useSettings();
  const { isMockupMode, toggleMockupMode } = useMockup();

  return (
    <SettingsSection title="Display Size" icon={FaDesktop}>
      <div className="space-y-6">
        {/* Design Mode Toggle */}
        <div className="bg-muted/10 space-y-4 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-semibold">
                Design Mode (UI Adjustments)
              </p>
              <p className="text-muted-foreground text-sm">
                Enable visual resizing of UI components
              </p>
            </div>
            <button
              onClick={toggleMockupMode}
              className={`focus:ring-primary relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${isMockupMode ? "bg-primary" : "bg-secondary"}`}
            >
              <span
                className={`${
                  isMockupMode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>

          {/* Information / Help Text */}
          <div className="text-muted-foreground bg-background border-border rounded-lg border p-3 text-sm">
            <p>
              <span className="text-primary font-semibold">Tip:</span> Enable
              Design Mode to:
            </p>
            <ul className="mt-1 ml-1 list-inside list-disc space-y-1">
              <li>
                Resize the <strong>Sidebar</strong> and <strong>Cart</strong>{" "}
                width
              </li>
              <li>
                Adjust <strong>Product Grid</strong> columns and sizes
              </li>
              <li>
                Scale <strong>Management Tables</strong>
              </li>
              <li>
                Change <strong>Global Font Size</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
});

DisplaySettings.displayName = "DisplaySettings";

export default DisplaySettings;
