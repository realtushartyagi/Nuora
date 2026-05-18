import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nuora",
  description: "Talk to your friends and family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
// ============================================================
// VERCEL DEPLOYMENT CACHE INVALIDATION
// Updated: 05/18/2026 23:39:34
// Build ID: 4605bde-vercel-sync-rebuild
// This forces complete rebuild of responsive login/signup pages
// ============================================================
