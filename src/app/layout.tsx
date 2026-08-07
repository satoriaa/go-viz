import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Algorithmic Visualizer - Neobrutalism CS Education",
  description: "Interactive algorithm visualizer with Neobrutalism UI design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${fontSans.variable} font-sans bg-neoBackground text-neoDark antialiased`}>
        <Navbar />
        <main className="min-h-screen pb-16">{children}</main>
      </body>
    </html>
  );
}