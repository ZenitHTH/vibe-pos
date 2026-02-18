import { CartItem as CartItemType } from "../../types";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { convertFileSrc } from "@tauri-apps/api/core";

interface CartItemProps {
  item: CartItemType;
  currency: string;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  /** Override font sizes & padding (from tuner or settings) */
  itemFontSize?: number;
  headerFontSize?: number;
  priceFontSize?: number;
  itemPadding?: number;
}

export default function CartItem({
  item,
  currency,
  onUpdateQuantity,
  onRemove,
  itemFontSize,
  headerFontSize,
  priceFontSize,
  itemPadding,
}: CartItemProps) {
  const imageSrc = item.image
    ? item.image.startsWith("http")
      ? item.image
      : convertFileSrc(item.image)
    : null;

  // Build dynamic styles from props (percentages → em scale, padding → px)
  const containerStyle: React.CSSProperties = {
    ...(itemFontSize != null && itemFontSize !== 100
      ? { fontSize: `${itemFontSize}%` }
      : {}),
    ...(itemPadding != null ? { padding: `${itemPadding}px` } : {}),
  };

  const headerStyle: React.CSSProperties =
    headerFontSize != null && headerFontSize !== 100
      ? { fontSize: `${headerFontSize}%` }
      : {};

  const priceStyle: React.CSSProperties =
    priceFontSize != null && priceFontSize !== 100
      ? { fontSize: `${priceFontSize}%` }
      : {};

  return (
    <div
      className="bg-background rounded-lg border border-border overflow-hidden group hover:border-primary/30 transition-colors"
      style={containerStyle}
    >
      {/* Top row: image + info + delete */}
      <div className="flex items-center gap-3 p-2.5">
        {/* Thumbnail */}
        <div
          className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-border/50"
          style={{
            backgroundColor: !imageSrc ? item.color || "#e2e8f0" : undefined,
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted font-bold text-[1em] opacity-30">
              {item.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Name + Price */}
        <div className="min-w-0 flex-1">
          <h4
            className="text-foreground text-[0.875em] font-medium truncate leading-tight"
            style={headerStyle}
          >
            {item.name}
          </h4>
          <div
            className="text-primary text-[1em] font-bold mt-0.5"
            style={priceStyle}
          >
            {currency}
            {(item.price * item.quantity).toFixed(2)}
          </div>
        </div>

        {/* Delete — touch-friendly 44px target */}
        <button
          onClick={() => onRemove(item.id)}
          className="text-muted/40 hover:text-destructive active:text-destructive hover:bg-destructive/10 active:bg-destructive/15 w-11 h-11 flex items-center justify-center rounded-lg transition-colors shrink-0"
        >
          <FaTrash size={14} />
        </button>
      </div>

      {/* Bottom row: unit price + quantity controls */}
      <div className="flex items-center justify-between px-2.5 pb-2.5">
        <span className="text-[0.75em] text-muted-foreground">
          {currency}{item.price.toFixed(2)} each
        </span>
        <div className="flex items-center bg-card border border-border rounded-lg">
          <button
            onClick={() => onUpdateQuantity(item.id, -1)}
            className="w-11 h-11 flex items-center justify-center rounded-l-lg hover:bg-muted/20 active:bg-muted/30 text-muted hover:text-foreground transition-colors"
          >
            <FaMinus size={12} />
          </button>
          <span className="w-8 text-center text-[0.875em] font-semibold select-none">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="w-11 h-11 flex items-center justify-center rounded-r-lg hover:bg-muted/20 active:bg-muted/30 text-muted hover:text-foreground transition-colors"
          >
            <FaPlus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
