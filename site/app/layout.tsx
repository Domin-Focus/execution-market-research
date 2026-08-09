import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://execution-market-research.lihao20051404.chatgpt.site"),
  title: {
    default: "Execution Market Research",
    template: "%s · EMR",
  },
  description:
    "Open research on making autonomous execution measurable, accountable, and economically coordinated.",
  openGraph: {
    title: "Execution Market Research",
    description:
      "Before execution becomes a market, it must become measurable, comparable, and accountable.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Execution Market Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Execution Market Research",
    description: "Making autonomous execution measurable, comparable, and accountable.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
