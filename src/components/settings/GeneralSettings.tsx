"use client";

import { useSettings } from "@/context/SettingsContext";
import { open } from "@tauri-apps/plugin-dialog";
import { FaFolderOpen, FaCog } from "react-icons/fa";
import SettingsSection from "@/components/ui/SettingsSection";
import { Button } from "@/components/ui/Button";

export default function GeneralSettings() {
  const { settings, updateSettings } = useSettings();

  const handleSelectImageStorage = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: "Select Image Storage Directory",
      });

      if (selected && typeof selected === "string") {
        updateSettings({ image_storage_path: selected });
      }
    } catch (error) {
      console.error("Failed to specific directory:", error);
    }
  };

  const handleResetStorage = () => {
    updateSettings({ image_storage_path: undefined });
  };

  return (
    <SettingsSection title="General Settings" icon={FaCog}>
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Image Storage</h3>
          <div className="flex flex-col gap-2">
            <label className="text-muted-foreground text-sm">
              Product images will be saved to this directory. If not set, the
              default application data directory is used.
            </label>
            <div className="flex items-center gap-3">
              <div className="bg-muted/30 border-border flex-1 truncate rounded-lg border p-3 font-mono text-sm">
                {settings.image_storage_path || (
                  <span className="text-muted-foreground italic">
                    Default (App Data)
                  </span>
                )}
              </div>
              <Button onClick={handleSelectImageStorage} className="gap-2">
                <FaFolderOpen />
                Browse
              </Button>
              {settings.image_storage_path && (
                <Button variant="secondary" onClick={handleResetStorage}>
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="border-border space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold">Database Storage</h3>
          <div className="flex flex-col gap-2">
            <label className="text-muted-foreground text-sm">
              The application database (database.db) will be stored in this
              directory.
            </label>
            <div className="rounded-lg border border-warning/20 bg-warning/10 p-3 text-sm text-warning">
              <strong>Note:</strong> Changing this setting requires an
              application restart. You must manually move your existing
              &apos;database.db&apos; to the new location, or a new empty
              database will be created.
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-muted/30 border-border flex-1 truncate rounded-lg border p-3 font-mono text-sm">
                {settings.db_storage_path || (
                  <span className="text-muted-foreground italic">
                    Default (App Data)
                  </span>
                )}
              </div>
              <Button
                onClick={async () => {
                  try {
                    const selected = await open({
                      directory: true,
                      multiple: false,
                      title: "Select Database Storage Directory",
                    });

                    if (selected && typeof selected === "string") {
                      updateSettings({ db_storage_path: selected });
                    }
                  } catch (error) {
                    console.error("Failed to select directory:", error);
                  }
                }}
                className="gap-2"
              >
                <FaFolderOpen />
                Browse
              </Button>
              {settings.db_storage_path && (
                <Button
                  variant="secondary"
                  onClick={() => updateSettings({ db_storage_path: undefined })}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
