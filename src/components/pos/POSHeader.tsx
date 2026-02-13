"use client";

import { FaReceipt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import GlobalHeader from '../ui/GlobalHeader';

export default function POSHeader() {
    const router = useRouter();

    return (
        <GlobalHeader
            title="Simple POS"
            subtitle="Manage orders efficiently"
        >
            <button
                onClick={() => router.push('/history')}
                className="px-4 py-2 bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors font-medium text-sm flex items-center gap-2"
            >
                <FaReceipt /> History
            </button>
        </GlobalHeader>
    );
}
