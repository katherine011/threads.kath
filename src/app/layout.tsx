import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/__organisms/Header";
import { ThemeProvider } from "./ThemeContext";

const inter = Inter({
  subsets: ["greek"],
  weight: ["100", "300", "600"],
});

export const metadata: Metadata = {
  title: "Threads",
  description: "A simple Threads-like chat app built with Next.js 14.",
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex flex-row bg-[#F2F3F5]   `}
      >
        <Header /> {children}
      </body>
    </html>
  );
}
