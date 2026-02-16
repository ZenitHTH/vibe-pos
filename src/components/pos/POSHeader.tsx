"use client";

import { FaReceipt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import GlobalHeader from "../ui/GlobalHeader";

export default function POSHeader() {
  const router = useRouter();

  return (
    <GlobalHeader title="Simple POS" subtitle="Manage orders efficiently">
      <button
        onClick={() => router.push("/history")}
        className="bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium shadow-sm transition-colors"
      >
        <FaReceipt /> History
      </button>
    </GlobalHeader>
  );
}
