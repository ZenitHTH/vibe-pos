"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";
import MaterialTable from "./components/MaterialTable";
import MaterialModal from "./components/MaterialModal";
import { useMaterialManagement } from "./hooks/useMaterialManagement";

export default function MaterialPage() {
  const {
    materials,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    editingMaterial,
    isSubmitting,
    handleCreate,
    handleEdit,
    handleDelete,
    handleModalSubmit,
  } = useMaterialManagement();

  return (
    <ManagementPageLayout
      title="Material Management"
      subtitle="Manage raw materials and ingredients for your products"
      headerActions={
        <button
          onClick={handleCreate}
          className="bg-primary shadow-primary/20 hover:bg-primary/90 flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow-lg transition-all"
        >
          <FaPlus />
          <span>Add Material</span>
        </button>
      }
      loading={loading}
      error={error}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      scaleKey="manage_table_scale"
      modal={
        <MaterialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={editingMaterial}
          isSubmitting={isSubmitting}
        />
      }
    >
      <MaterialTable
        materials={materials}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </ManagementPageLayout>
  );
}
