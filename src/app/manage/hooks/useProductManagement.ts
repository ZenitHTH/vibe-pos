import { useState, useEffect } from "react";
import { productApi, categoryApi } from "@/lib/api";
import { BackendProduct, NewProduct, Category } from "@/lib/types";

import { useDatabase } from "@/context/DatabaseContext";

export function useProductManagement() {
  const { dbKey } = useDatabase();
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<
    BackendProduct | undefined
  >(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!dbKey) return;
      try {
        setLoading(true);
        const [data, fetchedCategories] = await Promise.all([
          productApi.getAll(dbKey),
          categoryApi.getAll(dbKey),
        ]);
        setProducts(data);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [dbKey]);

  const handleCreate = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (product: BackendProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?") || !dbKey)
      return;

    try {
      await productApi.delete(dbKey, id);
      setProducts(products.filter((p) => p.product_id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert(err);
    }
  };

  const handleModalSubmit = async (
    data: NewProduct,
  ): Promise<BackendProduct | undefined> => {
    if (!dbKey) return;
    try {
      setIsSubmitting(true);
      let result: BackendProduct;
      if (editingProduct) {
        const updated = await productApi.update(dbKey, {
          ...data,
          product_id: editingProduct.product_id,
        });
        setProducts(
          products.map((p) =>
            p.product_id === updated.product_id ? updated : p,
          ),
        );
        result = updated;
      } else {
        const created = await productApi.create(dbKey, data);
        setProducts([...products, created]);
        result = created;
      }
      setIsModalOpen(false);
      return result;
    } catch (err) {
      console.error("Failed to save product:", err);
      alert(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const categoryName =
      categories.find((c) => c.id === product.category_id)?.name || "Unknown";
    return (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return {
    products: filteredProducts,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    editingProduct,
    isSubmitting,
    handleCreate,
    handleEdit,
    handleDelete,
    handleModalSubmit,
  };
}
