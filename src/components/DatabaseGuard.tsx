"use client";

import React from "react";
import { useDatabase } from "../context/DatabaseContext";
import LoginScreen from "./LoginScreen";
import SetupScreen from "./SetupScreen";

export default function DatabaseGuard({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, dbExists } = useDatabase();

    if (dbExists === null) {
        return <div className="flex h-screen items-center justify-center bg-gray-50">Loading...</div>;
    }

    if (!dbExists) {
        return <SetupScreen />;
    }

    if (!isLoggedIn) {
        return <LoginScreen />;
    }

    return <>{children}</>;
}
