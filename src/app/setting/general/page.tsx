"use client";

import { useSettings } from "@/context/SettingsContext";
import { useCallback } from "react";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";
import GeneralSettings from "@/components/settings/GeneralSettings";
import SaveSettingsButton from "@/components/settings/SaveSettingsButton";
import ResetSettingsButton from "@/components/settings/ResetSettingsButton";

export default function GeneralSettingPage() {
  const { settings, updateSettings } = useSettings();

  const handleUpdateSettings = useCallback(
    (updates: Partial<typeof settings>) => {
      updateSettings(updates);
    },
    [updateSettings],
  );

  return (
    <ManagementPageLayout
      title="General Settings"
      subtitle="Configure basic application settings."
      headerActions={<ResetSettingsButton />}
      scaleKey="setting_page_scale"
      scrollable={true}
      layoutMaxWidth={settings.layout_max_width}
      floatingActions={<SaveSettingsButton />}
    >
      <GeneralSettings
        imageStoragePath={settings.image_storage_path}
        dbStoragePath={settings.db_storage_path}
        onUpdateSettings={handleUpdateSettings}
      />
    </ManagementPageLayout>
  );
}
