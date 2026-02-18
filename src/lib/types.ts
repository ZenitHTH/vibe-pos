export interface BackendProduct {
  product_id: number;
  title: string;
  catagory: string;
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
}

export interface NewReceipt {
  receipt_id: number;
  product_id: number;
  quantity: number;
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
