import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://domin-focus.github.io/execution-market-research"),
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
    icon: "https://domin-focus.github.io/execution-market-research/favicon.svg",
    shortcut: "https://domin-focus.github.io/execution-market-research/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
