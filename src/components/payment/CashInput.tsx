import { memo } from "react";
import { formatCurrency } from "./utils";
import VirtualNumpad from "./VirtualNumpad";

interface CashInputProps {
  value: string;
  onChange: (val: string) => void;
  quickAmounts: number[];
  currency: string;
  numpadHeight?: number;
}

const CashInput = memo(
  ({
    value,
    onChange,
    quickAmounts,
    currency,
    numpadHeight,
  }: CashInputProps) => {
    const handleKeyPress = (key: string) => {
      // Prevent multiple dots
      if (key === "." && value.includes(".")) return;

      // Prevent multiple leading zeros (unless it's 0.)
      if (value === "0" && key !== ".") {
        onChange(key);
        return;
      }

      // Limit decimal places to 2
      if (value.includes(".")) {
        const [, decimals] = value.split(".");
        if (decimals && decimals.length >= 2) return;
      }

      onChange(value + key);
    };

    const handleBackspace = () => {
      onChange(value.slice(0, -1));
    };

    const handleClear = () => {
      onChange("");
    };

    return (
      <div className="space-y-2 lg:space-y-3">
        <label
          htmlFor="cash-input"
          className="text-foreground block text-sm font-medium"
        >
          Cash Received
        </label>

        {/* Input Display (Read-only as we use numpad) */}
        <div className="relative">
          <span className="text-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-bold">
            {currency}
          </span>
          <input
            id="cash-input"
            type="text"
            readOnly
            value={value}
            className="bg-muted/5 border-border focus:border-primary focus:ring-primary/10 w-full cursor-default rounded-xl border-2 py-3 pr-4 pl-8 text-right text-2xl font-bold transition-all outline-none focus:ring-4 lg:text-3xl"
            placeholder="0.00"
          />
        </div>

        {/* Quick Suggestions */}
        <div className="flex flex-wrap gap-2">
          {quickAmounts.map((amount) => (
            <button
              key={`quick-${amount}`}
              onClick={() => onChange(amount.toString())}
              className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 rounded-xl border px-4 py-2 text-sm font-bold transition-colors"
            >
              {formatCurrency(amount, currency)}
            </button>
          ))}
        </div>

        {/* Virtual Numpad */}
        <VirtualNumpad
          onPress={handleKeyPress}
          onBackspace={handleBackspace}
          onClear={handleClear}
          height={numpadHeight}
        />
      </div>
    );
  },
);

CashInput.displayName = "CashInput";

export default CashInput;
