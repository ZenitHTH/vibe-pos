"use client";

import { useTax } from "@/hooks/useTax";
import SettingsSection from "@/components/ui/SettingsSection";
import { FaPercent } from "react-icons/fa";

export default function TaxSettings() {
  const { isTaxEnabled, toggleTax, taxPercentage, setTaxPercentage } = useTax();

  return (
    <SettingsSection title="Tax Settings" icon={FaPercent}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-foreground font-medium">Enable Tax</h3>
          <p className="text-muted-foreground text-sm">
            Apply tax to all orders automatically.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {isTaxEnabled && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(Number(e.target.value))}
                className="bg-background border-border focus:ring-primary/50 w-16 rounded-lg border px-2 py-1 text-right focus:ring-2 focus:outline-none"
              />
              <span className="text-muted-foreground font-medium">%</span>
            </div>
          )}
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={isTaxEnabled}
              onChange={toggleTax}
              className="peer sr-only"
            />
            <div className="peer peer-checked:bg-primary h-6 w-11 rounded-full bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          </label>
        </div>
      </div>
    </SettingsSection>
  );
}
