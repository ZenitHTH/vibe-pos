"use client";

import React from "react";
import { FaArrowRight, FaDesktop } from "react-icons/fa";
import POSClient from "../pos/POSClient";
import { exampleProducts } from "@/lib/example-data";

interface UISetupModeProps {
    onNext: () => void;
}

export default function UISetupMode({ onNext }: UISetupModeProps) {
    return (
        <div className="relative min-h-screen w-full bg-background overflow-hidden">
            {/* Preview Layer - Rendering static POS interface as background */}
            <div className="absolute inset-0 opacity-50 pointer-events-none grayscale-[0.3] blur-[2px] transform scale-[0.98]">
                <POSClient initialProducts={exampleProducts} />
            </div>

            {/* Content Layer */}
            <div className="relative z-50 min-h-screen flex flex-col items-center justify-center p-4">
                <div className="bg-background/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-border/50 max-w-2xl text-center animate-in fade-in zoom-in duration-500">
                    <div className="icon-box-md">
                        <FaDesktop size={40} />
                    </div>
                    <h2 className="hero-title">Customize Your Experience</h2>
                    <p className="hero-subtitle">
                        We will now enter <strong>Design Mode</strong>. You can adjust the interface scaling, font sizes, and layout density to perfectly match your screen.
                    </p>

                    <button
                        onClick={onNext}
                        className="btn-primary-lg"
                    >
                        Enter Design Mode <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
