import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartItem, Product } from "@/types";
import { categoryApi, receiptApi } from "@/lib/api";
import { useCurrency } from "./useCurrency";
import { useTax } from "./useTax";
import { exampleProducts, exampleCartItems } from "@/lib/example-data";
import { useMockup } from "@/context/MockupContext";
import { useDatabase } from "@/context/DatabaseContext";

/**
 * Custom hook to manage Point of Sale (POS) logic.
 * Handles product selection, cart management, and payment processing.
 *
 * @param initialProducts - List of products available for sale.
 * @returns Object containing cart state, handlers, and current currency/tax settings.
 */
export function usePOSLogic(initialProducts: Product[]) {
  const { isMockupMode, mockupView, setMockupView } = useMockup();
  const { dbKey } = useDatabase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrency();
  const { taxRate } = useTax();

  // Determine which products to use
  const productsSource = isMockupMode ? exampleProducts : initialProducts;

  // URL State
  const selectedCategory = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("search") || "";

  // Local State (Cart)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (!dbKey) return;
    categoryApi
      .getAll(dbKey)
      .then((data) => {
        setCategories(["All", ...data.map((c) => c.name)]);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
      });
  }, [dbKey]);

  // Effect to handle mockup mode cart items
  useEffect(() => {
    if (isMockupMode) {
      setCartItems(exampleCartItems);
    } else {
      setCartItems([]);
    }
  }, [isMockupMode]);

  // Effect to view syncing
  useEffect(() => {
    if (isMockupMode) {
      if (mockupView === "payment") {
        setIsPaymentModalOpen(true);
      } else {
        setIsPaymentModalOpen(false);
      }
    }
  }, [isMockupMode, mockupView]);

  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (category: string) => {
    updateURL("category", category);
  };

  const handleSearchChange = (query: string) => {
    updateURL("search", query);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = async (cashReceived: number) => {
    if (!dbKey) return;
    try {
      // 1. Create Invoice Header
      // calls the receipt API to create a new invoice in the database
      const receiptList = await receiptApi.createInvoice(dbKey);
      // Invoice created successfully

      // 2. Add Items
      // Iterates through cart items and adds them to the invoice
      for (const item of cartItems) {
        await receiptApi.addInvoiceItem(
          dbKey,
          receiptList.receipt_id,
          item.id,
          item.quantity,
        );
      }

      // 3. Success Feedback
      const total =
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) *
        (1 + taxRate);
      const change = cashReceived - total;
      alert(`Payment Successful!\nChange: ${currency}${change.toFixed(2)}`);

      // 4. Reset
      setCartItems([]);
      setIsPaymentModalOpen(false);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const cartTotal =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) *
    (1 + taxRate);

  const handleSetIsPaymentModalOpen = (isOpen: boolean) => {
    setIsPaymentModalOpen(isOpen);
    if (!isOpen && isMockupMode) {
      setMockupView("default");
    }
  };

  return {
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
    setIsPaymentModalOpen: handleSetIsPaymentModalOpen,
    handleCheckout,
    handleConfirmPayment,
    currency,
    cartTotal,
  };
}
