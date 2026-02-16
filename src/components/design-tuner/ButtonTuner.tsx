import { Button } from "@/components/ui/Button";
import { FaPalette } from "react-icons/fa";

export function ButtonTuner() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold mb-2">Buttons</h2>
                <p className="text-muted-foreground">Preview button variants and sizes.</p>
            </div>

            <div className="space-y-6">
                <div className="p-6 border border-border rounded-xl bg-card shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Variants</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </div>
                </div>

                <div className="p-6 border border-border rounded-xl bg-card shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Sizes</h3>
                    <div className="flex flex-wrap gap-4 items-end">
                        <Button size="sm">Small (sm)</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large (lg)</Button>
                        <div className="flex items-center gap-2">
                            <Button size="icon" aria-label="Icon"><FaPalette /></Button>
                            <span className="text-sm text-muted-foreground">Icon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
