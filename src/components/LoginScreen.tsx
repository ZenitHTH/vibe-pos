"use client";

import React, { useState } from "react";
import { useDatabase } from "../context/DatabaseContext";

export default function LoginScreen() {
    const { login, isLoading } = useDatabase();
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(password);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : String(err) || "Failed to login");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
            <div className="bg-card text-card-foreground p-8 rounded-lg shadow-md w-96 border border-border">
                <h1 className="text-2xl font-bold mb-6 text-center text-foreground">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                            Database Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                            placeholder="Enter password"
                            autoFocus
                        />
                    </div>
                    {error && <div className="text-destructive text-sm">{error}</div>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-primary-foreground font-medium ${isLoading
                            ? "bg-primary/50 cursor-not-allowed"
                            : "bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            }`}
                    >
                        {isLoading ? "Connecting..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
