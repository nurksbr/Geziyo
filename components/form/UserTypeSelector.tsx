"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Baby, Backpack, Camera } from "lucide-react";

interface UserTypeSelectorProps {
    selected: string;
    onSelect: (type: string) => void;
}

const userTypes = [
    {
        id: "family",
        label: "Çocuklu Aile",
        icon: Baby,
        description: "Çocuklarla gezilecek yerler",
    },
    {
        id: "young",
        label: "Genç",
        icon: Users,
        description: "Eğlence ve sosyal mekanlar",
    },
    {
        id: "solo",
        label: "Tek Gezen",
        icon: Backpack,
        description: "Kendi başına keşif",
    },
    {
        id: "tourist",
        label: "Turist",
        icon: Camera,
        description: "Turistik yerler",
    },
];

export default function UserTypeSelector({ selected, onSelect }: UserTypeSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selected === type.id;

                return (
                    <Card
                        key={type.id}
                        className={`cursor-pointer transition-all ${isSelected
                                ? "border-primary ring-2 ring-primary"
                                : "hover:border-primary/50"
                            }`}
                        onClick={() => onSelect(type.id)}
                    >
                        <CardContent className="p-6 text-center">
                            <Icon
                                className={`h-12 w-12 mx-auto mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"
                                    }`}
                            />
                            <h3 className="font-semibold mb-1">{type.label}</h3>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
