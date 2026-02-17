import { CartItem as CartItemType } from "../../types";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { convertFileSrc } from "@tauri-apps/api/core";

interface CartItemProps {
  item: CartItemType;
  currency: string;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  currency,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const imageSrc = item.image
    ? item.image.startsWith("http")
      ? item.image
      : convertFileSrc(item.image)
    : null;

  return (
    <div className="bg-background border-border group hover:border-primary/30 flex items-center gap-4 rounded-xl border p-3 transition-colors">
      <div
        className="border-border bg-muted/20 relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border"
        style={{
          backgroundColor: !imageSrc ? item.color || "#e2e8f0" : undefined,
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-muted absolute inset-0 flex items-center justify-center text-lg font-bold opacity-20">
            {item.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-foreground truncate font-medium">{item.name}</h4>
        <div className="text-primary font-bold">
          {currency}
          {(item.price * item.quantity).toFixed(2)}
        </div>
      </div>

      <div className="bg-card border-border flex items-center gap-3 rounded-lg border p-1">
        <button
          onClick={() => onUpdateQuantity(item.id, -1)}
          className="hover:bg-muted/20 text-muted hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors"
        >
          <FaMinus size={10} />
        </button>
        <span className="w-4 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, 1)}
          className="hover:bg-muted/20 text-muted hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors"
        >
          <FaPlus size={10} />
        </button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-muted/50 ml-1 flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );
}
