"use client";

import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { FaTrash } from 'react-icons/fa';

export default function ResetSettingsButton() {
    const { resetToDefault } = useSettings();
    const [showWarning, setShowWarning] = useState(false);

    const handleResetDefaults = () => {
        resetToDefault();
        setShowWarning(false);
    };

    return (
        <>
            <button
                onClick={() => setShowWarning(true)}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
            >
                <FaTrash size={14} />
                Reset to Default
            </button>

            {/* Warning Modal */}
            {showWarning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-card-bg w-full max-w-sm rounded-xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in duration-200 p-6">
                        <h3 className="text-lg font-bold text-red-500 mb-2">Warning: Reset Settings</h3>
                        <p className="text-muted mb-6">
                            Are you sure you want to reset all settings to their defaults? You will need to click &apos;Save Changes&apos; to persist this action.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowWarning(false)}
                                className="px-4 py-2 rounded-lg text-foreground hover:bg-muted/10 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResetDefaults}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors shadow-lg shadow-red-500/20"
                            >
                                Yes, Reset
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
