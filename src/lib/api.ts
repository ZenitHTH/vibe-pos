import { invoke } from "@tauri-apps/api/core";
import {
  BackendProduct,
  NewProduct,
  Category,
  ReceiptList,
  Receipt,
  Image,
  ProductImage,
  Stock,
  AppSettings,
  StorageInfo,
  Material,
  RecipeList,
  RecipeItem,
} from "./types";

export const productApi = {
  getAll: async (key: string): Promise<BackendProduct[]> => {
    return await invoke("get_products", { key });
  },

  create: async (key: string, product: NewProduct): Promise<BackendProduct> => {
    return await invoke("create_product", {
      key,
      title: product.title,
      categoryId: product.category_id,
      satang: product.satang,
    });
  },

  update: async (
    key: string,
    product: BackendProduct,
  ): Promise<BackendProduct> => {
    return await invoke("update_product", {
      key,
      id: product.product_id,
      title: product.title,
      categoryId: product.category_id,
      satang: product.satang,
    });
  },

  delete: async (key: string, id: number): Promise<void> => {
    await invoke("delete_product", { key, id });
  },
};

export const categoryApi = {
  getAll: async (key: string): Promise<Category[]> => {
    return await invoke("get_categories", { key });
  },

  create: async (key: string, name: string): Promise<Category> => {
    return await invoke("create_category", { key, name });
  },

  update: async (key: string, category: Category): Promise<Category> => {
    return await invoke("update_category", {
      key,
      id: category.id,
      name: category.name,
    });
  },

  delete: async (key: string, id: number): Promise<void> => {
    await invoke("delete_category", { key, id });
  },
};

export const receiptApi = {
  createInvoice: async (key: string): Promise<ReceiptList> => {
    return await invoke("create_invoice", { key });
  },

  addInvoiceItem: async (
    key: string,
    receiptId: number,
    productId: number,
    quantity: number,
  ): Promise<Receipt> => {
    return await invoke("add_invoice_item", {
      key,
      receiptId: receiptId,
      productId: productId,
      quantity,
    });
  },

  getInvoiceDetail: async (
    key: string,
    receiptId: number,
  ): Promise<[ReceiptList, Receipt[]]> => {
    return await invoke("get_invoice_detail", { key, receiptId });
  },
  getInvoicesByDate: async (
    key: string,
    startDate: number,
    endDate: number,
  ): Promise<ReceiptList[]> => {
    return await invoke("get_invoices_by_date", {
      key,
      startUnix: startDate,
      endUnix: endDate,
    });
  },
  exportReceipts: async (
    key: string,
    exportPath: string,
    format: string,
    startDate: number,
    endDate: number,
    reportType: string,
  ): Promise<string> => {
    return await invoke("export_receipts", {
      key,
      exportPath,
      format,
      startDate: startDate,
      endDate: endDate,
      reportType: reportType,
    });
  },
};

export const imageApi = {
  save: async (
    key: string,
    data: number[],
    filename: string,
  ): Promise<Image> => {
    return await invoke("save_image", { key, data, filename });
  },

  linkToProduct: async (
    key: string,
    productId: number,
    imageId: number,
  ): Promise<ProductImage> => {
    return await invoke("link_product_image", {
      key,
      productId,
      imageId,
    });
  },

  unlink: async (
    key: string,
    productId: number,
    imageId: number,
  ): Promise<number> => {
    return await invoke("unlink_product_image", {
      key,
      productId,
      imageId,
    });
  },

  getByProduct: async (key: string, productId: number): Promise<Image[]> => {
    return await invoke("get_product_images", { key, productId });
  },

  getAllImages: async (key: string): Promise<Image[]> => {
    return await invoke("get_all_images", { key });
  },

  deleteImage: async (key: string, imageId: number): Promise<void> => {
    await invoke("delete_image", { key, imageId });
  },

  getAllImageLinks: async (key: string): Promise<ProductImage[]> => {
    return await invoke("get_all_image_links", { key });
  },
};

export const stockApi = {
  getAll: async (key: string): Promise<Stock[]> => {
    return await invoke("get_all_stocks", { key });
  },

  getByProduct: async (key: string, productId: number): Promise<Stock> => {
    return await invoke("get_stock", { key, productId });
  },

  add: async (
    key: string,
    productId: number,
    quantity: number,
  ): Promise<Stock> => {
    return await invoke("insert_stock", { key, productId, quantity });
  },

  update: async (
    key: string,
    productId: number,
    quantity: number,
  ): Promise<Stock> => {
    return await invoke("update_stock", { key, productId, quantity });
  },

  remove: async (key: string, stockId: number): Promise<number> => {
    return await invoke("remove_stock", { key, stockId });
  },
};

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

export const databaseApi = {
  initializeDatabase: async (key: string): Promise<void> => {
    await invoke("initialize_database", { key });
  },

  checkDatabaseExists: async (): Promise<boolean> => {
    return await invoke("check_database_exists");
  },
};

export const materialApi = {
  getAll: async (key: string): Promise<Material[]> => {
    return await invoke("get_materials", { key });
  },

  create: async (
    key: string,
    name: string,
    type_: string,
    volume: number,
    quantity: number,
  ): Promise<Material> => {
    return await invoke("create_material", {
      key,
      name,
      type_,
      volume,
      quantity,
    });
  },

  update: async (
    key: string,
    id: number,
    name: string,
    type_: string,
    volume: number,
    quantity: number,
  ): Promise<Material> => {
    return await invoke("update_material", {
      key,
      id,
      name,
      type_,
      volume,
      quantity,
    });
  },

  delete: async (key: string, id: number): Promise<number> => {
    return await invoke("delete_material", { key, id });
  },
};

export const recipeApi = {
  createList: async (key: string, productId: number): Promise<RecipeList> => {
    return await invoke("create_recipe_list", { key, productId });
  },

  getListByProduct: async (
    key: string,
    productId: number,
  ): Promise<RecipeList | null> => {
    return await invoke("get_recipe_list_by_product", { key, productId });
  },

  deleteList: async (key: string, listId: number): Promise<number> => {
    return await invoke("delete_recipe_list", { key, listId });
  },

  addItem: async (
    key: string,
    recipeListId: number,
    materialId: number,
    volumeUse: number,
  ): Promise<RecipeItem> => {
    return await invoke("add_recipe_item", {
      key,
      recipeListId,
      materialId,
      volumeUse,
    });
  },

  getItems: async (
    key: string,
    recipeListId: number,
  ): Promise<RecipeItem[]> => {
    return await invoke("get_recipe_items", { key, recipeListId });
  },

  updateItem: async (
    key: string,
    itemId: number,
    volumeUse: number,
  ): Promise<RecipeItem> => {
    return await invoke("update_recipe_item", { key, itemId, volumeUse });
  },

  deleteItem: async (key: string, itemId: number): Promise<number> => {
    return await invoke("delete_recipe_item", { key, itemId });
  },
};
