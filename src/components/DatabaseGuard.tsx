"use client";

import React, { useState } from "react";
import { useDatabase } from "../context/DatabaseContext";
import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import UISetupMode from "./UISetupMode";
import SetupWizard from "./SetupWizard";

type SetupStep = 'welcome' | 'ui-setup' | 'wizard' | 'complete';

export default function DatabaseGuard({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, dbExists } = useDatabase();
    const [setupStep, setSetupStep] = useState<SetupStep>('welcome');

    if (dbExists === null) {
        return <div className="flex h-screen items-center justify-center bg-gray-50">Loading...</div>;
    }

    if (!dbExists) {
        switch (setupStep) {
            case 'welcome':
                return <WelcomeScreen onStart={() => setSetupStep('ui-setup')} />;
            case 'ui-setup':
                return <UISetupMode onNext={() => setSetupStep('wizard')} />;
            case 'wizard':
                // The wizard handles the final connection via PasswordSetupScreen -> login()
                // Once login() succeeds, standard DB checks will pass and re-render standard flow
                return <SetupWizard onComplete={() => { }} />;
            default:
                return <WelcomeScreen onStart={() => setSetupStep('ui-setup')} />;
        }
    }

    if (!isLoggedIn) {
        return <LoginScreen />;
    }

    return <>{children}</>;
}
