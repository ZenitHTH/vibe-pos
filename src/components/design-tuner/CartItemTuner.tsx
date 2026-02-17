"use client";

import { useState } from "react";
import CartItem from "@/components/cart/CartItem";

const SAMPLE_ITEMS = [
    {
        id: 1,
        name: "Latte Hot",
        price: 55,
        category: "Coffee",
        image: "",
        color: "#8B5E3C",
        quantity: 2,
    },
    {
        id: 2,
        name: "Green Tea Matcha Frappe",
        price: 75,
        category: "Tea",
        image: "",
        color: "#4A7C59",
        quantity: 1,
    },
    {
        id: 3,
        name: "Croissant",
        price: 45,
        category: "Bakery",
        image: "",
        color: "#D4A574",
        quantity: 3,
    },
];

export function CartItemTuner() {
    const [items, setItems] = useState(SAMPLE_ITEMS);

    const handleUpdateQuantity = (id: number, delta: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item,
            ),
        );
    };

    const handleRemove = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        // Reset after a moment so items come back
        setTimeout(() => setItems(SAMPLE_ITEMS), 1500);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
            <div>
                <h2 className="mb-2 text-3xl font-bold">Cart Item</h2>
                <p className="text-muted-foreground">
                    Preview the cart item component at different scales.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Interactive Preview */}
                <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold">Interactive Preview</h3>
                    <div className="space-y-2">
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                currency="฿"
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                </div>

                {/* Compact / Large previews */}
                <div className="space-y-6">
                    <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold">
                            Small Scale (80%)
                        </h3>
                        <div style={{ fontSize: "80%" }}>
                            <CartItem
                                item={SAMPLE_ITEMS[0]}
                                currency="฿"
                                onUpdateQuantity={() => { }}
                                onRemove={() => { }}
                            />
                        </div>
                    </div>

                    <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold">
                            Large Scale (120%)
                        </h3>
                        <div style={{ fontSize: "120%" }}>
                            <CartItem
                                item={SAMPLE_ITEMS[1]}
                                currency="฿"
                                onUpdateQuantity={() => { }}
                                onRemove={() => { }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
