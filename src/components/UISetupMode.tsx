"use client";

import React from "react";
import { FaArrowRight, FaDesktop } from "react-icons/fa";
import BottomControlPanel from "./design-mode/BottomControlPanel";
import { useMockup } from "@/context/MockupContext";
// Import a mockup or placeholder POS layout for preview
import POSClient from "./POSClient";

interface UISetupModeProps {
    onNext: () => void;
}

export default function UISetupMode({ onNext }: UISetupModeProps) {
    const { isMockupMode, toggleMockupMode } = useMockup();

    // Ensure we are in mockup mode to show controls
    React.useEffect(() => {
        if (!isMockupMode) {
            toggleMockupMode();
        }
        // Cleanup: disable mockup mode when leaving if desired, 
        // but might want to keep settings active.
    }, [isMockupMode, toggleMockupMode]);

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Preview Layer - Rendering the actual POS interface or a Mockup */}
            <div className="opacity-50 pointer-events-none grayscale-[0.5] blur-[1px] transform scale-[0.98] origin-top transition-all duration-500">
                <POSClient initialProducts={[]} />
            </div>

            {/* Overlay for Context */}
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm pointer-events-none"></div>

            {/* Content Layer */}
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
                <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50 max-w-2xl text-center mb-32">
                    <div className="inline-flex p-4 bg-blue-100 text-blue-600 rounded-2xl mb-6">
                        <FaDesktop size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Customize Your Display</h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
                        Use the toolbar at the bottom to adjust interface scaling, font sizes, and layout density to match your screen.
                    </p>

                    <button
                        onClick={onNext}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 mx-auto"
                    >
                        Looks Good, Next Step <FaArrowRight />
                    </button>
                </div>
            </div>

            {/* The Controls - these are fixed at bottom via the component itself */}
            <div className="z-[100] relative">
                <BottomControlPanel />
            </div>
        </div>
    );
}
