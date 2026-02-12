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

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    return (
        <div className="bg-card-bg rounded-xl border border-border shadow-sm overflow-hidden">
            <GlobalTable
                keyField="product_id"
                data={products}
                emptyMessage="No products found"
                columns={[
                    { header: "ID", accessor: "product_id", className: "text-muted" },
                    { header: "Title", accessor: "title", className: "font-medium" },
                    {
                        header: "Category",
                        render: (product) => (
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-medium">
                                {product.catagory}
                            </span>
                        )
                    },
                    {
                        header: "Price",
                        className: "font-mono",
                        render: (product) => `฿${(product.satang / 100).toFixed(2)}`
                    },
                    {
                        header: "Actions",
                        headerClassName: "text-right",
                        className: "text-right",
                        render: (product) => (
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => onEdit(product)}
                                    className="p-2 text-muted hover:text-primary transition-colors hover:bg-blue-50 rounded-lg"
                                    title="Edit"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => onDelete(product.product_id)}
                                    className="p-2 text-muted hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        )
                    }
                ]}
            />
        </div>
    );
}
