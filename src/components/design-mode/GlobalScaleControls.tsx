import NumberStepper from "@/components/ui/NumberStepper";

export default function GlobalScaleControls({ value, onChange }: { value: number, onChange: (val: number) => void }) {
    return (
        <div className="flex-1 space-y-2 border-r border-border pr-8">
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted uppercase tracking-wider">Display Scale</span>
                <NumberStepper
                    min={75}
                    max={125}
                    step={5}
                    value={value}
                    onChange={onChange}
                    formatValue={(v) => `${v}%`}
                />
            </div>
        </div>
    );
}
