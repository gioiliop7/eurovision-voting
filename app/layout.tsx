import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Analytics } from "@vercel/analytics/next";

const singingSans = localFont({
  src: "../assets/Singing_Sans.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eurovision Voting 2026 | Vienna · Cast Your Vote Now!",
  description:
    "Join the excitement of Eurovision 2026 in Vienna! Vote for your favorite entries in the 70th Eurovision Song Contest, explore rankings, and share your results with friends.",
  keywords: [
    "Eurovision",
    "Eurovision 2026",
    "Vienna2026",
    "Vote Eurovision",
    "Eurovision voting app",
    "Eurovision rankings",
    "Eurovision songs",
    "Eurovision contest",
    "70th Eurovision",
    "United by Music",
  ],
  authors: [{ name: "Eurovision Fan App Team" }],
  creator: "Eurovision Fan App Team",
  openGraph: {
    title: "Eurovision Voting2026 | Vienna · Cast Your Vote Now!",
    description:
      "Vote for your favorite Eurovision2026 performances in Vienna and see who wins the fan vote!",
    url: "https://your-domain.com",
    siteName: "Eurovision Voting2026",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eurovision2026 Vienna Voting App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eurovision Voting2026 | Vienna · Cast Your Vote Now!",
    description:
      "Join fans across Europe in voting for your favorite Eurovision2026 songs from Vienna.",
    images: ["https://your-domain.com/twitter-card.jpg"],
    creator: "@yourTwitterHandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
      </head>
      <body className={singingSans.className}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
