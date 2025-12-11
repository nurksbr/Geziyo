# Rotamda - Şehir Keşif & Akıllı Rota Uygulaması

Kullanıcıların şehirleri keşfetmesini kolaylaştıran, kişiselleştirilmiş rota önerileri sunan, harita tabanlı bir web uygulaması.

## 🚀 Özellikler

- ✨ **Kişiselleştirilmiş Rotalar**: Kullanıcı tipine göre (aile, genç, tek gezen, turist) özel rota önerileri
- 🗺️ **Harita Tabanlı Keşif**: Mapbox ile interaktif harita deneyimi
- 🎯 **Akıllı Filtreleme**: Kategori, bütçe, süre ve yürüme tercihine göre filtreleme
- ⭐ **Yorum ve Puanlama**: Mekanlar için kullanıcı yorumları ve puanlama sistemi
- 📱 **Responsive Tasarım**: Mobil, tablet ve desktop uyumlu

## 🛠️ Teknoloji Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS
- **UI Components**: ShadCN UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB + Mongoose
- **Map**: Mapbox GL JS
- **Deployment**: Vercel (önerilen)

## 📦 Kurulum

### Gereksinimler

- Node.js 18+ 
- MongoDB (yerel veya MongoDB Atlas)
- Mapbox hesabı ve API token

### Adımlar

1. **Projeyi klonlayın**
\`\`\`bash
git clone <repo-url>
cd rotamda
\`\`\`

2. **Bağımlılıkları yükleyin**
\`\`\`bash
npm install
\`\`\`

3. **Environment variables ayarlayın**

\`.env.local\` dosyası oluşturun:

\`\`\`env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rotamda?retryWrites=true&w=majority

# Mapbox
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_token_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

4. **Veritabanını seed edin**
\`\`\`bash
npm run seed
\`\`\`

5. **Development server'ı başlatın**
\`\`\`bash
npm run dev
\`\`\`

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📁 Proje Yapısı

\`\`\`
rotamda/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── explore/           # Explore page
│   ├── places/[slug]/     # Place detail page
│   ├── routes/[id]/       # Route detail page
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── map/              # Map components
│   ├── place/            # Place components
│   ├── route/            # Route components
│   ├── form/             # Form components
│   └── ui/               # ShadCN UI components
├── lib/                   # Utility functions
├── models/                # Mongoose models
├── scripts/               # Utility scripts
└── types/                 # TypeScript types
\`\`\`

## 🔌 API Endpoints

### Places
- \`GET /api/places\` - Mekan listesi (filtreleme ile)
- \`GET /api/places/[slug]\` - Tek mekan detayı

### Reviews
- \`POST /api/reviews\` - Yorum ekle

### Routes
- \`POST /api/routes/generate\` - Akıllı rota oluştur
- \`GET /api/routes/[id]\` - Rota detayı

## 🗺️ Mapbox Kurulumu

1. [Mapbox](https://www.mapbox.com/) hesabı oluşturun
2. Access token alın
3. \`.env.local\` dosyasına \`NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN\` olarak ekleyin

## 🌱 Seed Data

Proje, İstanbul'daki 15 örnek mekan ile birlikte gelir:
- Galata Kulesi
- Topkapı Sarayı
- İstanbul Modern
- Emirgan Korusu
- ve daha fazlası...

Seed script'i çalıştırmak için:
\`\`\`bash
npm run seed
\`\`\`

## 🚀 Production Deployment

### Vercel ile Deploy

1. Vercel hesabı oluşturun
2. GitHub repo'nuzu bağlayın
3. Environment variables'ları Vercel dashboard'dan ekleyin
4. Deploy edin!

### MongoDB Atlas

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) hesabı oluşturun
2. Cluster oluşturun (free tier yeterli)
3. Database user ve network access ayarlayın
4. Connection string'i \`MONGODB_URI\` olarak kullanın

## 📝 Scripts

- \`npm run dev\` - Development server
- \`npm run build\` - Production build
- \`npm run start\` - Production server
- \`npm run lint\` - ESLint
- \`npm run seed\` - Seed database

## 🎨 Özelleştirme

### Yeni Şehir Ekleme

1. \`scripts/seed.ts\` dosyasına yeni mekanlar ekleyin
2. \`city\` alanını yeni şehir adıyla güncelleyin
3. Seed script'i çalıştırın

### Yeni Kategori Ekleme

1. Kategoriyi ilgili component'lerde ekleyin (\`PlaceCard.tsx\`, \`RoutePreferencesForm.tsx\`)
2. Seed data'ya yeni kategoride mekanlar ekleyin

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Commit edin (\`git commit -m 'Add amazing feature'\`)
4. Push edin (\`git push origin feature/amazing-feature\`)
5. Pull Request açın

## 📄 Lisans

MIT

## 👤 Geliştirici

Fevziye Nur Kesebir

---

**Not**: Bu proje MVP (Minimum Viable Product) aşamasındadır. Gelecek versiyonlarda kullanıcı hesapları, favoriler, sosyal özellikler ve daha fazlası eklenecektir.
