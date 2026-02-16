import { memo } from "react";
import { formatCurrency } from "./utils";

interface ChangeDisplayProps {
  change: number;
  isValid: boolean;
  currency: string;
}

const ChangeDisplay = memo(
  ({ change, isValid, currency }: ChangeDisplayProps) => (
    <div
      className={`flex h-full flex-col justify-center rounded-xl border p-4 ${isValid ? "border-green-500/20 bg-green-500/10" : "bg-muted/5 border-border"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-muted font-medium">Change Due</span>
        <span
          className={`text-2xl font-bold ${isValid ? "text-green-600" : "text-muted"}`}
        >
          {formatCurrency(Math.max(0, change), currency)}
        </span>
      </div>
    </div>
  ),
);

ChangeDisplay.displayName = "ChangeDisplay";

export default ChangeDisplay;
