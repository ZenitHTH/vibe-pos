"use client";

import React, { useEffect } from "react";
import { useMockup } from "@/context/MockupContext";
import POSClient from "@/components/POSClient";
import Sidebar from "@/components/Sidebar";
import BottomControlPanel from "@/components/design-mode/BottomControlPanel";
import { FaSave, FaArrowRight } from "react-icons/fa";
import { exampleProducts } from "@/lib/example-data";

interface DesignModeWrapperProps {
    onNext: () => void;
}

export default function DesignModeWrapper({ onNext }: DesignModeWrapperProps) {
    const { isMockupMode, toggleMockupMode } = useMockup();

    useEffect(() => {
        if (!isMockupMode) {
            toggleMockupMode();
        }
    }, [isMockupMode, toggleMockupMode]);

    return (
        <div className="relative min-h-screen w-full bg-background flex flex-row overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* The POS Interface in Mockup Mode */}
                <div className="flex-1 relative z-0 overflow-hidden">
                    <POSClient initialProducts={exampleProducts} />
                </div>

                {/* Floating Action Button for Next Step */}
                <div className="fixed bottom-32 right-8 z-50 animate-bounce-subtle">
                    <button
                        onClick={onNext}
                        className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-green-500/30 transition-all transform hover:scale-105"
                    >
                        <FaSave />
                        Save & Continue
                        <FaArrowRight />
                    </button>
                </div>

                {/* Design Controls */}
                <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
                    <div className="pointer-events-auto">
                        <BottomControlPanel hideSaveButton={true} forceVisible={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}
