import type { Metadata, Viewport } from "next";
import { inter, jetbrainsMono } from "@/lib/fonts";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { FloatingNav } from "@/components/sections/FloatingNav";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaibhav Chhajer — Tech Lead & AI Engineer",
  description: "Architecting frontend systems. Shipping production AI.",
  keywords: [
    "Vaibhav Chhajer",
    "Frontend Architecture",
    "AI Engineer",
    "Tech Lead",
    "Next.js",
    "React Server Components",
    "Glassmorphism",
    "RAG",
    "TypeScript",
  ],
  authors: [{ name: "Vaibhav Chhajer" }],
  creator: "Vaibhav Chhajer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vaibhavchhajer.dev",
    title: "Vaibhav Chhajer — Tech Lead & AI Engineer",
    description: "Architecting frontend systems. Shipping production AI.",
    siteName: "Vaibhav Chhajer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Chhajer — Tech Lead & AI Engineer",
    description: "Architecting frontend systems. Shipping production AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans antialiased selection:bg-accent/30 selection:text-text relative">
        <Atmosphere />
        <FloatingNav />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
