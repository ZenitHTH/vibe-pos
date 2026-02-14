"use client";

import React, { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { FaCheck, FaCog } from "react-icons/fa";
import { CURRENCIES } from "./settings/CurrencySettings";

interface SettingsSetupProps {
    onComplete: () => void;
}

export default function SettingsSetup({ onComplete }: SettingsSetupProps) {
    const { settings, updateSettings, save } = useSettings();
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await save();
            onComplete();
        } catch (error) {
            console.error("Failed to save settings:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4">
            <div className="bg-card p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-border">
                <div className="text-center mb-8">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCog className="text-primary text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Final Touches</h1>
                    <p className="text-muted-foreground">Configure your regional settings.</p>
                </div>

                <div className="space-y-8">
                    {/* Currency Section */}
                    <div className="bg-muted/50 p-6 rounded-xl border border-border">
                        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            Currency
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                Currency Symbol
                            </label>
                            <select
                                value={CURRENCIES.find(c => c.symbol === settings.currency_symbol)?.code || "CUSTOM"}
                                onChange={(e) => {
                                    const selected = CURRENCIES.find(c => c.code === e.target.value);
                                    if (selected) {
                                        updateSettings({ currency_symbol: selected.symbol });
                                    }
                                }}
                                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background text-foreground appearance-none cursor-pointer"
                            >
                                {CURRENCIES.map((c) => (
                                    <option key={c.code} value={c.code} className="bg-background text-foreground">
                                        {c.country} ({c.code}) - {c.symbol}
                                    </option>
                                ))}
                                {!CURRENCIES.some(c => c.symbol === settings.currency_symbol) && (
                                    <option value="CUSTOM" className="bg-background text-foreground">Custom ({settings.currency_symbol})</option>
                                )}
                            </select>
                            <p className="text-xs text-muted-foreground mt-2">
                                Symbol displayed next to prices (e.g., $, €, £, ¥)
                            </p>
                        </div>
                    </div>

                    {/* Tax Section */}
                    <div className="bg-muted/50 p-6 rounded-xl border border-border">
                        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            Tax Configuration
                        </h3>
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border cursor-pointer hover:border-primary/50 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={settings.tax_enabled}
                                    onChange={(e) => updateSettings({ tax_enabled: e.target.checked })}
                                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                                />
                                <span className="font-medium text-foreground">Enable Tax Calculation</span>
                            </label>

                            {settings.tax_enabled && (
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Tax Rate (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.tax_rate}
                                        onChange={(e) => updateSettings({ tax_rate: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background text-foreground"
                                        placeholder="7.0"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`w-full py-4 px-6 rounded-xl text-primary-foreground font-bold text-lg shadow-lg shadow-primary/30 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 ${saving ? "bg-primary/70 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
                            }`}
                    >
                        {saving ? "Saving..." : "Finish Setup"}
                        {!saving && <FaCheck />}
                    </button>
                </div>
            </div>
        </div>
    );
}
