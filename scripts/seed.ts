import mongoose from "mongoose";
import { connectDB } from "../lib/mongodb";
import { Place } from "../models/Place";
import { Review } from "../models/Review";

const places = [
    {
        name: "Galata Kulesi",
        slug: "galata-kulesi",
        city: "Istanbul",
        description: "İstanbul'un en ünlü simgelerinden biri olan Galata Kulesi, muhteşem şehir manzarası sunar.",
        images: [
            "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800",
        ],
        category: "historical",
        priceLevel: 2,
        audience: ["tourist", "young", "solo", "family"],
        rating: 4.5,
        ratingCount: 1250,
        location: {
            type: "Point",
            coordinates: [28.9744, 41.0256],
        },
    },
    {
        name: "Karaköy Güllüoğlu",
        slug: "karakoy-gulluoglu",
        city: "Istanbul",
        description: "1949'dan beri hizmet veren ünlü baklava ve tatlı dükkanı.",
        images: [
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800",
        ],
        category: "cafe",
        priceLevel: 2,
        audience: ["tourist", "young", "family"],
        rating: 4.7,
        ratingCount: 3420,
        location: {
            type: "Point",
            coordinates: [28.9744, 41.0236],
        },
    },
    {
        name: "Emirgan Korusu",
        slug: "emirgan-korusu",
        city: "Istanbul",
        description: "Boğaz kıyısında yer alan, lale festivali ile ünlü büyük park.",
        images: [
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
        ],
        category: "park",
        priceLevel: 1,
        audience: ["family", "solo", "young"],
        rating: 4.6,
        ratingCount: 890,
        location: {
            type: "Point",
            coordinates: [29.0533, 41.1089],
        },
    },
    {
        name: "İstanbul Modern",
        slug: "istanbul-modern",
        city: "Istanbul",
        description: "Türkiye'nin ilk modern ve çağdaş sanat müzesi.",
        images: [
            "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800",
        ],
        category: "museum",
        priceLevel: 3,
        audience: ["tourist", "young", "solo"],
        rating: 4.4,
        ratingCount: 2100,
        location: {
            type: "Point",
            coordinates: [28.9869, 41.0369],
        },
    },
    {
        name: "Çamlıca Tepesi",
        slug: "camlica-tepesi",
        city: "Istanbul",
        description: "İstanbul'un en yüksek tepelerinden biri, panoramik şehir manzarası.",
        images: [
            "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800",
        ],
        category: "viewpoint",
        priceLevel: 1,
        audience: ["family", "young", "solo", "tourist"],
        rating: 4.5,
        ratingCount: 1560,
        location: {
            type: "Point",
            coordinates: [29.0661, 41.0219],
        },
    },
    {
        name: "Mikla Restaurant",
        slug: "mikla-restaurant",
        city: "Istanbul",
        description: "Marmara Pera Hotel'in çatı katında, muhteşem manzaralı fine dining restoran.",
        images: [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        ],
        category: "restaurant",
        priceLevel: 5,
        audience: ["young", "solo"],
        rating: 4.8,
        ratingCount: 980,
        location: {
            type: "Point",
            coordinates: [28.9869, 41.0369],
        },
    },
    {
        name: "Topkapı Sarayı",
        slug: "topkapi-sarayi",
        city: "Istanbul",
        description: "Osmanlı İmparatorluğu'nun 400 yıl boyunca yönetim merkezi olan tarihi saray.",
        images: [
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800",
        ],
        category: "historical",
        priceLevel: 2,
        audience: ["tourist", "family", "solo"],
        rating: 4.7,
        ratingCount: 5200,
        location: {
            type: "Point",
            coordinates: [28.9833, 41.0115],
        },
    },
    {
        name: "Bebek Parkı",
        slug: "bebek-parki",
        city: "Istanbul",
        description: "Boğaz kıyısında, aileler için ideal bir park ve sahil.",
        images: [
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800",
        ],
        category: "park",
        priceLevel: 1,
        audience: ["family", "young"],
        rating: 4.3,
        ratingCount: 670,
        location: {
            type: "Point",
            coordinates: [29.0431, 41.0833],
        },
    },
    {
        name: "Karaköy Lokantası",
        slug: "karakoy-lokantasi",
        city: "Istanbul",
        description: "Geleneksel Türk mutfağının modern yorumları.",
        images: [
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        ],
        category: "restaurant",
        priceLevel: 3,
        audience: ["tourist", "young", "family"],
        rating: 4.6,
        ratingCount: 1890,
        location: {
            type: "Point",
            coordinates: [28.9744, 41.0236],
        },
    },
    {
        name: "Miniatürk",
        slug: "miniaturk",
        city: "Istanbul",
        description: "Türkiye ve Osmanlı eserlerinin minyatürlerinin sergilendiği açık hava müzesi.",
        images: [
            "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800",
        ],
        category: "entertainment",
        priceLevel: 2,
        audience: ["family", "tourist"],
        rating: 4.4,
        ratingCount: 3200,
        location: {
            type: "Point",
            coordinates: [28.9481, 41.0606],
        },
    },
    {
        name: "Maiden's Tower",
        slug: "maidens-tower",
        city: "Istanbul",
        description: "Boğaz'ın ortasında tarihi bir kule, restoran ve kafe.",
        images: [
            "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
        ],
        category: "historical",
        priceLevel: 3,
        audience: ["tourist", "young", "solo"],
        rating: 4.5,
        ratingCount: 2100,
        location: {
            type: "Point",
            coordinates: [29.0042, 41.0211],
        },
    },
    {
        name: "Ortaköy Meydanı",
        slug: "ortakoy-meydani",
        city: "Istanbul",
        description: "Boğaz kıyısında canlı bir meydan, kumpir ve waffle ile ünlü.",
        images: [
            "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800",
        ],
        category: "entertainment",
        priceLevel: 2,
        audience: ["young", "family", "tourist"],
        rating: 4.4,
        ratingCount: 4500,
        location: {
            type: "Point",
            coordinates: [29.0264, 41.0553],
        },
    },
    {
        name: "Balat Sokakları",
        slug: "balat-sokaklari",
        city: "Istanbul",
        description: "Renkli evleri ve tarihi dokusuyla Instagram'ın favorisi.",
        images: [
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800",
        ],
        category: "historical",
        priceLevel: 1,
        audience: ["young", "solo", "tourist"],
        rating: 4.6,
        ratingCount: 1800,
        location: {
            type: "Point",
            coordinates: [28.9486, 41.0297],
        },
    },
    {
        name: "Vialand Theme Park",
        slug: "vialand-theme-park",
        city: "Istanbul",
        description: "İstanbul'un en büyük tema parkı, aileler için ideal.",
        images: [
            "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800",
        ],
        category: "entertainment",
        priceLevel: 4,
        audience: ["family", "young"],
        rating: 4.3,
        ratingCount: 6700,
        location: {
            type: "Point",
            coordinates: [28.8156, 41.0756],
        },
    },
    {
        name: "Süleymaniye Camii",
        slug: "suleymaniye-camii",
        city: "Istanbul",
        description: "Mimar Sinan'ın şaheseri, muhteşem mimari ve huzurlu atmosfer.",
        images: [
            "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
        ],
        category: "historical",
        priceLevel: 1,
        audience: ["tourist", "solo", "family"],
        rating: 4.8,
        ratingCount: 4200,
        location: {
            type: "Point",
            coordinates: [28.9639, 41.0167],
        },
    },
    // ANKARA PLACES
    {
        name: "Anıtkabir",
        slug: "anitkabir",
        city: "Ankara",
        description: "Atatürk'ün anıt mezarı, Türkiye'nin en önemli tarihi yapılarından biri.",
        images: ["https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800"],
        category: "historical",
        priceLevel: 1,
        audience: ["tourist", "family", "solo"],
        rating: 4.9,
        ratingCount: 8500,
        location: { type: "Point", coordinates: [32.8369, 39.9250] },
    },
    {
        name: "Ankara Kalesi",
        slug: "ankara-kalesi",
        city: "Ankara",
        description: "Tarihi Ankara Kalesi ve çevresindeki otantik sokaklar.",
        images: ["https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800"],
        category: "historical",
        priceLevel: 1,
        audience: ["tourist", "young", "solo", "family"],
        rating: 4.5,
        ratingCount: 3200,
        location: { type: "Point", coordinates: [32.8644, 39.9400] },
    },
    {
        name: "Kuğulu Park",
        slug: "kugulu-park",
        city: "Ankara",
        description: "Ankara'nın en ünlü parkı, kuğuları ve yeşil alanlarıyla.",
        images: ["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800"],
        category: "park",
        priceLevel: 1,
        audience: ["family", "young", "solo"],
        rating: 4.4,
        ratingCount: 2100,
        location: { type: "Point", coordinates: [32.8597, 39.9042] },
    },
    {
        name: "CerModern",
        slug: "cermodern-ankara",
        city: "Ankara",
        description: "Eski tren atölyesinden dönüştürülmüş modern sanat merkezi.",
        images: ["https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800"],
        category: "museum",
        priceLevel: 2,
        audience: ["young", "solo", "tourist"],
        rating: 4.6,
        ratingCount: 1800,
        location: { type: "Point", coordinates: [32.8542, 39.9208] },
    },
    {
        name: "Tunalı Hilmi Caddesi",
        slug: "tunali-hilmi-ankara",
        city: "Ankara",
        description: "Ankara'nın en canlı caddesi, kafeler ve restoranlarla dolu.",
        images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"],
        category: "cafe",
        priceLevel: 3,
        audience: ["young", "solo"],
        rating: 4.5,
        ratingCount: 2400,
        location: { type: "Point", coordinates: [32.8542, 39.9042] },
    },
    {
        name: "Nusr-Et Steakhouse Ankara",
        slug: "nusret-ankara",
        city: "Ankara",
        description: "Ünlü et restoranı, özel günler için ideal.",
        images: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"],
        category: "restaurant",
        priceLevel: 5,
        audience: ["young", "family"],
        rating: 4.7,
        ratingCount: 3200,
        location: { type: "Point", coordinates: [32.8597, 39.9125] },
    },
    // IZMIR PLACES
    {
        name: "Kordon",
        slug: "kordon-izmir",
        city: "Izmir",
        description: "İzmir'in en ünlü sahil şeridi, yürüyüş ve bisiklet için ideal.",
        images: ["https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800"],
        category: "viewpoint",
        priceLevel: 1,
        audience: ["family", "young", "solo", "tourist"],
        rating: 4.6,
        ratingCount: 4500,
        location: { type: "Point", coordinates: [27.1428, 38.4192] },
    },
    {
        name: "Kemeraltı Çarşısı",
        slug: "kemeralti-carsisi",
        city: "Izmir",
        description: "Tarihi çarşı, alışveriş ve yerel lezzetler için mükemmel.",
        images: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"],
        category: "entertainment",
        priceLevel: 2,
        audience: ["tourist", "family", "young"],
        rating: 4.5,
        ratingCount: 3800,
        location: { type: "Point", coordinates: [27.1384, 38.4189] },
    },
    {
        name: "Alsancak",
        slug: "alsancak-izmir",
        city: "Izmir",
        description: "İzmir'in en canlı semti, kafeler ve restoranlarla dolu.",
        images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"],
        category: "cafe",
        priceLevel: 3,
        audience: ["young", "solo"],
        rating: 4.7,
        ratingCount: 2900,
        location: { type: "Point", coordinates: [27.1469, 38.4378] },
    },
    // ANTALYA PLACES
    {
        name: "Kaleiçi",
        slug: "kaleici-antalya",
        city: "Antalya",
        description: "Antalya'nın tarihi merkezi, dar sokakları ve otantik yapılarıyla.",
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"],
        category: "historical",
        priceLevel: 2,
        audience: ["tourist", "family", "solo"],
        rating: 4.7,
        ratingCount: 5600,
        location: { type: "Point", coordinates: [30.7056, 36.8842] },
    },
    {
        name: "Düden Şelalesi",
        slug: "duden-selalesi",
        city: "Antalya",
        description: "Muhteşem şelale ve doğa manzarası.",
        images: ["https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800"],
        category: "viewpoint",
        priceLevel: 1,
        audience: ["family", "tourist", "young"],
        rating: 4.6,
        ratingCount: 4200,
        location: { type: "Point", coordinates: [30.7425, 36.9081] },
    },
    {
        name: "Konyaaltı Plajı",
        slug: "konyaalti-plaji",
        city: "Antalya",
        description: "Antalya'nın en popüler plajı, deniz ve güneş keyfi.",
        images: ["https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800"],
        category: "park",
        priceLevel: 1,
        audience: ["family", "young", "tourist"],
        rating: 4.5,
        ratingCount: 6800,
        location: { type: "Point", coordinates: [30.6186, 36.8597] },
    },
];

