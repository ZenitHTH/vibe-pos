"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBoxOpen,
  FaCog,
  FaTags,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useSettings } from "@/context/SettingsContext";
import SelectableOverlay from "@/components/design-mode/SelectableOverlay";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    name: "Main Page",
    path: "/",
    icon: <FaHome size={20} />,
  },
  {
    name: "Product Management",
    path: "/manage",
    icon: <FaBoxOpen size={20} />,
  },
  {
    name: "Categories",
    path: "/manage/categories",
    icon: <FaTags size={20} />,
  },
  {
    name: "System Setting",
    path: "/setting",
    icon: <FaCog size={20} />,
  },
];

export default function Sidebar() {
  const { settings } = useSettings();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Calculate dynamic width (base 16rem = 256px)
  const baseWidth = 256;
  const dynamicWidth = `${baseWidth * ((settings?.sidebar_scale || 100) / 100)}px`;

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/design/tuner")) return null;

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-card-bg border-border fixed top-0 right-0 left-0 z-40 flex h-16 items-center border-b px-4 shadow-sm lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="text-muted hover:text-foreground -ml-2 p-2 transition-colors"
        >
          <FaBars size={24} />
        </button>
        <span className="text-primary ml-4 text-[1.125em] font-bold">
          Simple POS
        </span>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{ width: dynamicWidth }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:static",
          "bg-card text-card-foreground border-border border-r shadow-2xl lg:shadow-none",
          "transform transition-transform duration-300 ease-in-out",
          "flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        // We need to apply width specifically for desktop static layout
        // But tailwind class w-64 is applied. We should override it or use style.
      >
        {/* We use a style injection or inline style wrapper to handle the dynamic width properly */}
        <div
          style={{
            width: dynamicWidth,
            fontSize: `${settings?.sidebar_font_scale || 100}%`,
          }}
          className="group relative flex h-full flex-col"
        >
          <div className="flex items-center justify-between p-6 lg:block">
            <h1 className="text-primary text-[1.5em] font-bold">POS System</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-foreground p-2 transition-colors lg:hidden"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-primary/20 shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[1em] font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-border mt-auto border-t p-4">
            <p className="text-muted text-center text-[0.75em]">
              © 2026 Simple POS
            </p>
          </div>

          <SelectableOverlay id="sidebar_scale" />
        </div>
      </aside>
    </>
  );
}
