import { Button } from "@/components/ui/Button";
import { FaPalette } from "react-icons/fa";

export function ButtonTuner() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div>
        <h2 className="mb-2 text-3xl font-bold">Buttons</h2>
        <p className="text-muted-foreground">
          Preview button variants and sizes.
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Variants</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Sizes</h3>
          <div className="flex flex-wrap items-end gap-4">
            <Button size="sm">Small (sm)</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large (lg)</Button>
            <div className="flex items-center gap-2">
              <Button size="icon" aria-label="Icon">
                <FaPalette />
              </Button>
              <span className="text-muted-foreground text-sm">Icon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
