import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HydrationFix from "@/app/components/HydrationFix";
import PreventExtensionScript from "@/app/components/PreventExtensionScript";
import HydrationSafeWrapper from "@/app/components/HydrationSafeWrapper";
import ExtensionBlocker from "@/app/components/ExtensionBlocker";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "SVDev | Portfolio",
  description: "Portfolio được tái tạo từ svdev.art bằng Next.js + TailwindCSS",
  openGraph: {
    title: "SVDev | Portfolio",
    description:
      "Portfolio được tái tạo từ svdev.art bằng Next.js + TailwindCSS",
    url: "https://svdev.art/",
    siteName: "SVDev",
    locale: "vi_VN",
    type: "website",
  },
  metadataBase: new URL("https://svdev.art/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PreventExtensionScript />
      </head>
      <body
        className={`${quicksand.variable} antialiased dark`}
        suppressHydrationWarning={true}
        style={{ 
          background: 'var(--bg-layout-base)',
          color: 'var(--txt)',
          fontFamily: 'var(--font-quicksand), "Quicksand", sans-serif'
        }}
      >
        <ThemeProvider>
          <ExtensionBlocker />
          <HydrationFix />
          <HydrationSafeWrapper>
            <Navbar />
            {children}
            <Footer />
          </HydrationSafeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
