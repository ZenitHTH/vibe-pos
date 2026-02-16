"use client";

import { usePOSLogic } from "@/hooks/usePOSLogic";
import { Product } from "@/types";
import { useSettings } from "@/context/SettingsContext";
import POSHeader from "./POSHeader";
import POSProductGrid from "./POSProductGrid";
import SelectableOverlay from "../design-mode/SelectableOverlay";
import Cart from "../cart/Cart";
import PaymentModal from "../payment/PaymentModal";

interface POSClientProps {
  initialProducts?: Product[];
}

export default function POSClient({ initialProducts = [] }: POSClientProps) {
  const { settings } = useSettings();
  const {
    productsSource,
    categories,
    selectedCategory,
    handleCategoryChange,
    searchQuery,
    handleSearchChange,
    cartItems,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemove,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    handleCheckout,
    handleConfirmPayment,
    currency,
    cartTotal,
  } = usePOSLogic(initialProducts);

  // Calculate Cart Width
  const cartBaseWidth = 320; // w-80

  const cartDynamicWidth = `${cartBaseWidth * ((settings?.cart_scale || 100) / 100)}px`;

  return (
    <div className="bg-background box-border flex h-full gap-4 overflow-hidden p-4">
      {/* Left Side: Product Grid */}
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <POSHeader />

        <POSProductGrid
          products={productsSource}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          settings={settings}
          onAddToCart={handleAddToCart}
          currency={currency}
        />
      </div>

      {/* Right Side: Cart Sidebar */}
      <div
        className="relative hidden h-full shrink-0 transition-all duration-300 lg:block"
        style={{
          width: cartDynamicWidth,
          fontSize: `${settings?.cart_font_scale || 100}%`,
        }}
      >
        <SelectableOverlay id="cart_scale" />
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
          onCheckout={handleCheckout}
          currency={currency}
        />
      </div>

      {/* ... Modals ... */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={cartTotal}
        onConfirm={handleConfirmPayment}
        currency={currency}
      />
    </div>
  );
}
