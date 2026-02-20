import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { NewCustomer, Customer } from "@/lib";

interface CustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: NewCustomer) => Promise<Customer | undefined>;
    initialData?: Customer;
    isSubmitting: boolean;
}

export default function CustomerModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isSubmitting,
}: CustomerModalProps) {
    const [formData, setFormData] = useState<NewCustomer>({
        name: "",
        tax_id: "",
        address: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                tax_id: initialData.tax_id || "",
                address: initialData.address || "",
            });
        } else {
            setFormData({ name: "", tax_id: "", address: "" });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div
                className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all dark:bg-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/50">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {initialData ? "Edit Customer" : "New Customer"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(formData);
                    }}
                    className="p-6"
                >
                    <div className="space-y-5">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Customer Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-primary"
                                placeholder="Company or Individual Name"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tax ID
                            </label>
                            <input
                                type="text"
                                value={formData.tax_id || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, tax_id: e.target.value })
                                }
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-primary"
                                placeholder="เลขประจำตัวผู้เสียภาษีอากร"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Address / Branch
                            </label>
                            <textarea
                                value={formData.address || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                rows={3}
                                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-primary"
                                placeholder="Head Office or Branch address"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-primary/90 rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : "Save Customer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
