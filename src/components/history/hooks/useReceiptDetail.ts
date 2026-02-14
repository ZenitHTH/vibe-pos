import { useState, useEffect } from 'react';
import { useDatabase } from '@/context/DatabaseContext';
import { ReceiptList as ReceiptListType, Receipt } from '@/lib/types';
import { Product } from '@/types';
import { receiptApi, productApi } from '@/lib/api';
import { useMockup } from '@/context/MockupContext';

export const formatDate = (unix: number) => {
    return new Date(unix * 1000).toLocaleString('th-TH', {
        dateStyle: 'medium',
        timeStyle: 'medium',
    });
};

export function useReceiptDetail(receipt: ReceiptListType) {
    const { isMockupMode } = useMockup();
    const { dbKey } = useDatabase();
    const [receiptItems, setReceiptItems] = useState<Receipt[]>([]);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (isMockupMode) {
             setProducts([
                { id: 1, name: "Sample Product A", price: 100, category: "Sample", image: "" },
                { id: 2, name: "Sample Product B", price: 200, category: "Sample", image: "" },
            ]);

            setLoadingDetail(true);
            setTimeout(() => {
                setReceiptItems([
                    { id: 101, receipt_id: receipt.receipt_id, product_id: 1, quantity: 2 },
                    { id: 102, receipt_id: receipt.receipt_id, product_id: 2, quantity: 1 },
                ]); 
                setLoadingDetail(false);
            }, 500);
            return;
        }

        if (!dbKey) return;
        // Fetch products for name lookup
        productApi.getAll(dbKey).then(apiProducts => {
            const mapped: Product[] = apiProducts.map(p => ({
                id: p.product_id,
                name: p.title,
                price: p.satang / 100,
                category: p.catagory,
                image: "",
            }));
            setProducts(mapped);
        }).catch(console.error);

        async function loadDetail() {
            if (!dbKey) return;
            setLoadingDetail(true);
            try {
                const [, items] = await receiptApi.getInvoiceDetail(dbKey, receipt.receipt_id);
                setReceiptItems(items);
            } catch (error) {
                console.error("Failed to load details", error);
            } finally {
                setLoadingDetail(false);
            }
        }
        loadDetail();
    }, [receipt, dbKey, isMockupMode]);

    const getProductName = (productId: string | number) => {
        const product = products.find(p => p.id === productId);
        return product ? product.name : `Product #${productId}`;
    };

    return {
        receiptItems,
        loadingDetail,
        getProductName,
    };
}
