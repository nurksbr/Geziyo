"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface MapViewProps {
    center?: [number, number]; // [lng, lat]
    zoom?: number;
    markers?: Array<{
        id: string;
        coordinates: [number, number];
        title: string;
        onClick?: () => void;
    }>;
    className?: string;
}

export default function MapView({
    center = [28.9784, 41.0082], // Istanbul default
    zoom = 12,
    markers = [],
    className = "",
}: MapViewProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const markersRef = useRef<mapboxgl.Marker[]>([]);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: center,
            zoom: zoom,
        });

        map.current.on("load", () => {
            setMapLoaded(true);
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        return () => {
            map.current?.remove();
        };
    }, []);

    // Update markers
    useEffect(() => {
        if (!map.current || !mapLoaded) return;

        // Remove old markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        // Add new markers
        markers.forEach((markerData) => {
            const el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundImage = "url(/marker-icon.png)";
            el.style.width = "30px";
            el.style.height = "40px";
            el.style.backgroundSize = "100%";
            el.style.cursor = "pointer";

            const marker = new mapboxgl.Marker(el)
                .setLngLat(markerData.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h3 class="font-semibold">${markerData.title}</h3>`
                    )
                )
                .addTo(map.current!);

            if (markerData.onClick) {
                el.addEventListener("click", markerData.onClick);
            }

            markersRef.current.push(marker);
        });

        // Fit bounds if multiple markers
        if (markers.length > 1) {
            const bounds = new mapboxgl.LngLatBounds();
            markers.forEach((m) => bounds.extend(m.coordinates));
            map.current.fitBounds(bounds, { padding: 50 });
        } else if (markers.length === 1) {
            map.current.flyTo({ center: markers[0].coordinates, zoom: 14 });
        }
    }, [markers, mapLoaded]);

    return <div ref={mapContainer} className={`w-full h-full ${className}`} />;
}
