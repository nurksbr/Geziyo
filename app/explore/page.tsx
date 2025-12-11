"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import MapView from "@/components/map/MapView";
import PlaceList from "@/components/place/PlaceList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function ExplorePage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("all");
    const [userType, setUserType] = useState("all");

    useEffect(() => {
        fetchPlaces();
    }, [category, userType]);

    const fetchPlaces = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                city: "Istanbul",
            });

            if (category !== "all") {
                params.append("category", category);
            }
            if (userType !== "all") {
                params.append("userType", userType);
            }

            const response = await fetch(`/api/places?${params}`);
            const data = await response.json();

            if (data.success) {
                setPlaces(data.data);
            }
        } catch (error) {
            console.error("Error fetching places:", error);
        } finally {
            setLoading(false);
        }
    };

    const markers = places.map((place: any) => ({
        id: place._id,
        coordinates: place.location.coordinates,
        title: place.name,
    }));

    return (
        <MainLayout>
            <div className="h-[calc(100vh-73px)] flex flex-col md:flex-row">
                {/* Map Section */}
                <div className="h-1/2 md:h-full md:w-1/2 relative">
                    <MapView markers={markers} />
                </div>

                {/* List Section */}
                <div className="h-1/2 md:h-full md:w-1/2 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {/* Filters */}
                        <div className="space-y-4">
                            <h1 className="text-2xl font-bold">Mekanları Keşfet</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Kategori</label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Tümü</SelectItem>
                                            <SelectItem value="cafe">Kafe</SelectItem>
                                            <SelectItem value="restaurant">Restoran</SelectItem>
                                            <SelectItem value="museum">Müze</SelectItem>
                                            <SelectItem value="park">Park</SelectItem>
                                            <SelectItem value="viewpoint">Manzara</SelectItem>
                                            <SelectItem value="historical">Tarihi Mekan</SelectItem>
                                            <SelectItem value="entertainment">Eğlence</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Kullanıcı Tipi</label>
                                    <Select value={userType} onValueChange={setUserType}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Tümü</SelectItem>
                                            <SelectItem value="family">Çocuklu Aile</SelectItem>
                                            <SelectItem value="young">Genç</SelectItem>
                                            <SelectItem value="solo">Tek Gezen</SelectItem>
                                            <SelectItem value="tourist">Turist</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Places List */}
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">Yükleniyor...</p>
                            </div>
                        ) : (
                            <PlaceList places={places} />
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
