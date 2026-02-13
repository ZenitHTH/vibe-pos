"use client";

import ExportSection from '@/components/settings/ExportSection';
import CurrencySettings from '@/components/settings/CurrencySettings';
import TaxSettings from '@/components/settings/TaxSettings';
import ThemeSettings from '@/components/settings/ThemeSettings';
import DisplaySettings from '@/components/settings/DisplaySettings';
import { useSettings } from '@/context/SettingsContext';
import { FaSave, FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import ResetSettingsButton from '@/components/settings/ResetSettingsButton';
import ManagementPageLayout from '@/components/layout/ManagementPageLayout';

export default function SettingPage() {
    const { save } = useSettings();
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const handleSave = async () => {
        setIsSaving(true);
        try {
            await save();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <ManagementPageLayout
            title="System Settings"
            subtitle="Configure your POS system settings here."
            headerActions={<ResetSettingsButton />}
            scaleKey="setting_page_scale"
            scrollable={true}
            floatingActions={
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${showSuccess
                        ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/20'
                        : 'bg-primary text-primary-foreground hover:opacity-90 shadow-primary/20'
                        }`}
                >
                    {showSuccess ? (
                        <>
                            <FaCheck />
                            Saved Successfully
                        </>
                    ) : (
                        <>
                            <FaSave />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </>
                    )}
                </button>
            }
        >
            {/* Theme Settings */}
            <ThemeSettings />

            {/* Display Settings */}
            <DisplaySettings />

            {/* Currency Settings */}
            <CurrencySettings />

            {/* Tax Settings */}
            <TaxSettings />

            {/* Export Section */}
            <ExportSection />
        </ManagementPageLayout>
    );
}
