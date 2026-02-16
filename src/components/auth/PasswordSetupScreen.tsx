"use client";

import React, { useState } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import {
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaExclamationTriangle,
} from "react-icons/fa";
import { cn } from "@/lib/utils";

interface PasswordSetupScreenProps {
  onSuccess?: () => void;
}

export default function PasswordSetupScreen({
  onSuccess,
}: PasswordSetupScreenProps) {
  const { login, isLoading } = useDatabase();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await login(password);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : String(err) || "Failed to setup database",
      );
    }
  };

  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-card text-card-foreground border-border w-full max-w-md rounded-2xl border p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <FaShieldAlt className="text-primary text-2xl" />
          </div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">
            Create a secure password for your database to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-foreground mb-1 block text-sm font-medium">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-input focus:ring-primary/20 focus:border-primary bg-background focus:bg-card text-foreground w-full rounded-xl border px-4 py-3 pr-10 transition-all focus:ring-2 focus:outline-none"
                  placeholder="Enter a strong password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-foreground mb-1 block text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-input focus:ring-primary/20 focus:border-primary bg-background focus:bg-card text-foreground w-full rounded-xl border px-4 py-3 pr-10 transition-all focus:ring-2 focus:outline-none"
                  placeholder="Repeat your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive mb-4 flex items-center rounded-lg p-3 text-sm font-medium">
              <FaExclamationTriangle className="mr-2 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {(/[^\x00-\x7F]/.test(password) ||
            /[^\x00-\x7F]/.test(confirmPassword)) && (
            <div className="mb-4 flex items-center rounded-lg border border-yellow-200 bg-yellow-500/10 p-3 text-sm font-medium text-yellow-600">
              <FaExclamationTriangle className="mr-2 h-4 w-4 shrink-0" />
              Warning: detailed characters detected. Please check your keyboard
              language (English recommended).
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "text-primary-foreground shadow-primary/30 flex w-full transform items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-lg font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]",
              "bg-primary hover:bg-primary/90",
            )}
          >
            Next <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
