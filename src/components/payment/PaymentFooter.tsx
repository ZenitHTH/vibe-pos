import { memo } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface PaymentFooterProps {
  isValid: boolean;
  isProcessing: boolean;
  onConfirm: () => void;
}

const PaymentFooter = memo(
  ({ isValid, isProcessing, onConfirm }: PaymentFooterProps) => (
    <div className="border-border bg-muted/5 border-t p-4 lg:p-5">
      <button
        onClick={onConfirm}
        disabled={!isValid || isProcessing}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold transition-all ${
          isValid && !isProcessing
            ? "bg-green-600 text-white shadow-lg shadow-green-500/20 hover:bg-green-700 active:scale-[0.98]"
            : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
        }`}
      >
        {isProcessing ? (
          <span>Processing...</span>
        ) : (
          <>
            <FaPaperPlane />
            Confirm Payment
          </>
        )}
      </button>
    </div>
  ),
);

PaymentFooter.displayName = "PaymentFooter";

export default PaymentFooter;
