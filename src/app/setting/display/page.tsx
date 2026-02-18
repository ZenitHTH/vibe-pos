"use client";

import { useSettings } from "@/context/SettingsContext";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";
import DisplaySettings from "@/components/settings/DisplaySettings";
import SaveSettingsButton from "@/components/settings/SaveSettingsButton";
import ResetSettingsButton from "@/components/settings/ResetSettingsButton";

export default function DisplaySettingPage() {
  const { settings } = useSettings();

  return (
    <ManagementPageLayout
      title="Display Settings"
      subtitle="Adjust display scaling and layout options."
      headerActions={<ResetSettingsButton />}
      scaleKey="setting_page_scale"
      scrollable={true}
      layoutMaxWidth={settings.layout_max_width}
      floatingActions={<SaveSettingsButton />}
    >
      <DisplaySettings />
    </ManagementPageLayout>
  );
}
