"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface CityOption {
    id: string;
    name: string;
    description: string;
    image: string;
}

const cities: CityOption[] = [
    {
        id: "Istanbul",
        name: "İstanbul",
        description: "Tarihi ve modern mekanlar",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop",
    },
    {
        id: "Ankara",
        name: "Ankara",
        description: "Başkentin kültürel mekanları",
        image: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=400&h=300&fit=crop",
    },
    {
        id: "Izmir",
        name: "İzmir",
        description: "Ege'nin incisi",
        image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=300&fit=crop",
    },
    {
        id: "Antalya",
        name: "Antalya",
        description: "Deniz ve tarihi",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    },
];

interface CitySelectorProps {
    selected: string;
    onSelect: (city: string) => void;
}

export default function CitySelector({ selected, onSelect }: CitySelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city) => {
                const isSelected = selected === city.id;

                return (
                    <Card
                        key={city.id}
                        className={`cursor-pointer transition-all duration-300 overflow-hidden group ${isSelected
                                ? "ring-4 ring-purple-500 scale-105"
                                : "hover:scale-105 hover:shadow-2xl"
                            }`}
                        onClick={() => onSelect(city.id)}
                    >
                        <CardContent className="p-0 relative h-64">
                            {/* City Image */}
                            <div className="relative h-full w-full">
                                <Image
                                    src={city.image}
                                    alt={city.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${isSelected
                                        ? "from-purple-900/90 to-purple-600/40"
                                        : "from-black/70 to-black/20 group-hover:from-purple-900/80"
                                    } transition-all duration-300`}></div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="h-5 w-5" />
                                    <h3 className="font-bold text-xl">{city.name}</h3>
                                </div>
                                <p className="text-sm text-white/90">{city.description}</p>
                            </div>

                            {/* Selected Indicator */}
                            {isSelected && (
                                <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                                    <MapPin className="h-5 w-5 text-purple-600" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
