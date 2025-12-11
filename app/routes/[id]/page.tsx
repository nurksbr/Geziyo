"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import MapView from "@/components/map/MapView";
import RouteSteps from "@/components/route/RouteSteps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, TrendingUp } from "lucide-react";

export default function RouteDetailPage() {
    const params = useParams<{ id: string }>();
    const id = params.id;

    const [route, setRoute] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRoute();
    }, [id]);

    const fetchRoute = async () => {
        try {
            const response = await fetch(`/api/routes/${id}`);
            const data = await response.json();

            if (data.success) {
                setRoute(data.data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12 text-center">
                    <p>Yükleniyor...</p>
                </div>
            </MainLayout>
        );
    }

    if (!route) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12 text-center">
                    <p>Rota bulunamadı</p>
                </div>
            </MainLayout>
        );
    }

    const markers = route.steps.map((step: any) => ({
        id: step.placeId._id,
        coordinates: step.placeId.location.coordinates,
        title: `${step.order}. ${step.placeId.name}`,
    }));

    const totalDuration = route.steps.reduce(
        (sum: number, step: any) => sum + step.recommendedDurationMinutes,
        0
    );

    return (
        <MainLayout>
            <div className="h-[calc(100vh-73px)] flex flex-col lg:flex-row">
                {/* Map Section */}
                <div className="h-1/2 lg:h-full lg:w-1/2 relative">
                    <MapView markers={markers} />
                </div>

                {/* Route Details Section */}
                <div className="h-1/2 lg:h-full lg:w-1/2 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {/* Header */}
                        <div>
                            <h1 className="text-3xl font-bold mb-4">Rotanız Hazır!</h1>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <Card>
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <MapPin className="h-8 w-8 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Durak Sayısı</p>
                                            <p className="text-2xl font-bold">{route.steps.length}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <Clock className="h-8 w-8 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Toplam Süre</p>
                                            <p className="text-2xl font-bold">
                                                {Math.floor(totalDuration / 60)}s {totalDuration % 60}dk
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <TrendingUp className="h-8 w-8 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Şehir</p>
                                            <p className="text-2xl font-bold">{route.city}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Route Steps */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Rota Adımları</h2>
                            <RouteSteps steps={route.steps} />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
