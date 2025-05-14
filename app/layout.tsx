import type React from "react";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const inter = Quicksand({
  weight: [ "300", "400", "700", ],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eurovision Voting 2025",
  description:
    "Vote for your favorite Eurovision 2025 entries and share your results!",
  generator: "v0.dev",
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
        <Toaster />
      </body>
    </html>
  );
}
