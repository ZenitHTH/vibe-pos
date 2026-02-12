"use client";

import { FaPlus } from "react-icons/fa";
import ProductModal from "./components/ProductModal";
import { useSettings } from "@/context/SettingsContext";
import { useProductManagement } from "./hooks/useProductManagement";
import ProductTable from "./components/ProductTable";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";

export default function ManagePage() {
    const { settings } = useSettings();
    const {
        products,
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
    } = useProductManagement();

    return (
        <ManagementPageLayout
            title="Product Management"
            subtitle="Manage your inventory items"
            headerActions={
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                >
                    <FaPlus />
                    <span>New Product</span>
                </button>
            }
            loading={loading}
            error={error}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            scaleKey="manage_table_scale"
            modal={
                isModalOpen && (
                    <ProductModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleModalSubmit}
                        initialData={editingProduct}
                        isSubmitting={isSubmitting}
                    />
                )
            }
        >
            <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
                settings={settings}
            />
        </ManagementPageLayout>
    );
}
