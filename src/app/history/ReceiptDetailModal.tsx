"use client";

import { FaArrowLeft, FaReceipt } from 'react-icons/fa';
import { ReceiptList as ReceiptListType } from '@/lib/types';
import { useReceiptDetail, formatDate } from './hooks/useReceiptDetail';

interface ReceiptDetailModalProps {
    receipt: ReceiptListType;
    onClose: () => void;
}

export default function ReceiptDetailModal({ receipt, onClose }: ReceiptDetailModalProps) {
    const { receiptItems, loadingDetail, getProductName } = useReceiptDetail(receipt);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card-bg w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-border flex justify-between items-center bg-card-bg/50">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FaReceipt className="text-primary" />
                        Receipt #{receipt.receipt_id}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted/20 rounded-full transition-colors text-muted hover:text-foreground"
                    >
                        <FaArrowLeft className="rotate-180" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="mb-4 text-center">
                        <div className="text-muted text-sm">Date</div>
                        <div className="font-bold text-lg">{formatDate(receipt.datetime_unix)}</div>
                    </div>

                    <div className="space-y-3">
                        {loadingDetail ? (
                            <div className="text-center py-8 text-muted">Loading items...</div>
                        ) : (
                            receiptItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
                                    <div className="font-medium">
                                        {getProductName(item.product_id)}
                                        <div className="text-xs text-muted">Qty: {item.quantity}</div>
                                    </div>
                                    <div className="font-bold">x{item.quantity}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="p-6 border-t border-border bg-muted/5 text-center">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-muted/10 hover:bg-muted/20 text-foreground font-medium rounded-xl transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
