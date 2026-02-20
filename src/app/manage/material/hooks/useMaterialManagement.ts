// This hook mocks the backend communication until the backend is fully connected later
"use client";

import { useState, useMemo, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Material } from "../components/MaterialTable";

export function useMaterialManagement() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | undefined>(
    undefined,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const data = await invoke<Material[]>("get_materials");
      setMaterials(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch materials");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleCreate = () => {
    setEditingMaterial(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    try {
      await invoke("delete_material", { id });
      await fetchMaterials();
    } catch (err: any) {
      alert(`Failed to delete material: ${err.message}`);
    }
  };

  const handleModalSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const parsedCost = Math.round(parseFloat(data.cost_per_unit_thb) * 100);

      if (editingMaterial) {
        await invoke("update_material", {
          id: editingMaterial.id,
          name: data.name,
          unitOfMeasurement: data.unit_of_measurement,
          costPerUnit: parsedCost,
        });
      } else {
        await invoke("create_material", {
          name: data.name,
          unitOfMeasurement: data.unit_of_measurement,
          costPerUnit: parsedCost,
        });
      }

      await fetchMaterials();
      setIsModalOpen(false);
    } catch (err: any) {
      alert(`Failed to save material: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [materials, searchQuery]);

  return {
    materials: filteredMaterials,
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
    refresh: fetchMaterials,
  };
}
