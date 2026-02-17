"use client";

import { useTax } from "@/hooks/useTax";
import SettingsSection from "@/components/ui/SettingsSection";
import { Switch } from "@/components/ui/Switch";
import { Input } from "@/components/ui/Input";
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
              <Input
                type="number"
                min={0}
                max={100}
                value={taxPercentage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTaxPercentage(Number(e.target.value))
                }
                className="w-20 text-right"
              />
              <span className="text-muted-foreground font-medium">%</span>
            </div>
          )}
          <Switch
            checked={isTaxEnabled}
            onClick={toggleTax}
          />
        </div>
      </div>
    </SettingsSection>
  );
}
