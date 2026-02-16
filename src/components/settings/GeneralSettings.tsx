"use client";

import { useSettings } from '@/context/SettingsContext';
import { open } from '@tauri-apps/plugin-dialog';
import { FaFolderOpen } from 'react-icons/fa';

export default function GeneralSettings() {
    const { settings, updateSettings } = useSettings();

    const handleSelectImageStorage = async () => {
        try {
            const selected = await open({
                directory: true,
                multiple: false,
                title: "Select Image Storage Directory"
            });

            if (selected && typeof selected === 'string') {
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
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">General Settings</h2>
                    <p className="text-muted-foreground">Manage general application configurations</p>
                </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Image Storage</h3>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted-foreground">
                            Product images will be saved to this directory. If not set, the default application data directory is used.
                        </label>
                        <div className="flex gap-3 items-center">
                            <div className="flex-1 p-3 bg-muted/30 rounded-lg border border-border font-mono text-sm truncate">
                                {settings.image_storage_path || <span className="text-muted-foreground italic">Default (App Data)</span>}
                            </div>
                            <button
                                onClick={handleSelectImageStorage}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors"
                            >
                                <FaFolderOpen />
                                Browse
                            </button>
                            {settings.image_storage_path && (
                                <button
                                    onClick={handleResetStorage}
                                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-border space-y-4">
                    <h3 className="text-lg font-semibold">Database Storage</h3>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted-foreground">
                            The application database (database.db) will be stored in this directory.
                        </label>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-600 text-sm">
                            <strong>Note:</strong> Changing this setting requires an application restart. You must manually move your existing 'database.db' to the new location, or a new empty database will be created.
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="flex-1 p-3 bg-muted/30 rounded-lg border border-border font-mono text-sm truncate">
                                {settings.db_storage_path || <span className="text-muted-foreground italic">Default (App Data)</span>}
                            </div>
                            <button
                                onClick={async () => {
                                    try {
                                        const selected = await open({
                                            directory: true,
                                            multiple: false,
                                            title: "Select Database Storage Directory"
                                        });

                                        if (selected && typeof selected === 'string') {
                                            updateSettings({ db_storage_path: selected });
                                        }
                                    } catch (error) {
                                        console.error("Failed to select directory:", error);
                                    }
                                }}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors"
                            >
                                <FaFolderOpen />
                                Browse
                            </button>
                            {settings.db_storage_path && (
                                <button
                                    onClick={() => updateSettings({ db_storage_path: undefined })}
                                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
