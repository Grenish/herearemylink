import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const Mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkSync",
  description: "One place for all your links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Mont.className}>{children}</body>
    </html>
  );
}
