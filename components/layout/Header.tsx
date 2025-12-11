"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Header() {
    return (
        <header className="border-b bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="container mx-auto px-4 flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <MapPin className="h-6 w-6" />
                        Geziyo
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
                            Keşfet
                        </Link>
                        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                            Rota Oluştur
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
