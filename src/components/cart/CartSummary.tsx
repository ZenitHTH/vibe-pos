import { memo } from "react";
import { CardFooter } from "@/components/ui/Card";
import { Customer } from "@/lib";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  onCheckout: () => void;
  customers: Customer[];
  selectedCustomerId?: number;
  onCustomerSelect: (id: number | undefined) => void;
}

const CartSummary = memo(function CartSummary({
  subtotal,
  tax,
  total,
  currency,
  onCheckout,
  customers,
  selectedCustomerId,
  onCustomerSelect,
}: CartSummaryProps) {
  return (
    <CardFooter className="bg-card text-card-foreground border-border z-10 mt-auto flex-col items-stretch border-t p-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="mb-4">
        <label className="text-sm font-medium text-muted-foreground mb-1 block">Customer / Company</label>
        <select
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={selectedCustomerId || ""}
          onChange={(e) => onCustomerSelect(e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">General Customer (Walk-in)</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} {c.tax_id ? `(${c.tax_id})` : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 space-y-3">
        <div className="text-muted-foreground flex justify-between">
          <span>Subtotal</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="text-muted-foreground flex justify-between">
          <span>Tax (7%)</span>
          <span>
            {currency}
            {tax.toFixed(2)}
          </span>
        </div>
        <div className="text-foreground border-border flex justify-between border-t border-dashed pt-3 text-[1.5em] font-bold">
          <span>Total</span>
          <span className="text-primary">
            {currency}
            {total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[1.125em] font-bold shadow-lg transition-all active:scale-[0.98]"
      >
        Checkout Now
      </button>
    </CardFooter>
  );
});

export default CartSummary;
