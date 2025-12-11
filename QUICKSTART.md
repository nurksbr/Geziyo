# Geziyo - Quick Start Guide

## 🚀 Hızlı Başlangıç

### 1. Environment Variables Ayarlayın

`.env.local` dosyası oluşturuldu, ancak **gerçek değerleri girmeniz gerekiyor**:

#### MongoDB Kurulumu (2 seçenek)

**Seçenek A: MongoDB Atlas (Önerilen - Ücretsiz)**
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)'a gidin
2. Ücretsiz hesap oluşturun
3. "Create Cluster" → Free tier seçin
4. Database Access → Add User (username/password)
5. Network Access → Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)
6. Clusters → Connect → "Connect your application"
7. Connection string'i kopyalayın
8. `.env.local` dosyasında `MONGODB_URI` değerini güncelleyin:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rotamda?retryWrites=true&w=majority
   ```

**Seçenek B: Yerel MongoDB**
```bash
# macOS (Homebrew ile)
brew install mongodb-community
brew services start mongodb-community

# .env.local'de:
MONGODB_URI=mongodb://localhost:27017/rotamda
```

#### Mapbox Token Alın (Ücretsiz)
1. [Mapbox](https://www.mapbox.com/) hesabı oluşturun
2. Account → Tokens → "Create a token"
3. Token'ı kopyalayın
4. `.env.local` dosyasında `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` değerini güncelleyin

### 2. Seed Data Yükleyin

```bash
npm run seed
```

Bu komut 15 örnek mekan ekleyecek (Galata Kulesi, Topkapı Sarayı, vb.)

### 3. Development Server'ı Yeniden Başlatın

```bash
# Mevcut sunucuyu durdurun (Ctrl+C)
npm run dev
```

### 4. Uygulamayı Açın

http://localhost:3000

---

## ⚠️ Şu Anki Durum

- ✅ Proje kurulumu tamamlandı
- ⚠️ MongoDB bağlantısı gerekiyor
- ⚠️ Mapbox token gerekiyor
- ⏳ Seed data yüklenmedi

---

## 🐛 Sorun Giderme

### "Unexpected token '<'" Hatası
Bu hata MongoDB'ye bağlanılamadığında oluşur. Çözüm:
1. `.env.local` dosyasını düzenleyin
2. Geçerli bir MongoDB URI girin
3. Dev server'ı yeniden başlatın

### Harita Görünmüyor
1. `.env.local` dosyasında `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` değerini kontrol edin
2. Token'ın geçerli olduğundan emin olun
3. Sayfayı yenileyin

### Seed Hatası
1. MongoDB bağlantısının çalıştığından emin olun
2. `npm run seed` komutunu tekrar çalıştırın

---

## 📝 Sonraki Adımlar

1. ✅ `.env.local` oluşturuldu
2. ⏳ MongoDB Atlas hesabı oluşturun
3. ⏳ Mapbox token alın
4. ⏳ `.env.local` dosyasını güncelleyin
5. ⏳ `npm run seed` çalıştırın
6. ⏳ Uygulamayı test edin

---

**Yardım için**: README.md dosyasına bakın