async function seed() {
    try {
        await connectDB();
        console.log("✅ MongoDB bağlantısı başarılı");

        // Clear existing data
        await Place.deleteMany({});
        await Review.deleteMany({});
        console.log("🗑️  Eski veriler temizlendi");

        // Insert places
        const insertedPlaces = await Place.insertMany(places);
        console.log(`✅ ${insertedPlaces.length} mekan eklendi`);

        // Add some sample reviews
        const sampleReviews = [
            {
                placeId: insertedPlaces[0]._id,
                userName: "Ahmet Y.",
                rating: 5,
                comment: "Muhteşem manzara! Mutlaka görülmeli.",
            },
            {
                placeId: insertedPlaces[0]._id,
                userName: "Zeynep K.",
                rating: 4,
                comment: "Biraz kalabalıktı ama yine de güzeldi.",
            },
            {
                placeId: insertedPlaces[1]._id,
                userName: "Mehmet A.",
                rating: 5,
                comment: "En iyi baklava burada! Fiyatlar da uygun.",
            },
            {
                placeId: insertedPlaces[3]._id,
                userName: "Ayşe T.",
                rating: 4,
                comment: "Sanat severler için harika bir müze.",
            },
        ];

        await Review.insertMany(sampleReviews);
        console.log(`✅ ${sampleReviews.length} yorum eklendi`);

        console.log("\n🎉 Seed işlemi tamamlandı!");
        console.log("\n📊 Özet:");
        console.log(`   - Mekan sayısı: ${insertedPlaces.length}`);
        console.log(`   - Yorum sayısı: ${sampleReviews.length}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Seed hatası:", error);
        process.exit(1);
    }
}

seed();
