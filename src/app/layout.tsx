import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "FrigoMalin — votre frigo, malin",
  description: "Gérez vos aliments, évitez le gaspillage et trouvez des idées de recettes avec FrigoMalin.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
