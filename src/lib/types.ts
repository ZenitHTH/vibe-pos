export interface BackendProduct {
  product_id: number;
  title: string;
  category_id: number;
  satang: number;
  image_path?: string;
}

export type NewProduct = Omit<BackendProduct, "product_id">;

export interface Category {
  id: number;
  name: string;
}

export type NewCategory = Omit<Category, "id">;

export interface ReceiptList {
  receipt_id: number;
  datetime_unix: number;
}

export interface Receipt {
  id: number;
  receipt_id: number;
  product_id: number;
  quantity: number;
  satang_at_sale: number;
}

export interface NewReceipt {
  receipt_id: number;
  product_id: number;
  quantity: number;
  satang_at_sale: number;
}

export interface Image {
  id: number;
  file_name: string;
  file_hash: string;
  file_path: string;
  created_at: string; // Timestamp from SQLite
}

export interface ProductImage {
  product_id: number;
  image_id: number;
}

export interface Stock {
  stock_id: number;
  product_id: number;
  quantity: number;
}

export interface AppSettings {
  currency_symbol: string;
  tax_enabled: boolean;
  tax_rate: number;
  display_scale: number;
  layout_max_width: number;
  sidebar_scale: number;
  cart_scale: number;
  grid_scale: number;
  manage_table_scale: number;
  stock_table_scale: number;
  material_table_scale: number;
  category_table_scale: number;
  setting_page_scale: number;
  payment_modal_scale: number;
  header_font_scale: number;
  sidebar_font_scale: number;
  cart_font_scale: number;
  grid_font_scale: number;
  manage_table_font_scale: number;
  stock_table_font_scale: number;
  material_table_font_scale: number;
  category_table_font_scale: number;
  setting_page_font_scale: number;
  payment_modal_font_scale: number;
  history_font_scale: number | null;
  cart_item_font_size: number | null;
  cart_item_header_font_size: number | null;
  cart_item_price_font_size: number | null;
  cart_item_padding: number | null;
  cart_item_margin: number | null;
  payment_numpad_height: number | null;
  image_storage_path: string | null;
  db_storage_path: string | null;
}

export interface StorageInfo {
  image_path: string;
  db_path: string;
}

export interface Material {
  id: number;
  name: string;
  type_: string;
  volume: number;
  quantity: number;
}

export interface RecipeList {
  id: number;
  product_id: number;
}

export interface RecipeItem {
  id: number;
  recipe_list_id: number;
  material_id: number;
  volume_use: number;
}
