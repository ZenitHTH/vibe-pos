"use client";

import React, { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { FaCheck, FaCog } from "react-icons/fa";

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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
                <div className="text-center mb-8">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCog className="text-blue-600 text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Final Touches</h1>
                    <p className="text-gray-500">Configure your regional settings.</p>
                </div>

                <div className="space-y-8">
                    {/* Currency Section */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            Currency
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Currency Symbol
                            </label>
                            <input
                                type="text"
                                value={settings.currency_symbol}
                                onChange={(e) => updateSettings({ currency_symbol: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="$"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Symbol displayed next to prices (e.g., $, €, £, ¥)
                            </p>
                        </div>
                    </div>

                    {/* Tax Section */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            Tax Configuration
                        </h3>
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={settings.tax_enabled}
                                    onChange={(e) => updateSettings({ tax_enabled: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="font-medium text-gray-900">Enable Tax Calculation</span>
                            </label>

                            {settings.tax_enabled && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tax Rate (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.tax_rate}
                                        onChange={(e) => updateSettings({ tax_rate: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                        className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 ${saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
