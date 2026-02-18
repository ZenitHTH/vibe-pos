import { invoke } from "@tauri-apps/api/core";

export interface AppSettings {
  // ── General ──
  currency_symbol: string;
  tax_enabled: boolean;
  tax_rate: number;

  // ── Global Display ──
  display_scale: number;
  layout_max_width: number;

  // ── Component Scales ──
  sidebar_scale: number;
  cart_scale: number;
  grid_scale: number;
  manage_table_scale: number;
  category_table_scale: number;
  setting_page_scale: number;
  payment_modal_scale: number;

  // ── Font Scales ──
  header_font_scale: number;
  sidebar_font_scale: number;
  cart_font_scale: number;
  grid_font_scale: number;
  manage_table_font_scale: number;
  category_table_font_scale: number;
  setting_page_font_scale: number;
  payment_modal_font_scale: number;
  history_font_scale?: number;

  // ── Cart Item Styling ──
  cart_item_font_size?: number;
  cart_item_header_font_size?: number;
  cart_item_price_font_size?: number;
  cart_item_padding?: number;
  cart_item_margin?: number;

  // ── Payment ──
  payment_numpad_height?: number;

  // ── Storage Paths ──
  image_storage_path?: string;
  db_storage_path?: string;
}

export async function getSettings(): Promise<AppSettings> {
  return await invoke("get_settings");
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await invoke("save_settings", { settings });
}
