"use client";

import { useSettings } from "@/context/SettingsContext";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";
import ThemeSettings from "@/components/settings/ThemeSettings";
import SaveSettingsButton from "@/components/settings/SaveSettingsButton";
import ResetSettingsButton from "@/components/settings/ResetSettingsButton";

export default function ThemeSettingPage() {
  const { settings } = useSettings();

  return (
    <ManagementPageLayout
      title="Appearance"
      subtitle="Customize the look and feel of the application."
      headerActions={<ResetSettingsButton />}
      scaleKey="setting_page_scale"
      scrollable={true}
      layoutMaxWidth={settings.layout_max_width}
      floatingActions={<SaveSettingsButton />}
    >
      <ThemeSettings />
    </ManagementPageLayout>
  );
}
