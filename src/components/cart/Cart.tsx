import { CartItem as CartItemType } from "@/types";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartEmpty from "./CartEmpty";
import { useTax } from "@/hooks/useTax";

interface CartProps {
  items: CartItemType[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  currency: string;
}

export default function Cart({
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  currency,
}: CartProps) {
  const { taxRate } = useTax();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="bg-card text-card-foreground border-border sticky top-4 flex h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-2xl border shadow-xl">
      <div className="border-border bg-card/50 z-10 border-b p-6 backdrop-blur-sm">
        <h2 className="flex items-center gap-3 text-[1.5em] font-bold">
          <span className="text-primary">Current Order</span>
          <span className="text-muted-foreground bg-muted/20 rounded-full px-3 py-1 text-[0.875em] font-normal">
            {items.reduce((acc, item) => acc + item.quantity, 0)} items
          </span>
        </h2>
      </div>

      <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto p-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            currency={currency}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>

      <CartSummary
        subtotal={subtotal}
        tax={tax}
        total={total}
        currency={currency}
        onCheckout={onCheckout}
      />
    </div>
  );
}
