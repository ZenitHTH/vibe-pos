import { invoke } from "@tauri-apps/api/core";
import { AppSettings, StorageInfo } from "../types";

export const settingsApi = {
  getSettings: async (): Promise<AppSettings> => {
    return await invoke("get_settings");
  },

  saveSettings: async (settings: AppSettings): Promise<void> => {
    await invoke("save_settings", { settings });
  },

  getStorageInfo: async (): Promise<StorageInfo> => {
    return await invoke("get_storage_info");
  },
};
