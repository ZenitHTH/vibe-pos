"use client";

import ExportSection from "@/components/settings/ExportSection";
import CurrencySettings from "@/components/settings/CurrencySettings";
import TaxSettings from "@/components/settings/TaxSettings";
import ThemeSettings from "@/components/settings/ThemeSettings";
import DisplaySettings from "@/components/settings/DisplaySettings";
import { useSettings } from "@/context/SettingsContext";
import { FaSave, FaCheck } from "react-icons/fa";
import { useState, useCallback } from "react";
import ResetSettingsButton from "@/components/settings/ResetSettingsButton";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";
import GeneralSettings from "@/components/settings/GeneralSettings";

export default function SettingPage() {
  const { settings, updateSettings, save } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await save();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handlers for specific settings to avoid passing the entire updateSettings object if possible
  // and to ensure referential stability for memoized children.
  const handleUpdateSettings = useCallback(
    (updates: Partial<typeof settings>) => {
      updateSettings(updates);
    },
    [updateSettings],
  );

  const handleUpdateCurrency = useCallback(
    (symbol: string) => {
      updateSettings({ currency_symbol: symbol });
    },
    [updateSettings],
  );

  const handleToggleTax = useCallback(() => {
    updateSettings({ tax_enabled: !settings.tax_enabled });
  }, [updateSettings, settings.tax_enabled]);

  const handleUpdateTaxRate = useCallback(
    (rate: number) => {
      updateSettings({ tax_rate: rate });
    },
    [updateSettings],
  );

  return (
    <ManagementPageLayout
      title="System Settings"
      subtitle="Configure your POS system settings here."
      headerActions={<ResetSettingsButton />}
      scaleKey="setting_page_scale"
      scrollable={true}
      layoutMaxWidth={settings.layout_max_width}
      floatingActions={
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg transition-all ${
            showSuccess
              ? "bg-success text-success-foreground shadow-success/20 hover:bg-success/90"
              : "bg-primary text-primary-foreground shadow-primary/20 hover:opacity-90"
          }`}
        >
          {showSuccess ? (
            <>
              <FaCheck />
              Saved Successfully
            </>
          ) : (
            <>
              <FaSave />
              {isSaving ? "Saving..." : "Save Changes"}
            </>
          )}
        </button>
      }
    >
      {/* General Settings */}
      <GeneralSettings
        imageStoragePath={settings.image_storage_path}
        dbStoragePath={settings.db_storage_path}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Theme Settings - Manages its own state via next-themes */}
      <ThemeSettings />

      {/* Display Settings - Manages its own state via MockupContext */}
      <DisplaySettings />

      {/* Currency Settings */}
      <CurrencySettings
        currency={settings.currency_symbol}
        onUpdateCurrency={handleUpdateCurrency}
      />

      {/* Tax Settings */}
      <TaxSettings
        isTaxEnabled={settings.tax_enabled}
        taxPercentage={settings.tax_rate}
        onToggleTax={handleToggleTax}
        onUpdateTaxRate={handleUpdateTaxRate}
      />

      {/* Export Section - Manages its own logic/state mainly */}
      <ExportSection />
    </ManagementPageLayout>
  );
}
