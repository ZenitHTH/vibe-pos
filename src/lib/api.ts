import { invoke } from "@tauri-apps/api/core";
import {
  BackendProduct,
  NewProduct,
  Category,
  ReceiptList,
  Receipt,
  Image,
  ProductImage,
} from "./types";

export const productApi = {
  getAll: async (key: string): Promise<BackendProduct[]> => {
    return await invoke("get_products", { key });
  },

  create: async (key: string, product: NewProduct): Promise<BackendProduct> => {
    return await invoke("create_product", {
      key,
      title: product.title,
      catagory: product.catagory,
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
      catagory: product.catagory,
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
  ): Promise<string> => {
    return await invoke("export_receipts", {
      key,
      exportPath,
      format,
      startDate: startDate,
      endDate: endDate,
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
      product_id: productId,
      image_id: imageId,
    });
  },

  unlink: async (
    key: string,
    productId: number,
    imageId: number,
  ): Promise<number> => {
    return await invoke("unlink_product_image", {
      key,
      product_id: productId,
      image_id: imageId,
    });
  },

  getByProduct: async (key: string, productId: number): Promise<Image[]> => {
    return await invoke("get_product_images", { key, product_id: productId });
  },
};
