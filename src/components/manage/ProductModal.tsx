"use client";

import { convertFileSrc } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { BackendProduct, NewProduct, Category, Image } from "@/lib/types";
import { categoryApi, imageApi } from "@/lib/api";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FaImage, FaTrash } from "react-icons/fa";
import { useDatabase } from "@/context/DatabaseContext";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: NewProduct) => Promise<BackendProduct | undefined>;
  initialData?: BackendProduct;
  isSubmitting: boolean;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: ProductModalProps) {
  const { dbKey } = useDatabase();
  const [formData, setFormData] = useState<NewProduct>({
    title: initialData?.title || "",
    catagory: initialData?.catagory || "",
    satang: initialData?.satang || 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen && dbKey) {
      categoryApi.getAll(dbKey).then(setCategories).catch(console.error);
    }
  }, [isOpen, dbKey]);

  // Reset form when opening for create, or set for edit
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: initialData?.title || "",
        catagory: initialData?.catagory || "",
        satang: initialData?.satang || 0,
      });
      setImages([]);
      if (initialData && dbKey) {
        // Fetch existing images
        imageApi
          .getByProduct(dbKey, initialData.product_id)
          .then(setImages)
          .catch(console.error);
      }
    }
  }, [isOpen, initialData, dbKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const savedProduct = await onSubmit(formData);

    if (savedProduct && dbKey && images.length > 0) {
      // Link images to the new product (if they aren't already linked)
      // If editing, they might already be linked if we did it on upload.
      // But if we uploaded new ones, they need linking.
      // Strategy: Link all images in `images` array to `savedProduct.product_id`.
      // Use `linkToProduct`. `link_product_image` is idempotent (insert or ignore usually, or fails if exists).
      // My backend `insert_into` might fail if exists?
      // `diesel::insert_into` usually fails on unique constraint violation.
      // SQLite schema: `diesel::table! { product_images (product_id, image_id) { ... } }`
      // PK is composite (product_id, image_id). So it will fail if exists.

      // To be safe, we can try linking and ignore errors, or valid check.
      // Or better: only link the ones that are new.
      // How do we know which are new?
      // `initialData` has original images. `images` has current images.
      // But `initialData` (backend product) doesn't have images in it.

      // Simpler approach:
      // For new product: Link all.
      // For existing product: Link immediately on upload!
      // But what if user cancels?
      // If user cancels, we have orphaned images (saved but not linked, or linked then modal closed).
      // Ideally we only link on Save.
      // But `images` state contains `Image` objects (already saved to DB/Disk).

      // Let's just loop and link all, masking errors?
      // Or `get_product_images` first, then diff?
      // Since `link_product_image` is cheap, let's try linking all for now.
      await Promise.all(
        images.map((img) =>
          imageApi
            .linkToProduct(dbKey, savedProduct.product_id, img.id)
            .catch((err) => {
              // Ignore "Unique violation" or similar if already linked
              console.warn("Failed to link image (might already exist):", err);
            }),
        ),
      );
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && dbKey) {
      setIsUploading(true);
      const file = e.target.files[0];
      const arrayBuffer = await file.arrayBuffer();
      const bytes = Array.from(new Uint8Array(arrayBuffer));

      try {
        const savedImage = await imageApi.save(dbKey, bytes, file.name);
        setImages((prev) => [...prev, savedImage]);
      } catch (err) {
        console.error("Failed to upload image:", err);
        alert("Failed to upload image.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Helper to get image URL for display
  // Since `Image` has `file_path`, but webview can't read arbitrary files directly usually?
  // Tauri 2: Protocol `asset://` or `convertFileSrc`?
  // In Tauri v2, `convertFileSrc` is `convertFileSrc` from `@tauri-apps/api/core`.
  // It creates a URL like `asset://local/path/to/file`.
  // We need to import it.

  const getPrice = (satang: number) => (satang / 100).toFixed(2);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Product" : "New Product"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <Select
          label="Category"
          value={formData.catagory}
          onChange={(val) =>
            setFormData({ ...formData, catagory: String(val) })
          }
          options={categories.map((cat) => ({
            value: cat.name,
            label: cat.name,
          }))}
          placeholder="Select Category"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price (Satang)"
            type="number"
            required
            min="0"
            value={formData.satang}
            onChange={(e) =>
              setFormData({
                ...formData,
                satang: parseInt(e.target.value) || 0,
              })
            }
          />
          <div>
            <label className="mb-1 block text-sm font-medium">
              Display Price
            </label>
            <div className="border-border bg-muted/10 text-foreground rounded-lg border px-3 py-2">
              ฿{getPrice(formData.satang)}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Images</label>
          <div className="flex flex-wrap gap-2">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative h-16 w-16 overflow-hidden rounded border"
              >
                <img
                  src={convertFileSrc(img.file_path)}
                  alt={img.file_name}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((i) => i.id !== img.id))
                  }
                  className="bg-destructive text-destructive-foreground absolute top-0 right-0 rounded-bl p-1 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <FaTrash size={10} />
                </button>
              </div>
            ))}
            <label className="border-border hover:bg-muted/10 flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded border border-dashed transition-colors">
              <FaImage className="text-muted-foreground mb-1" />
              <span className="text-muted-foreground text-xs">Add</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-foreground px-4 py-2 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="bg-primary rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
