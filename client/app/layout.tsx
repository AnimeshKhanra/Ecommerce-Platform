import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ShopHub",
    template: "%s | ShopHub",
  },

  description:
    "Modern e-commerce platform built with Next.js, Prisma, Redis, and Stripe.",
  
  keywords: [
    "ecommerce",
    "online shopping",
    "nextjs store",
    "shophub",
    "electronics",
    "fashion",
  ],

  metadataBase: new URL("https://yourdomain.com"),

  openGraph: {
    title: "ShopHub",
    description:
      "Modern e-commerce platform built with Next.js and Stripe.",
    url: "https://yourdomain.com",
    siteName: "ShopHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShopHub",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ShopHub",
    description:
      "Modern e-commerce platform built with Next.js and Stripe.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
        
        <main className="flex-1">
          {children}
        </main>
      </body>

    </html>
  );
}
