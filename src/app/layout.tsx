import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { SettingsProvider } from "@/context/SettingsContext";
import { DatabaseProvider } from "@/context/DatabaseContext";
import DatabaseGuard from "@/components/DatabaseGuard";
import { MockupProvider } from "@/context/MockupContext";
import BottomControlPanel from '@/components/design-mode/BottomControlPanel';
import { ThemeProvider } from "@/components/theme-provider";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoMono = Noto_Sans_Mono({
  variable: "--font-noto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple POS",
  description: "Next.js POS Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${notoMono.variable} antialiased flex bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <DatabaseProvider>
              <MockupProvider>
                <DatabaseGuard>
                  <Sidebar />
                  <main className="flex-1 h-screen overflow-hidden pt-16 lg:pt-0 flex flex-col">
                    {children}
                  </main>
                  <BottomControlPanel />
                </DatabaseGuard>
              </MockupProvider>
            </DatabaseProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
