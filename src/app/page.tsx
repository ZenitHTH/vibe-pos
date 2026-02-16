"use client";

import { useEffect, useState } from 'react';
import POSClient from '@/components/pos/POSClient';
import { Product } from '@/types';
import { productApi } from '@/lib/api';
import { useDatabase } from '@/context/DatabaseContext';

export default function Page() {
  const { dbKey } = useDatabase();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      if (!dbKey) return;
      try {
        const backendProducts = await productApi.getAll(dbKey);
        const mappedProducts: Product[] = backendProducts.map(p => ({
          id: p.product_id,
          name: p.title,
          price: p.satang / 100, // Convert satang to unit
          category: p.catagory, // Note: backend uses 'catagory' typo
          image: p.image_path || "",
          color: "#78350f" // Default color
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [dbKey]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return <POSClient initialProducts={products} />;
}

