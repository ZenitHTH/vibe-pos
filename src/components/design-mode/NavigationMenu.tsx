"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaCompass, FaHome, FaBoxOpen, FaTags, FaCog, FaHistory } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useMockup } from "@/context/MockupContext";

export default function NavigationMenu({ router }: { router: ReturnType<typeof useRouter> }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { isMockupMode, setMockupView, mockupView } = useMockup();

    const navigate = (path: string) => {
        router.push(path);
        setIsOpen(false);
    };

    const handlePaymentModalNav = () => {
        setMockupView('payment');
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                    isOpen ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
            >
                <FaCompass />
                <span>Navigate</span>
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-0 mb-4 w-56 bg-popover text-popover-foreground border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                    <div className="p-2 space-y-1">
                        <NavButton
                            onClick={() => navigate('/')}
                            icon={<FaHome />}
                            label="Main Page"
                            isActive={pathname === '/'}
                        />
                        <NavButton
                            onClick={() => navigate('/manage')}
                            icon={<FaBoxOpen />}
                            label="Product Manage"
                            isActive={pathname === '/manage'}
                        />
                        <NavButton
                            onClick={() => navigate('/manage/categories')}
                            icon={<FaTags />}
                            label="Categories"
                            isActive={pathname === '/manage/categories'}
                        />
                        <hr className="border-border my-1" />
                        <NavButton
                            onClick={() => navigate('/setting')}
                            icon={<FaCog />}
                            label="Settings"
                            isActive={pathname === '/setting'}
                        />
                        <NavButton
                            onClick={() => navigate('/history')}
                            icon={<FaHistory />}
                            label="History"
                            isActive={pathname === '/history'}
                        />

                        {isMockupMode && (
                            <>
                                <hr className="border-border my-1" />
                                <NavButton
                                    onClick={() => handlePaymentModalNav()}
                                    icon={<FaCompass />}
                                    label="Payment Modal"
                                    isActive={mockupView === 'payment'}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function NavButton({ onClick, icon, label, isActive }: { onClick: () => void, icon: React.ReactNode, label: string, isActive: boolean }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors",
                isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            )}
        >
            <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>{icon}</span>
            <span className={isActive ? 'font-semibold' : 'font-medium'}>{label}</span>
        </button>
    );
}
