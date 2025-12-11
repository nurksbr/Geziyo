"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import MapView from "@/components/map/MapView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, MapPin, DollarSign } from "lucide-react";
import Image from "next/image";

export default function PlaceDetailPage() {
    const params = useParams<{ slug: string }>();
    const slug = params.slug;

    const [place, setPlace] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [reviewForm, setReviewForm] = useState({
        userName: "",
        rating: 5,
        comment: "",
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPlace();
    }, [slug]);

    const fetchPlace = async () => {
        try {
            const response = await fetch(`/api/places/${slug}`);
            const data = await response.json();

            if (data.success) {
                setPlace(data.data.place);
                setReviews(data.data.reviews);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    placeId: place._id,
                    ...reviewForm,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setReviewForm({ userName: "", rating: 5, comment: "" });
                fetchPlace(); // Refresh to show new review
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
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

    if (!place) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12 text-center">
                    <p>Mekan bulunamadı</p>
                </div>
            </MainLayout>
        );
    }

    const markers = [
        {
            id: place._id,
            coordinates: place.location.coordinates,
            title: place.name,
        },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-2">{place.name}</h1>
                    <div className="flex items-center gap-4 flex-wrap">
                        <Badge>{place.category}</Badge>
                        <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{place.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">({place.ratingCount} yorum)</span>
                        </div>
                        <span className="text-muted-foreground">{"₺".repeat(place.priceLevel)}</span>
                    </div>
                </div>

                {/* Images */}
                {place.images && place.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {place.images.slice(0, 4).map((img: string, idx: number) => (
                            <div key={idx} className="relative h-64 rounded-lg overflow-hidden">
                                <Image src={img} alt={place.name} fill className="object-cover" unoptimized />
                            </div>
                        ))}
                    </div>
                )}

                {/* Description */}
                {place.description && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Açıklama</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{place.description}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Map */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Konum</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="h-96">
                            <MapView markers={markers} center={place.location.coordinates} zoom={15} />
                        </div>
                    </CardContent>
                </Card>

                {/* Reviews */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Yorumlar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {reviews.length === 0 ? (
                            <p className="text-muted-foreground">Henüz yorum yok</p>
                        ) : (
                            reviews.map((review) => (
                                <div key={review._id} className="border-b pb-4 last:border-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold">{review.userName}</span>
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {review.comment && (
                                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                                    )}
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* Add Review Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Yorum Ekle</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">İsim</label>
                                <Input
                                    value={reviewForm.userName}
                                    onChange={(e) =>
                                        setReviewForm({ ...reviewForm, userName: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Puan</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            onClick={() => setReviewForm({ ...reviewForm, rating })}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-8 w-8 ${rating <= reviewForm.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Yorum</label>
                                <Textarea
                                    value={reviewForm.comment}
                                    onChange={(e) =>
                                        setReviewForm({ ...reviewForm, comment: e.target.value })
                                    }
                                    rows={4}
                                />
                            </div>

                            <Button type="submit" disabled={submitting}>
                                {submitting ? "Gönderiliyor..." : "Yorum Gönder"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
