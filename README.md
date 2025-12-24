# 🌟 Belajar IPA untuk Siswa SD

Website pembelajaran Ilmu Pengetahuan Alam (IPA) yang interaktif dan menyenangkan untuk siswa SD! Dibuat dengan desain playful & colorful yang cocok untuk anak-anak.

## ✨ Fitur Utama

- 🎨 **Desain Playful & Colorful**: Warna-warna cerah dan menarik untuk anak-anak
- 📚 **3 Topik Pembelajaran**:
  - 🐾 Dunia Hewan (Hewan Menyusui, Burung, Ikan)
  - 🌱 Dunia Tumbuhan (Fotosintesis, Bunga, Pohon)
  - 🌌 Alam Semesta (Tata Surya, Planet, Bintang)
- 📖 **Materi Lengkap**: Setiap topik memiliki beberapa pelajaran dengan poin penting dan fakta seru
- 🎮 **Kuis Interaktif**: Kuis dengan scoring untuk menguji pemahaman
- 💡 **Fakta Seru**: Informasi menarik yang membuat anak-anak lebih tertarik
- 📱 **Responsif**: Tampilan optimal di semua perangkat (mobile, tablet, desktop)
- 🌓 **Dark Mode Support**: Mendukung tema gelap untuk kenyamanan mata

## 🚀 Cara Menggunakan

1. **Buka Halaman Utama**: Pilih topik yang kamu suka!
2. **Baca Materi**: Pelajari materi pelajaran dengan poin penting dan fakta seru
3. **Mainkan Kuis**: Uji pengetahuanmu dengan kuis interaktif
4. **Dapatkan Skor**: Lihat nilai kamu dan terus belajar!

## 🎨 Tema Warna

Website ini menggunakan palet warna playful yang cerah:
- 💗 Pink (Primary) - Warna utama yang ceria
- 🧡 Orange (Secondary) - Warna aksen yang hangat
- 💛 Yellow (Accent) - Warna cerah dan ceria
- 💚 Green (Success) - Warna untuk keberhasilan
- 💙 Blue (Info) - Warna untuk informasi
- 💜 Purple (Space) - Warna misterius dan menarik

## 📱 Responsivitas

Website ini didesain dengan pendekatan mobile-first:
- **Mobile**: Layout optimal untuk layar kecil (375px+)
- **Tablet**: Tampilan enhanced untuk tablet (768px+)
- **Desktop**: Layout penuh untuk desktop (1024px+)
- **Touch-friendly**: Elemen interaktif minimal 44px untuk kemudahan sentuhan

## 🛠️ Teknologi

- **Framework**: Next.js 15 dengan App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Icons**: Lucide Icons
- **Animations**: CSS animations dan transitions

## 📦 Instalasi

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build untuk production
bun run build

# Run lint untuk cek kualitas kode
bun run lint
```

## 🌐 Deployment di GitHub Pages

Website ini dapat di-deploy di GitHub Pages dengan mudah:

### Opsi 1: Menggunakan GitHub Actions

1. Buat file `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      - name: Install dependencies
        run: bun install
      - name: Build
        run: bun run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Update `next.config.ts`:
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

3. Push ke GitHub dan Actions akan otomatis deploy!

### Opsi 2: Manual Deployment

```bash
# Build website
bun run build

# Folder output akan ada di /out
# Upload isi folder /out ke GitHub Pages
```

## 📚 Konten Pendidikan

### Topik 1: Dunia Hewan
- Hewan Menyusui: Kenali hewan yang memberi makan anak dengan susu
- Burung-burung: Tahu tentang burung dan keunikannya
- Ikan Air: Pelajari habitat dan ciri-ciri ikan

### Topik 2: Dunia Tumbuhan
- Fotosintesis: Cara tumbuhan membuat makanan
- Bunga-bunga Indah: Keindahan dan fungsi bunga
- Pohon-pohon Rindang: Manfaat pohon bagi kita

### Topik 3: Alam Semesta
- Tata Surya: Kenali keluarga besar kita di angkasa
- Planet-planet: Uniknya setiap planet
- Bintang Berkelip: Kecantikan bintang di langit malam

## 🎓 Tips Belajar untuk Anak-anak

1. **Belajar di Waktu Favorit**: Pilih waktu ketika kamu paling semangat
2. **Praktek yang Seru**: Coba eksperimen sederhana di rumah
3. **Tanya Banyak Hal**: Jangan takut bertanya untuk menambah pengetahuan
4. **Ulangi Materi**: Baca materi berkali-kali untuk lebih paham
5. **Mainkan Kuis**: Uji pengetahuanmu dengan kuis yang tersedia

## 🤝 Kontribusi

Kontribusi sangat diapresiasi! Jika ingin menambah materi, fitur, atau perbaikan:

1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📄 Lisensi

Project ini dibuat untuk tujuan pendidikan dan dapat digunakan secara bebas.

## 🌟 Credits

Dibuat dengan ❤️ untuk siswa SD yang cerdas dan penasaran!

---

**Happy Learning! 🎉**
