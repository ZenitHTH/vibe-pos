"use client";

import { FaPlus } from "react-icons/fa";
import StockModal from "./components/StockModal";
import { useStockManagement } from "./hooks/useStockManagement";
import StockTable from "./components/StockTable";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";

export default function StockPage() {
  const {
    stocks,
    products,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    editingStock,
    isSubmitting,
    getProductName,
    handleCreate,
    handleEdit,
    handleDelete,
    handleModalSubmit,
  } = useStockManagement();

  return (
    <ManagementPageLayout
      title="Stock Management"
      subtitle="Manage your inventory stock levels"
      headerActions={
        <button
          onClick={handleCreate}
          className="bg-primary flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
        >
          <FaPlus />
          <span>Add Stock</span>
        </button>
      }
      loading={loading}
      error={error}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      scaleKey="stock_table_scale"
      modal={
        <StockModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={editingStock}
          products={products}
          isSubmitting={isSubmitting}
        />
      }
    >
      <StockTable
        stocks={stocks}
        getProductName={getProductName}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </ManagementPageLayout>
  );
}
