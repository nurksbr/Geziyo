"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PlaceCardProps {
    place: {
        _id: string;
        name: string;
        slug: string;
        category: string;
        priceLevel: number;
        rating: number;
        ratingCount: number;
        images: string[];
        description?: string;
        audience: string[];
    };
}

const categoryLabels: Record<string, string> = {
    cafe: "Kafe",
    restaurant: "Restoran",
    museum: "Müze",
    park: "Park",
    viewpoint: "Manzara",
    historical: "Tarihi Mekan",
    entertainment: "Eğlence",
};

const audienceLabels: Record<string, string> = {
    family: "Aile",
    young: "Genç",
    solo: "Tek Gezen",
    tourist: "Turist",
};

export default function PlaceCard({ place }: PlaceCardProps) {
    const priceSymbols = "₺".repeat(place.priceLevel);

    return (
        <Link href={`/places/${place.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                        {place.images && place.images.length > 0 ? (
                            <Image
                                src={place.images[0]}
                                alt={place.name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <MapPin className="h-12 w-12 text-gray-400" />
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{place.name}</h3>
                        <Badge variant="secondary">{categoryLabels[place.category] || place.category}</Badge>
                    </div>

                    {place.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {place.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{place.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">({place.ratingCount})</span>
                        </div>
                        <span className="text-muted-foreground">{priceSymbols}</span>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <div className="flex gap-2 flex-wrap">
                        {place.audience.slice(0, 3).map((aud) => (
                            <Badge key={aud} variant="outline" className="text-xs">
                                {audienceLabels[aud] || aud}
                            </Badge>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
