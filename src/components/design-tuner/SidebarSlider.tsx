interface SidebarSliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
}

export function SidebarSlider({
  label,
  value,
  onChange,
  min,
  max,
  unit,
}: SidebarSliderProps) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-muted-foreground text-xs">{label}</label>
        <span className="text-muted-foreground text-xs">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
