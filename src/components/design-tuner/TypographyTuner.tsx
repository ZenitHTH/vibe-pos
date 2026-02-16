export function TypographyTuner() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold mb-2">Typography</h2>
                <p className="text-muted-foreground">Heading hierarchies and text styles.</p>
            </div>

            <div className="p-8 border border-border rounded-xl bg-card shadow-sm space-y-8">
                <div className="grid gap-8">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Heading 1
                        </h1>
                        <p className="text-sm text-muted-foreground">font-extrabold tracking-tight text-4xl lg:text-5xl</p>
                    </div>

                    <div className="border-b border-border" />

                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Heading 2
                        </h2>
                        <p className="text-sm text-muted-foreground">font-semibold tracking-tight text-3xl</p>
                    </div>

                    <div className="border-b border-border" />

                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold tracking-tight">
                            Heading 3
                        </h3>
                        <p className="text-sm text-muted-foreground">font-semibold tracking-tight text-2xl</p>
                    </div>

                    <div className="border-b border-border" />

                    <div className="space-y-2">
                        <h4 className="text-xl font-semibold tracking-tight">
                            Heading 4
                        </h4>
                        <p className="text-sm text-muted-foreground">font-semibold tracking-tight text-xl</p>
                    </div>

                    <div className="border-b border-border" />

                    <div className="space-y-2">
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.
                            This is a standard paragraph styled for readability.
                        </p>
                        <p className="text-sm text-muted-foreground">leading-7</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Small text for captions, timestamps, or secondary information.
                        </p>
                        <p className="text-sm text-muted-foreground">text-sm text-muted-foreground</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
