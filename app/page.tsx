"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import CitySelector from "@/components/form/CitySelector";
import UserTypeSelector from "@/components/form/UserTypeSelector";
import RoutePreferencesForm from "@/components/form/RoutePreferencesForm";
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles } from "lucide-react";

export default function HomePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedUserType, setSelectedUserType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
    };

    const handleUserTypeSelect = (type: string) => {
        setSelectedUserType(type);
    };

    const handleNextFromCity = () => {
        if (selectedCity) {
            setStep(2);
        }
    };

    const handleNextFromUserType = () => {
        if (selectedUserType) {
            setStep(3);
        }
    };

    const handleRouteSubmit = async (preferences: any) => {
        setLoading(true);
        try {
            const response = await fetch("/api/routes/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(preferences),
            });

            const data = await response.json();

            if (data.success) {
                router.push(`/routes/${data.data.routeId}`);
            } else {
                alert("Rota oluşturulamadı: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            {/* Modern Hero Section */}
            <section className="relative gradient-hero min-h-[600px] flex items-center overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                            Şehri Keşfet, <br />
                            <span className="bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">
                                Rotanı Bul
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
                            Size özel akıllı rotalarla şehirleri keşfedin
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
                            <Button
                                size="lg"
                                className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl"
                                onClick={() => {
                                    const element = document.getElementById('wizard-section');
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <Sparkles className="mr-2 h-5 w-5" />
                                Rota Oluştur
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full"
                                onClick={() => router.push('/explore')}
                            >
                                <MapPin className="mr-2 h-5 w-5" />
                                Keşfet
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            {/* City, User Type Selection, or Route Preferences */}
            <section id="wizard-section" className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    {step === 1 ? (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-2">Hangi Şehri Keşfetmek İstersiniz?</h2>
                                <p className="text-muted-foreground">
                                    Geziniz için bir şehir seçin
                                </p>
                            </div>

                            <CitySelector
                                selected={selectedCity}
                                onSelect={handleCitySelect}
                            />

                            <div className="flex justify-center">
                                <Button
                                    size="lg"
                                    onClick={handleNextFromCity}
                                    disabled={!selectedCity}
                                    className="min-w-[200px]"
                                >
                                    Devam Et
                                    <Sparkles className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    ) : step === 2 ? (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-2">Kimsiniz?</h2>
                                <p className="text-muted-foreground">
                                    Size en uygun mekanları önerebilmemiz için lütfen seçim yapın
                                </p>
                            </div>

                            <UserTypeSelector
                                selected={selectedUserType}
                                onSelect={handleUserTypeSelect}
                            />

                            <div className="flex justify-center gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                >
                                    Geri Dön
                                </Button>
                                <Button
                                    size="lg"
                                    onClick={handleNextFromUserType}
                                    disabled={!selectedUserType}
                                    className="min-w-[200px]"
                                >
                                    Devam Et
                                    <Sparkles className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-2">Rota Tercihleriniz</h2>
                                <p className="text-muted-foreground">
                                    Gezi planınızı özelleştirin - {selectedCity}
                                </p>
                            </div>

                            <div className="max-w-2xl mx-auto">
                                <RoutePreferencesForm
                                    userType={selectedUserType}
                                    city={selectedCity}
                                    onSubmit={handleRouteSubmit}
                                    loading={loading}
                                />
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(2)}
                                    disabled={loading}
                                >
                                    Geri Dön
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Neden Rotamda?</h2>
                        <p className="text-gray-600 text-lg">Size özel deneyim için tasarlandı</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Akıllı Rotalar</h3>
                            <p className="text-gray-600">
                                Tercihlerinize göre optimize edilmiş, kişiye özel geziler
                            </p>
                        </div>

                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Kişiselleştirilmiş</h3>
                            <p className="text-gray-600">
                                Aile, genç, solo veya turist - size uygun öneriler
                            </p>
                        </div>

                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Harita Tabanlı</h3>
                            <p className="text-gray-600">
                                Tüm mekanları interaktif harita üzerinde görün
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
