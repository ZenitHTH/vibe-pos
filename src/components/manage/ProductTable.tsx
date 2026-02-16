import { BackendProduct } from "@/lib/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import GlobalTable from "@/components/ui/GlobalTable";
import { AppSettings } from "@/lib/settings";

interface ProductTableProps {
  products: BackendProduct[];
  onEdit: (product: BackendProduct) => void;
  onDelete: (id: number) => void;
  settings: AppSettings;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <GlobalTable
      keyField="product_id"
      data={products}
      emptyMessage="No products found"
      columns={[
        {
          header: "ID",
          accessor: "product_id",
          className: "text-muted-foreground w-[80px]",
        },
        { header: "Title", accessor: "title", className: "font-medium" },
        {
          header: "Category",
          render: (product) => (
            <span className="bg-primary/10 text-primary rounded-md px-2 py-1 text-sm font-medium">
              {product.catagory}
            </span>
          ),
        },
        {
          header: "Price",
          className: "font-mono tabular-nums",
          render: (product) => `฿${(product.satang / 100).toFixed(2)}`,
        },
        {
          header: "Actions",
          headerClassName: "text-right",
          className: "text-right",
          render: (product) => (
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onEdit(product)}
                className="text-muted-foreground hover:text-accent-foreground hover:bg-accent rounded-lg p-2 transition-colors"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(product.product_id)}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg p-2 transition-colors"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          ),
        },
      ]}
    />
  );
}
