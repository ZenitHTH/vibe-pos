"use client";

import { FaPlus, FaBoxes } from "react-icons/fa";
import Link from "next/link";
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
        <div className="flex items-center gap-3">
          <Link
            href="/manage/material"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center gap-2 rounded-xl border border-transparent px-4 py-2 text-sm font-medium transition-all"
          >
            <FaBoxes />
            <span>Manage Materials</span>
          </Link>
          <button
            onClick={handleCreate}
            className="bg-primary shadow-primary/20 hover:bg-primary/90 flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow-lg transition-all"
          >
            <FaPlus />
            <span>Add Stock</span>
          </button>
        </div>
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
