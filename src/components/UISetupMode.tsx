"use client";

import React from "react";
import { FaArrowRight, FaDesktop } from "react-icons/fa";
import POSClient from "./POSClient";
import { exampleProducts } from "@/lib/example-data";

interface UISetupModeProps {
    onNext: () => void;
}

export default function UISetupMode({ onNext }: UISetupModeProps) {
    return (
        <div className="relative min-h-screen w-full bg-gray-100 overflow-hidden">
            {/* Preview Layer - Rendering static POS interface as background */}
            <div className="absolute inset-0 opacity-50 pointer-events-none grayscale-[0.3] blur-[2px] transform scale-[0.98]">
                <POSClient initialProducts={exampleProducts} />
            </div>

            {/* Content Layer */}
            <div className="relative z-50 min-h-screen flex flex-col items-center justify-center p-4">
                <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/50 max-w-2xl text-center animate-in fade-in zoom-in duration-500">
                    <div className="inline-flex p-5 bg-blue-100 text-blue-600 rounded-2xl mb-8 shadow-inner">
                        <FaDesktop size={40} />
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Customize Your Experience</h2>
                    <p className="text-gray-600 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
                        We will now enter <strong>Design Mode</strong>. You can adjust the interface scaling, font sizes, and layout density to perfectly match your screen.
                    </p>

                    <button
                        onClick={onNext}
                        className="group bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-500/30 transition-all transform hover:scale-105 hover:translate-y-[-2px] flex items-center gap-3 mx-auto"
                    >
                        Enter Design Mode <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
