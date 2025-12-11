"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface RoutePreferencesFormProps {
    userType: string;
    city: string;
    onSubmit: (preferences: any) => void;
    loading?: boolean;
}

const categories = [
    { id: "cafe", label: "Kafe" },
    { id: "restaurant", label: "Restoran" },
    { id: "museum", label: "Müze" },
    { id: "park", label: "Park" },
    { id: "viewpoint", label: "Manzara" },
    { id: "historical", label: "Tarihi Mekan" },
    { id: "entertainment", label: "Eğlence" },
];

export default function RoutePreferencesForm({
    userType,
    city,
    onSubmit,
    loading = false,
}: RoutePreferencesFormProps) {
    const [durationHours, setDurationHours] = useState("6");
    const [budgetLevel, setBudgetLevel] = useState("3");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [walkingPreference, setWalkingPreference] = useState("medium");

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((c) => c !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            userType,
            durationHours: parseInt(durationHours),
            budgetLevel: parseInt(budgetLevel),
            categories: selectedCategories,
            walkingPreference,
            city: city,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rota Tercihleriniz</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="duration">Gezi Süresi</Label>
                        <Select value={durationHours} onValueChange={setDurationHours}>
                            <SelectTrigger id="duration">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="3">3 Saat</SelectItem>
                                <SelectItem value="6">6 Saat</SelectItem>
                                <SelectItem value="8">Tüm Gün (8 Saat)</SelectItem>
                                <SelectItem value="12">Uzun Gün (12 Saat)</SelectItem>
                                <SelectItem value="24">1 Gün (24 Saat)</SelectItem>
                                <SelectItem value="48">2 Gün</SelectItem>
                                <SelectItem value="72">3 Gün</SelectItem>
                                <SelectItem value="96">4 Gün</SelectItem>
                                <SelectItem value="120">5 Gün</SelectItem>
                                <SelectItem value="144">6 Gün</SelectItem>
                                <SelectItem value="168">1 Hafta (7 Gün)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="budget">Bütçe Seviyesi</Label>
                        <Select value={budgetLevel} onValueChange={setBudgetLevel}>
                            <SelectTrigger id="budget">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">₺ - Ekonomik</SelectItem>
                                <SelectItem value="2">₺₺ - Uygun</SelectItem>
                                <SelectItem value="3">₺₺₺ - Orta</SelectItem>
                                <SelectItem value="4">₺₺₺₺ - Yüksek</SelectItem>
                                <SelectItem value="5">₺₺₺₺₺ - Lüks</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Kategoriler (Opsiyonel)</Label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <Badge
                                    key={cat.id}
                                    variant={selectedCategories.includes(cat.id) ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => toggleCategory(cat.id)}
                                >
                                    {cat.label}
                                    {selectedCategories.includes(cat.id) && (
                                        <X className="ml-1 h-3 w-3" />
                                    )}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="walking">Yürüme Tercihi</Label>
                        <Select value={walkingPreference} onValueChange={setWalkingPreference}>
                            <SelectTrigger id="walking">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Az Yürüyüş</SelectItem>
                                <SelectItem value="medium">Orta Yürüyüş</SelectItem>
                                <SelectItem value="high">Çok Yürüyüş</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Rota Oluşturuluyor..." : "Rotamı Oluştur"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
