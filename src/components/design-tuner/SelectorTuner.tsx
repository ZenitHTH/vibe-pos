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
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div>
        <h2 className="mb-2 text-3xl font-bold">Selector</h2>
        <p className="text-muted-foreground">
          Customize and preview the Select component behavior.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Interactive Preview</h3>
          <Select
            label="Flavor Selection"
            options={options}
            value={val}
            onChange={setVal}
            placeholder="Choose a flavor..."
          />
          <div className="bg-muted/30 mt-4 rounded-lg p-4 text-sm">
            <span className="text-muted-foreground">Current Value: </span>
            <code className="bg-muted text-foreground rounded px-1 py-0.5">
              {val || "(none)"}
            </code>
          </div>
        </div>

        <div className="border-border bg-card rounded-xl border p-6 opacity-50 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">
            Disabled State (Preview)
          </h3>
          <div className="pointer-events-none">
            <Select
              label="Out of Stock"
              options={options}
              value=""
              onChange={() => {}}
              placeholder="Cannot select"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
