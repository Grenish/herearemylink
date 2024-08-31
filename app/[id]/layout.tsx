"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";

const mont = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const userID = params.id;

  useEffect(() => {
    if (userID) {
      document.title = `${userID}`;
    }
  }, [userID]);

  return (
    <html lang="en">
      <body className={mont.className}>{children}</body>
    </html>
  );
}
