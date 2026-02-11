"use client";

import { FaPlus } from "react-icons/fa";
import CategoryModal from "./components/CategoryModal";
import { useSettings } from "@/app/context/SettingsContext";
import { useCategoryManagement } from "./hooks/useCategoryManagement";
import CategoryTable from "./components/CategoryTable";
import ManagementPageLayout from "../../components/layout/ManagementPageLayout";

export default function CategoriesPage() {
    const { settings } = useSettings();
    const {
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
    } = useCategoryManagement();

    return (
        <ManagementPageLayout
            title="Category Management"
            subtitle="Manage product categories"
            headerActions={
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                >
                    <FaPlus />
                    <span>New Category</span>
                </button>
            }
            loading={loading}
            error={error}
            scaleKey="category_table_scale"
            modal={
                <CategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleModalSubmit}
                    initialData={editingCategory}
                    isSubmitting={isSubmitting}
                />
            }
        >
            <CategoryTable
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
                settings={settings}
            />
        </ManagementPageLayout>
    );
}
