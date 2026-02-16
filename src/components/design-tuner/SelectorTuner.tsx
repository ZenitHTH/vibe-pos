"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";

export function SelectorTuner() {
    const [val, setVal] = useState<string | number>("");
    const options = [
        { value: "1", label: "Vanilla Option" },
        { value: "2", label: "Chocolate Option" },
        { value: "3", label: "Strawberry Option" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold mb-2">Selector</h2>
                <p className="text-muted-foreground">Customize and preview the Select component behavior.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 border border-border rounded-xl bg-card shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Interactive Preview</h3>
                    <Select
                        label="Flavor Selection"
                        options={options}
                        value={val}
                        onChange={setVal}
                        placeholder="Choose a flavor..."
                    />
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm">
                        <span className="text-muted-foreground">Current Value: </span>
                        <code className="bg-muted px-1 py-0.5 rounded text-foreground">{val || "(none)"}</code>
                    </div>
                </div>

                <div className="p-6 border border-border rounded-xl bg-card shadow-sm opacity-50">
                    <h3 className="text-lg font-semibold mb-4">Disabled State (Preview)</h3>
                    <div className="pointer-events-none">
                        <Select
                            label="Out of Stock"
                            options={options}
                            value=""
                            onChange={() => { }}
                            placeholder="Cannot select"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
