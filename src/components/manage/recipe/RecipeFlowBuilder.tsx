import { useCallback, useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  Panel,
} from "@xyflow/react";
import { useRecipeFlow } from "@/app/manage/material/recipe/hooks/useRecipeFlow";
import RecipeSidebar from "./RecipeSidebar";
import ProductNode from "./ProductNode";
import MaterialNode from "./MaterialNode";
import VolumeEdge from "./VolumeEdge";

const nodeTypes = {
  product: ProductNode,
  material: MaterialNode,
};

const edgeTypes = {
  volumeEdge: VolumeEdge,
};

export default function RecipeFlowBuilder({
  onSaved,
}: {
  onSaved?: () => void;
}) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    products,
    materials,
    saving,
    error,
    successMsg,
    saveRecipes,
    clearCanvas,
  } = useRecipeFlow({ onSaved });

  const handleDragStart = (
    event: React.DragEvent,
    nodeType: string,
    nodeData: any,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData(
      "application/reactflow-data",
      JSON.stringify(nodeData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = useCallback(
    (event: React.DragEvent) => onDrop(event, screenToFlowPosition),
    [onDrop, screenToFlowPosition],
  );

  return (
    <div className="relative flex h-full w-full" ref={reactFlowWrapper}>
      <RecipeSidebar
        products={products}
        materials={materials}
        onDragStart={handleDragStart}
      />

      <div className="relative h-full flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={handleDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          className="bg-background"
        >
          <Background
            color="var(--muted-foreground)"
            gap={16}
            className="opacity-20"
          />
          <Controls className="bg-card! text-foreground border-border! fill-foreground [&_button]:border-border! [&_button]:bg-card! [&_button]:text-foreground! [&_button:hover]:bg-muted! [&_path]:fill-foreground! shadow-sm" />
          <MiniMap
            zoomable
            pannable
            nodeClassName="bg-primary/20!"
            className="bg-card! border-border! rounded border shadow-sm"
            maskColor="color-mix(in srgb, var(--muted) 80%, transparent)"
          />

          <Panel position="top-right" className="flex gap-2">
            <button
              onClick={clearCanvas}
              type="button"
              className="bg-background border-border hover:bg-muted rounded border px-4 py-2 text-sm font-medium shadow-sm"
            >
              Clear Canvas
            </button>
            <button
              onClick={saveRecipes}
              disabled={saving}
              type="button"
              className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Recipes"}
            </button>
          </Panel>

          {(error || successMsg) && (
            <Panel position="top-center" className="z-50 min-w-64">
              {error && (
                <div className="bg-destructive text-destructive-foreground animate-in slide-in-from-top-4 rounded px-4 py-2 text-center text-sm font-medium shadow-md">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="animate-in slide-in-from-top-4 bg-success text-success-foreground rounded px-4 py-2 text-center text-sm font-medium shadow-md">
                  {successMsg}
                </div>
              )}
            </Panel>
          )}
        </ReactFlow>
      </div>
    </div>
  );
}
