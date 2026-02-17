"use client";

import { useEffect, useState } from "react";
import POSClient from "@/components/pos/POSClient";
import { Product } from "@/types";
import { productApi } from "@/lib/api";
import { useDatabase } from "@/context/DatabaseContext";

export default function MockupPage() {
  const { dbKey } = useDatabase();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      if (!dbKey) return;
      try {
        // Use backend products or fall back to mock data
        const backendProducts = await productApi.getAll(dbKey);
        const mappedProducts: Product[] = backendProducts.map((p) => ({
          id: p.product_id,
          name: p.title,
          price: p.satang / 100, // Convert satang to unit
          category: p.catagory,
          image: "",
          color: "#78350f",
        }));

        if (mappedProducts.length > 0) {
          setProducts(mappedProducts);
        } else {
          // Fallback mock data if API fails or is empty, for better "Mockup" experience
          setProducts(generateMockProducts());
        }
      } catch (error) {
        console.error("Failed to load products, using mock data:", error);
        setProducts(generateMockProducts());
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [dbKey]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Mockup UI...
      </div>
    );
  }

  return (
    <>
      <div className="relative box-border h-full border-4 border-warning">
        <div className="absolute top-0 right-0 z-50 rounded-bl-lg bg-warning px-4 py-1 font-bold text-warning-foreground">
          Design Mode
        </div>
        <POSClient initialProducts={products} />
      </div>
    </>
  );
}

function generateMockProducts(): Product[] {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Mock Product ${i + 1}`,
    price: 100 + i * 10,
    category: i % 2 === 0 ? "Food" : "Drink",
    image: "",
    color: i % 2 === 0 ? "#78350f" : "#14532d",
  }));
}
