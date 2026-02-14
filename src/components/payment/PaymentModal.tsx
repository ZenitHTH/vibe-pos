import { useState, useEffect, useMemo } from 'react';
import ModalHeader from './ModalHeader';
import AmountSummary from './AmountSummary';
import CashInput from './CashInput';
import ChangeDisplay from './ChangeDisplay';
import PaymentFooter from './PaymentFooter';

import { useSettings } from '@/context/SettingsContext';
import SelectableOverlay from '../design-mode/SelectableOverlay';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
    onConfirm: (cashReceived: number) => Promise<void>;
    currency?: string;
}

export default function PaymentModal({ isOpen, onClose, total, onConfirm, currency = '$' }: PaymentModalProps) {
    const { settings } = useSettings();
    const [cashReceived, setCashReceived] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCashReceived('');
            setIsProcessing(false);
        }
    }, [isOpen]);

    // Derived State
    const cashValue = parseFloat(cashReceived) || 0;
    const change = cashValue - total;
    const isValid = cashValue >= total;

    // Memoize quick amounts to avoid recalculating on every render
    const quickAmounts = useMemo(() => {
        const candidates = [
            Math.ceil(total / 100) * 100,
            Math.ceil(total / 500) * 500,
            Math.ceil(total / 1000) * 1000,
        ];
        // Ensure unique and relevant values (>= total)
        return Array.from(new Set(candidates)).filter(val => val >= total).sort((a, b) => a - b);
    }, [total]);

    const handleConfirm = async () => {
        if (!isValid || isProcessing) return;

        setIsProcessing(true);
        try {
            await onConfirm(cashValue);
        } catch (error) {
            console.error("Payment failed:", error);
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    // Calculate base width (e.g. 512px for max-w-lg) and apply scaling
    const scale = (settings?.payment_modal_scale || 100) / 100;
    const fontScale = (settings?.payment_modal_font_scale || 100) / 100;
    const baseWidth = 512; // approx 32rem
    const scaledWidth = `${baseWidth * scale}px`;

    return (
        <div
            className="payment-modal-overlay"
            role="dialog"
            aria-modal="true"
            style={{ fontSize: `${fontScale}rem` }}
        >
            <div
                className="payment-modal-content"
                style={{ maxWidth: scaledWidth, width: '100%' }}
            >
                <SelectableOverlay id="payment_modal_scale" />
                <ModalHeader onClose={onClose} />

                <div className="p-4 lg:p-5 space-y-4 lg:space-y-5 overflow-y-auto custom-scrollbar">
                    {/* Compact Summary Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                            <AmountSummary total={total} currency={currency} />
                        </div>
                        <div className="h-full">
                            <ChangeDisplay change={change} isValid={isValid} currency={currency} />
                        </div>
                    </div>

                    <CashInput
                        value={cashReceived}
                        onChange={setCashReceived}
                        quickAmounts={quickAmounts}
                        currency={currency}
                        numpadHeight={settings?.payment_numpad_height}
                    />
                </div>

                <PaymentFooter
                    isValid={isValid}
                    isProcessing={isProcessing}
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
}

