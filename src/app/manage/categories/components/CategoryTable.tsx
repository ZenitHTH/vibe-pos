import { Category } from "@/lib/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import GlobalTable from "@/components/ui/GlobalTable";
import { AppSettings } from "@/lib/settings";

interface CategoryTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
    settings: AppSettings;
}

export default function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
    return (
        <div className="bg-card-bg rounded-xl border border-border shadow-sm overflow-hidden">
            <GlobalTable
                keyField="id"
                data={categories}
                emptyMessage="No categories found"
                columns={[
                    { header: "ID", accessor: "id", className: "text-muted" },
                    { header: "Name", accessor: "name", className: "font-medium" },
                    {
                        header: "Actions",
                        headerClassName: "text-right",
                        className: "text-right",
                        render: (cat) => (
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => onEdit(cat)}
                                    className="p-2 hover:bg-blue-50 text-muted hover:text-primary rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => onDelete(cat.id)}
                                    className="p-2 hover:bg-red-50 text-muted hover:text-red-500 rounded-lg transition-colors"
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
