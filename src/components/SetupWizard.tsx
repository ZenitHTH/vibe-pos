"use client";

import React, { useState } from "react";
import ManagementPageLayout from "./layout/ManagementPageLayout";
import CurrencySettings from "./settings/CurrencySettings";
import TaxSettings from "./settings/TaxSettings";
import PasswordSetupScreen from "./PasswordSetupScreen";
import { FaArrowRight, FaCheck } from "react-icons/fa";

interface SetupWizardProps {
    onComplete: () => void;
}

export default function SetupWizard({ onComplete }: SetupWizardProps) {
    const [step, setStep] = useState<number>(1);
    const TOTAL_STEPS = 3;

    const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">Step 1: Regional Settings</h3>
                            <p className="text-blue-700">Set your local currency to ensure correct displaying of prices.</p>
                        </div>
                        <CurrencySettings />
                    </div>
                );
            case 2:
                return (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">Step 2: Tax Configuration</h3>
                            <p className="text-blue-700">Configure value-added tax (VAT) or sales tax for your region.</p>
                        </div>
                        <TaxSettings />
                    </div>
                );
            case 3:
                return (
                    <div className="max-w-md mx-auto">
                        <PasswordSetupScreen />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <ManagementPageLayout
            title="System Setup"
            subtitle={`Step ${step} of ${TOTAL_STEPS}`}
            scaleKey="setting_page_scale"
        >
            <div className="my-8">
                {/* Progress Indicators */}
                <div className="flex justify-center mb-12 gap-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= s ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-gray-200 text-gray-400"
                                    }`}
                            >
                                {step > s ? <FaCheck /> : s}
                            </div>
                            {s < 3 && (
                                <div className={`w-16 h-1 mx-2 rounded-full ${step > s ? "bg-blue-600" : "bg-gray-200"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {renderStepContent()}

                {/* Navigation Buttons */}
                {step < TOTAL_STEPS && (
                    <div className="max-w-2xl mx-auto flex justify-between mt-12 pt-8 border-t border-gray-100">
                        <button
                            onClick={prevStep}
                            disabled={step === 1}
                            className={`px-6 py-3 rounded-xl font-medium transition-colors ${step === 1 ? "opacity-0 cursor-default" : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            Back
                        </button>

                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:translate-x-1"
                        >
                            Next Step <FaArrowRight />
                        </button>
                    </div>
                )}
            </div>
        </ManagementPageLayout>
    );
}
