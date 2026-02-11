import { useState, useEffect } from "react";
import { categoryApi } from "@/lib/api";
import { Category } from "@/lib/types";

export function useCategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryApi.getAll();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
            setError("Failed to load categories.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingCategory(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await categoryApi.delete(id);
            setCategories(categories.filter(c => c.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete category");
        }
    };

    const handleModalSubmit = async (name: string) => {
        try {
            setIsSubmitting(true);
            if (editingCategory) {
                const updated = await categoryApi.update({ ...editingCategory, name });
                setCategories(categories.map(c => c.id === updated.id ? updated : c));
            } else {
                const created = await categoryApi.create(name);
                setCategories([...categories, created]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            alert("Failed to save category");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        categories,
        loading,
        error,
        isModalOpen,
        setIsModalOpen,
        editingCategory,
        isSubmitting,
        handleCreate,
        handleEdit,
        handleDelete,
        handleModalSubmit
    };
}
