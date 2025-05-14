import type React from "react";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Quicksand({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eurovision Voting 2025 | Cast Your Vote Now!",
  description:
    "Join the excitement of Eurovision 2025! Vote for your favorite entries, explore rankings, and share your results with friends.",
  keywords: [
    "Eurovision",
    "Eurovision 2025",
    "Vote Eurovision",
    "Eurovision voting app",
    "Eurovision rankings",
    "Eurovision songs",
    "Eurovision contest",
  ],
  authors: [{ name: "Eurovision Fan App Team" }],
  creator: "Eurovision Fan App Team",
  openGraph: {
    title: "Eurovision Voting 2025 | Cast Your Vote Now!",
    description:
      "Vote for your favorite Eurovision 2025 performances and see who wins the fan vote!",
    url: "https://your-domain.com",
    siteName: "Eurovision Voting 2025",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eurovision 2025 Voting App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eurovision Voting 2025 | Cast Your Vote Now!",
    description:
      "Join fans across Europe in voting for your favorite Eurovision 2025 songs.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
