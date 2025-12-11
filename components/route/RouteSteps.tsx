"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

interface RouteStepsProps {
    steps: Array<{
        order: number;
        recommendedDurationMinutes: number;
        placeId: {
            _id: string;
            name: string;
            category: string;
            images: string[];
            description?: string;
        };
    }>;
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

export default function RouteSteps({ steps }: RouteStepsProps) {
    return (
        <div className="space-y-4">
            {steps.map((step, index) => (
                <Card key={step.placeId._id} className="overflow-hidden">
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    {step.order}
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-lg">{step.placeId.name}</h3>
                                        <Badge variant="secondary" className="mt-1">
                                            {categoryLabels[step.placeId.category] || step.placeId.category}
                                        </Badge>
                                    </div>
                                </div>

                                {step.placeId.description && (
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {step.placeId.description}
                                    </p>
                                )}

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{step.recommendedDurationMinutes} dakika</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
