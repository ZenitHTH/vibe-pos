import { useState, useEffect } from "react";
import { productApi } from "@/lib/api";
import { BackendProduct, NewProduct } from "@/lib/types";

export function useProductManagement() {
    const [products, setProducts] = useState<BackendProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<BackendProduct | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productApi.getAll();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError("Failed to load products. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingProduct(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (product: BackendProduct) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await productApi.delete(id);
            setProducts(products.filter(p => p.product_id !== id));
        } catch (err) {
            console.error("Failed to delete product:", err);
            alert("Failed to delete product");
        }
    };

    const handleModalSubmit = async (data: NewProduct) => {
        try {
            setIsSubmitting(true);
            if (editingProduct) {
                const updated = await productApi.update({
                    ...data,
                    product_id: editingProduct.product_id,
                });
                setProducts(products.map(p => p.product_id === updated.product_id ? updated : p));
            } else {
                const created = await productApi.create(data);
                setProducts([...products, created]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to save product:", err);
            alert("Failed to save product");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.catagory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
        products: filteredProducts,
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
        handleModalSubmit
    };
}
