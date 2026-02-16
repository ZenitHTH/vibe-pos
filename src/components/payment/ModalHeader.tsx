import { memo } from "react";
import { FaMoneyBillWave, FaTimes } from "react-icons/fa";

interface ModalHeaderProps {
  onClose: () => void;
}

const ModalHeader = memo(({ onClose }: ModalHeaderProps) => (
  <div className="border-border bg-card-bg/50 flex items-center justify-between border-b p-4 lg:p-5">
    <h2 className="flex items-center gap-2 text-2xl font-bold">
      <FaMoneyBillWave className="text-green-500" aria-hidden="true" />
      Cash Payment
    </h2>
    <button
      onClick={onClose}
      className="hover:bg-muted/20 text-muted hover:text-foreground rounded-full p-2 transition-colors"
      aria-label="Close modal"
    >
      <FaTimes />
    </button>
  </div>
));

ModalHeader.displayName = "ModalHeader";

export default ModalHeader;
