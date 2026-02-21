"use client";

import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import ManagementPageLayout from "@/components/layout/ManagementPageLayout";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import RecipeFlowBuilder from "@/components/manage/recipe/RecipeFlowBuilder";
import RecipeTable from "@/components/manage/recipe/RecipeTable";
import { useRecipeTable } from "./hooks/useRecipeTable";

export default function RecipeBuilderPage() {
  const { rows, loading, refresh } = useRecipeTable();

  return (
    <ManagementPageLayout
      title="Recipe Builder"
      subtitle="Drag and drop materials to connect them to products."
      scaleKey="manage_table_scale"
      headerActions={
        <Link
          href="/manage/material"
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center gap-2 rounded-xl border border-transparent px-4 py-2 text-sm font-medium transition-all"
        >
          <FaArrowLeft />
          <span>Back to Materials</span>
        </Link>
      }
    >
      <div className="bg-card border-border flex h-[600px] w-full overflow-hidden rounded-xl border shadow-sm">
        <ReactFlowProvider>
          <RecipeFlowBuilder onSaved={refresh} />
        </ReactFlowProvider>
      </div>

      <div className="mt-6">
        <h2 className="text-foreground mb-3 text-lg font-bold">
          Saved Recipes
        </h2>
        {loading ? (
          <div className="text-muted-foreground py-6 text-center text-sm">
            Loading recipes…
          </div>
        ) : (
          <RecipeTable recipeRows={rows} />
        )}
      </div>
    </ManagementPageLayout>
  );
}
