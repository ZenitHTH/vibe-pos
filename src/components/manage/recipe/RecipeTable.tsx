"use client";

import { BackendProduct, Material } from "@/lib";
import { RecipeItem, RecipeList } from "@/lib/types/recipe";

interface RecipeRow {
  product: BackendProduct;
  list: RecipeList;
  items: RecipeItem[];
  materials: Material[];
}

interface RecipeTableProps {
  recipeRows: RecipeRow[];
}

export default function RecipeTable({ recipeRows }: RecipeTableProps) {
  if (recipeRows.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center text-sm">
        No saved recipes yet. Save a recipe from the canvas above.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {recipeRows.map(({ product, list, items, materials }) => {
        const productMaterials = items.map((item) => {
          const mat = materials.find((m) => m.id === item.material_id);
          return { item, mat };
        });

        return (
          <div key={list.id} className="space-y-2">
            <h3 className="text-foreground text-base font-semibold">
              {product.title}
            </h3>
            <div className="border-border overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-border border-b">
                    <th className="text-muted-foreground px-4 py-2 text-left font-semibold">
                      Material
                    </th>
                    <th className="text-muted-foreground px-4 py-2 text-left font-semibold">
                      Type
                    </th>
                    <th className="text-muted-foreground px-4 py-2 text-right font-semibold">
                      Qty
                    </th>
                    <th className="text-muted-foreground px-4 py-2 text-left font-semibold">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productMaterials.map(({ item, mat }) => (
                    <tr
                      key={item.id}
                      className="border-border hover:bg-muted/20 border-b transition-colors last:border-0"
                    >
                      <td className="text-foreground px-4 py-2 font-medium">
                        {mat?.name ?? `Material #${item.material_id}`}
                      </td>
                      <td className="text-muted-foreground px-4 py-2">
                        {mat?.type_ ?? "—"}
                      </td>
                      <td className="text-foreground px-4 py-2 text-right font-mono">
                        {item.volume_use}
                      </td>
                      <td className="text-foreground px-4 py-2">{item.unit}</td>
                    </tr>
                  ))}
                  {productMaterials.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-muted-foreground px-4 py-4 text-center text-sm"
                      >
                        No materials linked.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
