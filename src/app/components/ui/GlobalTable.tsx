"use client";

import { ReactNode } from "react";

export interface Column<T> {
    header: string;
    accessor?: keyof T;
    render?: (item: T) => ReactNode;
    className?: string;
    headerClassName?: string;
}

interface GlobalTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField: keyof T;
    emptyMessage?: string;
}

export default function GlobalTable<T>({ columns, data, keyField, emptyMessage = "No items found" }: GlobalTableProps<T>) {
    return (
        <div className="bg-card-bg rounded-xl border border-border shadow-sm overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-muted/5 border-b border-border">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={`px-6 py-4 font-medium text-muted ${col.headerClassName || ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-12 text-center text-muted">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={String(item[keyField])} className="hover:bg-muted/5 transition-colors">
                                {columns.map((col, index) => (
                                    <td key={index} className={`px-6 py-4 ${col.className || ''}`}>
                                        {col.render ? col.render(item) : (col.accessor ? String(item[col.accessor]) : '')}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
