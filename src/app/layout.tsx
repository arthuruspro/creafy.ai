import type { Metadata } from "next";
import { Rubik, Gochi_Hand } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700"],
});

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  variable: "--font-gochi",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Creafy - Create winning ads with AI",
  description:
    "The fastest way to create AI videos. Write your script, pick an avatar, generate video.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${gochiHand.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
