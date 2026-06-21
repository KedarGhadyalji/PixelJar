import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition"; // Import the wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixelJar - Interactive Multi-Language Code Editor",
  description:
    "A fast, instant-execution multi-runtime environment for testing scripts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#07070c] text-gray-100 flex flex-col overflow-x-hidden">
        <ClerkProvider>
          <ConvexClientProvider>
            <ClerkLoading>
              <div className="flex-1 min-h-screen flex items-center justify-center bg-[#07070c]">
                <div className="relative flex flex-col items-center gap-4">
                  <div className="absolute w-12 h-12 rounded-full border border-blue-500/20 animate-ping duration-1000" />
                  <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center shadow-2xl">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </ClerkLoading>

            <ClerkLoaded>
              <main className="flex-1 flex flex-col w-full relative overflow-hidden">
                {/* Wrap children so all pages inherit route-aware fade transitions */}
                <PageTransition>{children}</PageTransition>
              </main>
            </ClerkLoaded>
          </ConvexClientProvider>
        </ClerkProvider>
        <Footer />
      </body>
    </html>
  );
}
