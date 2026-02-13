"use client";

import React from "react";
import { FaPlay } from "react-icons/fa";

interface WelcomeScreenProps {
    onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
    return (
        <div className="fixed inset-0 w-full flex flex-col items-center justify-center bg-gray-50 z-50 p-4">
            <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100 text-center transform transition-all hover:scale-[1.01] duration-500">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-3xl mx-auto mb-8 shadow-lg shadow-blue-500/30 flex items-center justify-center rotate-3 hover:rotate-6 transition-transform duration-500">
                    <span className="text-4xl font-black text-white">POS</span>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Simple POS
                </h1>

                <p className="text-gray-500 mb-10 text-lg leading-relaxed">
                    A modern, lightweight point of sale system designed for performance and simplicity.
                </p>

                <button
                    onClick={onStart}
                    className="group relative w-full py-4 px-6 rounded-2xl bg-gray-900 text-white font-bold text-lg shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-3">
                        Start Setup
                        <FaPlay className="text-sm group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            </div>

            <p className="mt-8 text-sm text-gray-400 font-medium">
                v0.1.0 • Built with Tauri v2 & Next.js 16
            </p>
        </div>
    );
}
