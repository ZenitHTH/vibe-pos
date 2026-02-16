import { memo } from "react";
import { formatCurrency } from "./utils";

interface AmountSummaryProps {
  total: number;
  currency: string;
}

const AmountSummary = memo(({ total, currency }: AmountSummaryProps) => (
  <div className="space-y-1 text-center">
    <p className="text-muted text-sm font-semibold tracking-wider uppercase">
      Total Amount
    </p>
    <div className="text-primary text-4xl font-bold">
      {formatCurrency(total, currency)}
    </div>
  </div>
));

AmountSummary.displayName = "AmountSummary";

export default AmountSummary;
