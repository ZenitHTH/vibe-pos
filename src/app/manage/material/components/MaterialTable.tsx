import { FaEdit, FaTrash } from "react-icons/fa";

export interface Material {
  id: number;
  name: string;
  unit_of_measurement: string;
  cost_per_unit: number;
}

interface MaterialTableProps {
  materials: Material[];
  onEdit: (material: Material) => void;
  onDelete: (id: number) => void;
}

export default function MaterialTable({
  materials,
  onEdit,
  onDelete,
}: MaterialTableProps) {
  if (materials.length === 0) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center rounded-xl border border-dashed">
        No materials found. Add some materials to get started.
      </div>
    );
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground border-b text-xs font-semibold uppercase">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Unit of Measurement</th>
              <th className="px-6 py-4">Cost per Unit</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {materials.map((m) => (
              <tr key={m.id} className="hover:bg-muted/50 transition-colors">
                <td className="text-muted-foreground px-6 py-4 font-mono">
                  #{m.id}
                </td>
                <td className="px-6 py-4 font-medium">{m.name}</td>
                <td className="px-6 py-4">
                  <span className="bg-secondary text-secondary-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {m.unit_of_measurement}
                  </span>
                </td>
                <td className="px-6 py-4 text-[1.1em] font-semibold text-green-600 dark:text-green-400">
                  ฿{(m.cost_per_unit / 100).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(m)}
                      className="text-primary hover:bg-primary/10 rounded-lg p-2 transition-colors"
                      title="Edit material"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(m.id)}
                      className="text-destructive hover:bg-destructive/10 rounded-lg p-2 transition-colors"
                      title="Delete material"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
