import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Let's Start With Your Name",
  description: "Let's Know You Better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mont.className}>{children}</body>
    </html>
  );
}
