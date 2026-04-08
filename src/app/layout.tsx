import type { Metadata } from "next";
import { Poppins, Katibeh } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const katibeh = Katibeh({
  variable: "--font-katibeh",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Study Buddy MVP",
  description: "Async English speaking program for beginners",
};

import { ProgressProvider } from "../lib/ProgressContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${katibeh.variable}`}>
      <body>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
