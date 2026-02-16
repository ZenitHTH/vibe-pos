"use client";

import { FaPlus } from "react-icons/fa";
import CategoryModal from "./components/CategoryModal";
import { useSettings } from "@/context/SettingsContext";
import { useCategoryManagement } from "./hooks/useCategoryManagement";
import CategoryTable from "./components/CategoryTable";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";

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
    handleModalSubmit,
  } = useCategoryManagement();

  return (
    <ManagementPageLayout
      title="Category Management"
      subtitle="Manage product categories"
      headerActions={
        <button
          onClick={handleCreate}
          className="bg-primary flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600"
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
