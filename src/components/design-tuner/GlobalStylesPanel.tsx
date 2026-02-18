interface GlobalStylesPanelProps {
  radius: number;
  setRadius: (v: number) => void;
  baseFontSize: number;
  setBaseFontSize: (v: number) => void;
  primaryColor: string;
  setPrimaryColor: (v: string) => void;
}

export function GlobalStylesPanel({
  radius,
  setRadius,
  baseFontSize,
  setBaseFontSize,
  primaryColor,
  setPrimaryColor,
}: GlobalStylesPanelProps) {
  return (
    <div className="border-border mt-8 border-t px-2 pt-4">
      <h2 className="text-foreground/80 mb-4 text-sm font-semibold">
        Global Styles
      </h2>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-muted-foreground text-xs">Radius</label>
            <span className="text-muted-foreground text-xs">
              {radius}rem
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={radius}
            onChange={(e) => setRadius(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-muted-foreground text-xs">
              Base Scale (Px)
            </label>
            <span className="text-muted-foreground text-xs">
              {baseFontSize}px
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setBaseFontSize(Math.max(12, baseFontSize - 1))
              }
              className="bg-secondary hover:bg-secondary/80 text-foreground flex h-6 w-6 items-center justify-center rounded text-xs"
            >
              -
            </button>
            <input
              type="range"
              min="12"
              max="32"
              step="1"
              value={baseFontSize}
              onChange={(e) => setBaseFontSize(parseInt(e.target.value))}
              className="flex-1"
            />
            <button
              onClick={() =>
                setBaseFontSize(Math.min(32, baseFontSize + 1))
              }
              className="bg-secondary hover:bg-secondary/80 text-foreground flex h-6 w-6 items-center justify-center rounded text-xs"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs">
            Primary Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border-0 p-0"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="border-input bg-background flex-1 rounded border px-2 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
