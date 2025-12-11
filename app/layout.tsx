import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Rotamda - Şehir Keşif ve Akıllı Rota Planlama",
    description: "Şehirleri keşfedin, size özel rotalar oluşturun",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
