"use client";

import { useState, useEffect, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useDatabase } from "@/context/DatabaseContext";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";
import { Image, ProductImage } from "@/lib";
import { BackendProduct } from "@/lib";
import { productApi } from "@/lib";
import { FaTrash, FaLink, FaUpload, FaSearch } from "react-icons/fa";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal"; // Assuming this exists or similar
import { Button } from "@/components/ui/Button"; // Assuming this exists or similar

// Configure image path
// Note: In a real app we need a way to serve these images.
// If using Tauri's `fs` or `convertFileSrc`, we need to handle that.
// For now, assumming we have a way to display them or using a placeholder if path is local.
// Actually, `convertFileSrc` from `@tauri-apps/api/core` (v2) or `webview` is needed.
import { convertFileSrc } from "@tauri-apps/api/core";

export default function ImageManagePage() {
  const { dbKey } = useDatabase();
  const [images, setImages] = useState<Image[]>([]);
  const [links, setLinks] = useState<ProductImage[]>([]);
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Linking Modal State
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [productSearch, setProductSearch] = useState("");

  const fetchData = useCallback(async () => {
    if (!dbKey) return;
    setLoading(true);
    try {
      // Parallel fetch
      const [imgs, lnks, prods] = await Promise.all([
        invoke<Image[]>("get_all_images", { key: dbKey }),
        invoke<ProductImage[]>("get_all_image_links", { key: dbKey }),
        productApi.getAll(dbKey),
      ]);
      setImages(imgs);
      setLinks(lnks);
      setProducts(prods);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  }, [dbKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (image: Image) => {
    if (!dbKey) return;
    // Check if used
    const usage = links.filter((l) => l.image_id === image.id);
    if (usage.length > 0) {
      if (
        !confirm(
          `This image is used by ${usage.length} products. Deleting it will unlink it from them. Continue?`,
        )
      ) {
        return;
      }
    } else {
      if (!confirm("Delete this image?")) return;
    }

    try {
      await invoke("delete_image", { key: dbKey, imageId: image.id });
      // Update state locally
      setImages((prev) => prev.filter((i) => i.id !== image.id));
      setLinks((prev) => prev.filter((l) => l.image_id !== image.id));
    } catch (err) {
      console.error("Failed to delete image", err);
      alert("Failed to delete image");
    }
  };

  const handleUpload = async () => {
    // TODO: Implement file selection
    // For now, simpler to just rely on "Drag and Drop" or a hidden file input.
    // Let's us a hidden input.
    document.getElementById("image-upload-input")?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !dbKey) return;

    const file = e.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const data = Array.from(bytes);

    try {
      await invoke("save_image", {
        key: dbKey,
        data: data,
        filename: file.name,
      });
      fetchData(); // Refresh all to get new ID and sort
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed: " + err);
    }
  };

  const openLinkModal = (img: Image) => {
    setSelectedImage(img);
    setProductSearch("");
    setIsLinkModalOpen(true);
  };

  const toggleLink = async (productId: number, isLinked: boolean) => {
    if (!dbKey || !selectedImage) return;

    try {
      if (isLinked) {
        await invoke("unlink_product_image", {
          key: dbKey,
          productId,
          imageId: selectedImage.id,
        });
        setLinks((prev) =>
          prev.filter(
            (l) =>
              !(l.product_id === productId && l.image_id === selectedImage.id),
          ),
        );
      } else {
        await invoke("link_product_image", {
          key: dbKey,
          productId,
          imageId: selectedImage.id,
        });
        setLinks((prev) => [
          ...prev,
          { product_id: productId, image_id: selectedImage.id },
        ]);
      }
    } catch (err) {
      console.error("Failed to toggle link", err);
    }
  };

  const getProductUsage = (imageId: number) => {
    const productIds = links
      .filter((l) => l.image_id === imageId)
      .map((l) => l.product_id);
    return products.filter((p) => productIds.includes(p.product_id));
  };

  const filteredProductsToLink = products.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase()),
  );

  return (
    <ManagementPageLayout
      title="Image Management"
      subtitle="Upload and manage images, check product usage."
      scaleKey="manage_table_scale"
      headerActions={
        <div className="flex gap-2">
          <input
            type="file"
            id="image-upload-input"
            className="hidden"
            accept="image/*"
            onChange={onFileChange}
          />
          <Button onClick={handleUpload} className="gap-2">
            <FaUpload /> Upload Image
          </Button>
        </div>
      }
      scrollable={true}
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((img) => {
          const usedBy = getProductUsage(img.id);
          const src = convertFileSrc(img.file_path);

          return (
            <Card key={img.id} className="group relative overflow-hidden">
              <div className="bg-muted relative flex aspect-square items-center justify-center">
                <img
                  src={src}
                  alt={img.file_name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => openLinkModal(img)}
                    title="Link to Products"
                  >
                    <FaLink />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(img)}
                    title="Delete"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
              <div className="p-3 text-sm">
                <div className="truncate font-medium" title={img.file_name}>
                  {img.file_name}
                </div>
                <div className="text-muted-foreground mt-1 text-xs">
                  {usedBy.length === 0
                    ? "Unused"
                    : `Used by ${usedBy.length} products`}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {isLinkModalOpen && selectedImage && (
        <Modal
          isOpen={isLinkModalOpen}
          onClose={() => setIsLinkModalOpen(false)}
          title={`Link Image: ${selectedImage.file_name}`}
        >
          <div className="space-y-4">
            <div className="relative">
              <FaSearch className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] space-y-2 overflow-y-auto rounded-md border p-2">
              {filteredProductsToLink.map((product) => {
                const isLinked = links.some(
                  (l) =>
                    l.product_id === product.product_id &&
                    l.image_id === selectedImage.id,
                );
                return (
                  <div
                    key={product.product_id}
                    className="hover:bg-muted flex items-center justify-between rounded-md p-2"
                  >
                    <span>{product.title}</span>
                    <Button
                      size="sm"
                      variant={isLinked ? "default" : "outline"}
                      onClick={() => toggleLink(product.product_id, isLinked)}
                    >
                      {isLinked ? "Linked" : "Link"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
    </ManagementPageLayout>
  );
}
