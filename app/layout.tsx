import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexandra Mitchell · Executive Assistant",
  description:
    "Personal Administrative Support Portfolio — Senior Executive Assistant with 9+ years supporting C-suite leaders.",
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
