"use client";

import { useTheme } from "next-themes";
import { FaPalette, FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import SettingsSection from "@/components/ui/SettingsSection";
import { useEffect, useState } from "react";

export default function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SettingsSection title="Appearance" icon={FaPalette}>
      <div className="space-y-4">
        <div>
          <label className="text-muted-foreground mb-2 block text-sm font-medium">
            Theme Preference
          </label>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center justify-center rounded-xl border p-4 transition-all ${
                theme === "light"
                  ? "bg-primary/10 border-primary text-primary ring-primary/20 ring-2"
                  : "bg-card border-border hover:bg-muted/10 text-muted-foreground"
              }`}
            >
              <FaSun className="mb-2 text-2xl" />
              <span className="font-medium">Light</span>
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center justify-center rounded-xl border p-4 transition-all ${
                theme === "dark"
                  ? "bg-primary/10 border-primary text-primary ring-primary/20 ring-2"
                  : "bg-card border-border hover:bg-muted/10 text-muted-foreground"
              }`}
            >
              <FaMoon className="mb-2 text-2xl" />
              <span className="font-medium">Dark</span>
            </button>

            <button
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center justify-center rounded-xl border p-4 transition-all ${
                theme === "system"
                  ? "bg-primary/10 border-primary text-primary ring-primary/20 ring-2"
                  : "bg-card border-border hover:bg-muted/10 text-muted-foreground"
              }`}
            >
              <FaDesktop className="mb-2 text-2xl" />
              <span className="font-medium">System</span>
            </button>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Choose a theme for the application. System theme will match your
          operating system&apos;s preference.
        </p>
      </div>
    </SettingsSection>
  );
}
