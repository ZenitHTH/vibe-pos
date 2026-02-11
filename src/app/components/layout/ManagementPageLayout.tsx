"use client";

import { FaSearch } from "react-icons/fa";
import GlobalHeader from "../ui/GlobalHeader";
import ScalableContainer from "../design-mode/ScalableContainer";
import ScrollableContainer from "../ui/ScrollableContainer";

import { AppSettings } from "@/lib/settings";
import { useSettings } from "@/app/context/SettingsContext";

interface ManagementPageLayoutProps {
    title: string;
    subtitle?: string;
    headerActions?: React.ReactNode;
    loading?: boolean;
    error?: string | null;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    scaleKey: keyof AppSettings;
    children: React.ReactNode;
    modal?: React.ReactNode;
    floatingActions?: React.ReactNode;
    scrollable?: boolean;
}

export default function ManagementPageLayout({
    title,
    subtitle,
    headerActions,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    scaleKey,
    children,
    modal,
    floatingActions,
    scrollable = false
}: ManagementPageLayoutProps) {
    const { settings } = useSettings();
    const ContentWrapper = scrollable ? ScrollableContainer : ({ children }: { children: React.ReactNode }) => <>{children}</>;

    return (
        <ContentWrapper>
            <div
                className={`w-full p-8 mx-auto transition-all duration-300 ${scrollable ? 'pb-24' : ''}`}
                style={{ maxWidth: `${settings.layout_max_width || 1280}px` }}
            >
                <GlobalHeader
                    title={title}
                    subtitle={subtitle}
                >
                    {headerActions}
                </GlobalHeader>

                <ScalableContainer settingKey={scaleKey}>
                    {setSearchQuery && (
                        <div className="mb-6 relative max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                            <input
                                type="text"
                                placeholder={`Search ${title.toLowerCase()}...`}
                                value={searchQuery || ""}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card-bg focus:ring-2 focus:ring-primary/50 outline-none"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-200">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        children
                    )}
                </ScalableContainer>

                {modal}
            </div>

            {floatingActions && (
                <div className="fixed bottom-6 right-6 z-50">
                    {floatingActions}
                </div>
            )}
        </ContentWrapper>
    );
}
