"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { FaSave, FaCheck } from "react-icons/fa";

export default function SaveSettingsButton() {
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
    <button
      onClick={handleSave}
      disabled={isSaving}
      className={`flex items-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg transition-all ${
        showSuccess
          ? "bg-success text-success-foreground shadow-success/20 hover:bg-success/90"
          : "bg-primary text-primary-foreground shadow-primary/20 hover:opacity-90"
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
          {isSaving ? "Saving..." : "Save Changes"}
        </>
      )}
    </button>
  );
}
