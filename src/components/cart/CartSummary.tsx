interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  onCheckout: () => void;
}

export default function CartSummary({
  subtotal,
  tax,
  total,
  currency,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="bg-card text-card-foreground border-border z-10 mt-auto border-t p-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
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
        className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[1.125em] font-bold shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 active:scale-[0.98]"
      >
        Checkout Now
      </button>
    </div>
  );
}
