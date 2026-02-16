import { memo } from "react";
import { FaBackspace } from "react-icons/fa";

interface VirtualNumpadProps {
  onPress: (key: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  height?: number;
}

const VirtualNumpad = memo(
  ({ onPress, onClear, onBackspace, height }: VirtualNumpadProps) => {
    const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "00", "0", "."];

    return (
      <div
        className={`grid grid-cols-4 gap-3 select-none ${!height ? "h-48 sm:h-56 lg:h-64 xl:h-80" : ""}`}
        style={{ height: height ? `${height}px` : undefined }}
      >
        {/* Numbers Section (3 cols) */}
        <div className="col-span-3 grid grid-cols-3 gap-3">
          {keys.map((key) => (
            <button
              key={key}
              onClick={() => onPress(key)}
              className="bg-card text-foreground border-border hover:bg-muted/10 active:bg-primary/5 focus:ring-primary/20 flex items-center justify-center rounded-2xl border text-3xl font-bold shadow-sm transition-all outline-none focus:ring-2 active:scale-95"
              type="button"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Actions Section (1 col) */}
        <div className="col-span-1 grid grid-cols-1 gap-3">
          <button
            onClick={onBackspace}
            className="flex items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500 transition-all hover:bg-red-500/20 active:scale-95"
            type="button"
            aria-label="Backspace"
          >
            <FaBackspace size={28} />
          </button>
          <button
            onClick={onClear}
            className="bg-muted/10 text-muted-foreground border-border hover:bg-muted/20 flex items-center justify-center rounded-2xl border text-xl font-bold transition-all active:scale-95"
            type="button"
            aria-label="Clear All"
          >
            CLEAR
          </button>
        </div>
      </div>
    );
  },
);

VirtualNumpad.displayName = "VirtualNumpad";

export default VirtualNumpad;
