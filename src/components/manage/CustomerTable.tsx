import { FaEdit } from "react-icons/fa";
import { Customer, AppSettings } from "@/lib";

interface CustomerTableProps {
    customers: Customer[];
    onEdit: (customer: Customer) => void;
    settings: AppSettings;
}

export default function CustomerTable({
    customers,
    onEdit,
    settings,
}: CustomerTableProps) {
    const fontScale = (settings.manage_table_font_scale || 100) / 100;

    return (
        <div className="overflow-x-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
            <table
                className="w-full text-left text-sm text-gray-600 dark:text-gray-300"
                style={{ fontSize: `${0.875 * fontScale}rem` }}
            >
                <thead
                    className="bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    style={{ fontSize: `${0.75 * fontScale}rem` }}
                >
                    <tr>
                        <th className="px-6 py-4 font-semibold">Customer Name</th>
                        <th className="px-6 py-4 font-semibold">Tax ID</th>
                        <th className="px-6 py-4 font-semibold">Address / Branch</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {customers.map((customer) => (
                        <tr
                            key={customer.id}
                            className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {customer.name}
                            </td>
                            <td className="px-6 py-4">{customer.tax_id || "-"}</td>
                            <td className="px-6 py-4">{customer.address || "-"}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => onEdit(customer)}
                                    className="rounded-lg p-2 text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30"
                                    title="Edit Customer"
                                >
                                    <FaEdit size={18 * fontScale} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {customers.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                            >
                                No customers found. Click &quot;New Customer&quot; to add one.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
