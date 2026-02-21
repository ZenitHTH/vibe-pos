import { BackendProduct, Material } from "@/lib";
import { FaBoxes, FaBoxOpen, FaSearch } from "react-icons/fa";
import { useState } from "react";

interface RecipeSidebarProps {
  products: BackendProduct[];
  materials: Material[];
  onDragStart: (
    event: React.DragEvent,
    nodeType: string,
    nodeData: any,
  ) => void;
}

export default function RecipeSidebar({
  products,
  materials,
  onDragStart,
}: RecipeSidebarProps) {
  const [productSearch, setProductSearch] = useState("");
  const [materialSearch, setMaterialSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase()),
  );
  const filteredMaterials = materials.filter((m) =>
    m.name.toLowerCase().includes(materialSearch.toLowerCase()),
  );

  return (
    <aside className="bg-muted/30 border-border flex h-full w-80 flex-col border-r p-4 shadow-inner">
      <h2 className="mb-4 text-lg font-bold">Toolbox</h2>
      <p className="text-muted-foreground mb-6 text-xs">
        Drag and drop items to the canvas to build recipes.
      </p>

      {/* Products Section */}
      <div className="border-border bg-card mb-4 flex flex-1 flex-col overflow-y-auto rounded-lg border p-2">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <FaBoxOpen className="text-primary" /> Products
        </h3>
        <div className="relative mb-2 shrink-0">
          <FaSearch className="text-muted absolute top-1/2 left-2 -translate-y-1/2 text-xs" />
          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="border-border bg-background focus:ring-primary/50 w-full rounded border py-1 pr-2 pl-7 text-xs outline-none focus:ring-1"
          />
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
          {filteredProducts.map((product) => (
            <div
              key={`p-${product.product_id}`}
              className="bg-primary/5 border-primary/20 hover:bg-primary/20 flex cursor-grab items-center gap-2 overflow-hidden rounded border p-2 text-sm active:cursor-grabbing"
              onDragStart={(event) =>
                onDragStart(event, "product", {
                  id: product.product_id,
                  label: product.title,
                  price: product.satang,
                })
              }
              draggable
            >
              <FaBoxOpen className="text-primary shrink-0" />
              <span className="truncate">{product.title}</span>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="text-muted-foreground py-4 text-center text-xs">
              No products found
            </div>
          )}
        </div>
      </div>

      {/* Materials Section */}
      <div className="border-border bg-card flex flex-1 flex-col overflow-y-auto rounded-lg border p-2">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <FaBoxes className="text-secondary-foreground" /> Materials
        </h3>
        <div className="relative mb-2 shrink-0">
          <FaSearch className="text-muted absolute top-1/2 left-2 -translate-y-1/2 text-xs" />
          <input
            type="text"
            placeholder="Search materials..."
            value={materialSearch}
            onChange={(e) => setMaterialSearch(e.target.value)}
            className="border-border bg-background focus:ring-secondary/50 w-full rounded border py-1 pr-2 pl-7 text-xs outline-none focus:ring-1"
          />
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
          {filteredMaterials.map((material) => (
            <div
              key={`m-${material.id}`}
              className="bg-muted border-border hover:bg-muted-foreground/10 flex cursor-grab items-center gap-2 overflow-hidden rounded border p-2 text-sm active:cursor-grabbing"
              onDragStart={(event) =>
                onDragStart(event, "material", {
                  id: material.id,
                  label: material.name,
                  type_: material.type_,
                  quantity: material.quantity,
                })
              }
              draggable
            >
              <FaBoxes className="text-muted-foreground shrink-0" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate leading-tight">{material.name}</span>
                <span className="text-muted-foreground text-[10px]">
                  {material.quantity} {material.type_}
                </span>
              </div>
            </div>
          ))}
          {filteredMaterials.length === 0 && (
            <div className="text-muted-foreground py-4 text-center text-xs">
              No materials found
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
