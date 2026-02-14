"use client";

import React from "react";
import { FaPlay } from "react-icons/fa";

interface WelcomeScreenProps {
    onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
    return (
        <div className="page-container">
            <div className="card-container">
                <div className="icon-box-lg">
                    <span className="text-4xl font-black text-primary-foreground">POS</span>
                </div>

                <h1 className="hero-title">
                    Simple POS
                </h1>

                <p className="hero-subtitle">
                    A modern, lightweight point of sale system designed for performance and simplicity.
                </p>

                <button
                    onClick={onStart}
                    className="btn-hero"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-3">
                        Start Setup
                        <FaPlay className="text-sm group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            </div>

            <p className="meta-text">
                v0.1.0 • Built with Tauri v2 & Next.js 16
            </p>
        </div>
    );
}
