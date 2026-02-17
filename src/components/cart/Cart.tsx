import { CartItem as CartItemType } from "@/types";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartEmpty from "./CartEmpty";
import { useTax } from "@/hooks/useTax";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";

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
    <Card className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col overflow-hidden shadow-xl">
      <CardHeader className="bg-card/50 z-10 border-b backdrop-blur-sm">
        <CardTitle className="flex items-center gap-3 text-[1.5em] font-bold">
          <span className="text-primary">Current Order</span>
          <span className="text-muted-foreground bg-muted/20 rounded-full px-3 py-1 text-[0.875em] font-normal">
            {items.reduce((acc, item) => acc + item.quantity, 0)} items
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="scrollbar-thin flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
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
      </CardContent>

      <CartSummary
        subtotal={subtotal}
        tax={tax}
        total={total}
        currency={currency}
        onCheckout={onCheckout}
      />
    </Card>
  );
}
