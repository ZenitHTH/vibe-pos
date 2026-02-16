"use client";

import { useCurrency } from "@/hooks/useCurrency";
import { FaCoins } from "react-icons/fa";
import SettingsSection from "@/components/ui/SettingsSection";

export const CURRENCIES = [
  { country: "United States", code: "USD", symbol: "$" },
  { country: "United Kingdom", code: "GBP", symbol: "£" },
  { country: "European Union", code: "EUR", symbol: "€" },
  { country: "Thailand", code: "THB", symbol: "฿" },
  { country: "Japan", code: "JPY", symbol: "¥" },
  { country: "South Korea", code: "KRW", symbol: "₩" },
  { country: "China", code: "CNY", symbol: "¥" },
  { country: "India", code: "INR", symbol: "₹" },
  { country: "Russia", code: "RUB", symbol: "₽" },
  { country: "Brazil", code: "BRL", symbol: "R$" },
  { country: "Vietnam", code: "VND", symbol: "₫" },
  { country: "Laos", code: "LAK", symbol: "₭" },
  { country: "Cambodia", code: "KHR", symbol: "៛" },
  { country: "Indonesia", code: "IDR", symbol: "Rp" },
  { country: "Malaysia", code: "MYR", symbol: "RM" },
  { country: "Singapore", code: "SGD", symbol: "S$" },
  { country: "Philippines", code: "PHP", symbol: "₱" },
  { country: "Australia", code: "AUD", symbol: "A$" },
  { country: "Canada", code: "CAD", symbol: "C$" },
];

export default function CurrencySettings() {
  const { currency, updateCurrency } = useCurrency();

  return (
    <SettingsSection title="Currency Settings" icon={FaCoins}>
      {/* Currency Selection */}
      <div>
        <label className="text-foreground mb-2 block text-sm font-medium">
          Select Country / Currency
        </label>
        <div className="flex gap-2">
          <select
            value={
              CURRENCIES.find((c) => c.symbol === currency)?.code || "CUSTOM"
            }
            onChange={(e) => {
              const selected = CURRENCIES.find(
                (c) => c.code === e.target.value,
              );
              if (selected) {
                updateCurrency(selected.symbol);
              }
            }}
            className="bg-background border-border focus:ring-primary/50 text-foreground w-full cursor-pointer appearance-none rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.country} ({c.code}) - {c.symbol}
              </option>
            ))}
            {/* Option for custom/unknown symbols */}
            {!CURRENCIES.some((c) => c.symbol === currency) && (
              <option value="CUSTOM">Custom ({currency})</option>
            )}
          </select>
        </div>
        <p className="text-muted-foreground mt-2 text-xs">
          Select your region to automatically set the currency symbol (
          {currency}).
        </p>
      </div>

      {/* Warning Modal */}
    </SettingsSection>
  );
}
