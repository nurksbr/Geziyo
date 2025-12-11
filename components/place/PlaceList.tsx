"use client";

import React from "react";
import PlaceCard from "./PlaceCard";

interface PlaceListProps {
    places: any[];
}

export default function PlaceList({ places }: PlaceListProps) {
    if (places.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Henüz mekan bulunamadı.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
                <PlaceCard key={place._id} place={place} />
            ))}
        </div>
    );
}
