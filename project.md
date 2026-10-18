# Dokumentasi Proyek: Yasin Digital (Buku Yasin & Tahlil Digital)

Aplikasi web modern, responsif, dan interaktif yang berfungsi sebagai **Buku Yasin dan Tahlil Digital** sekaligus media memorial untuk mengenang almarhum dan almarhumah (*alm. Subiyantoro & almah. Emah*).

---

## 📌 Ringkasan Proyek

* **Nama Aplikasi:** Yasin Digital (`yasin-app`)
* **Repositori:** [github.com/duwikachek/yasin-digital](https://github.com/duwikachek/yasin-digital)
* **Kategori:** Web Application / Single Page Application (SPA) Islami & Memorial
* **Platform Target:** Mobile-first (optimal di peramban smartphone, tablet, maupun desktop)

---

## 🚀 Fitur Utama

### 1. Halaman Depan (Memorial & Landing Page)
* **Hero Banner:** Menampilkan foto latar belakang, identitas almarhum/almarhumah (nama, tanggal lahir, dan tanggal wafat), serta tombol aksi cepat untuk langsung membaca Yasin atau Doa Tahlil.
* **Kata Pengantar:** Pembuka dari pihak keluarga dengan tipografi khas yang elegan.
* **Galeri Kenangan Interaktif:** Penampil foto kenangan berbasis kartu ekspansi (*accordion / interactive panels*) yang dapat diklik untuk melihat detail momen.
* **FAQ (Tanya Jawab):** Komponen akordion informasi seputar tata cara dan tujuan aplikasi.

### 2. Modul Bacaan
* **Surat Yasin (`/yasin`):**
  * Teks lengkap 83 ayat dengan tulisan Arab (*Amiri font*), transliterasi Latin, dan terjemahan bahasa Indonesia.
  * Fitur **Font Resizer (A- / A+)** dengan bilah alat *sticky* di atas layar untuk kenyamanan membaca lanjut usia.
* **Doa & Rangkaian Tahlil (`/tahlil`):**
  * Susunan wirid, dzikir, dan doa tahlil lengkap dengan nomor urut, panduan bacaan, dan terjemahan.
* **Menu Bacaan (`/bacaan`):**
  * Halaman navigasi terpusat untuk memilih antara Surat Yasin atau Doa Tahlil.

### 3. Fitur Interaktif
* **Tasbih Digital (`/interaktif`):**
  * Penghitung dzikir layar penuh dengan animasi sentuhan.
  * Dilengkapi umpan balik getar (*Haptic Vibration API*) di perangkat seluler.
  * Penyimpanan otomatis (*Auto-save*) ke `localStorage` agar hitungan tidak hilang saat halaman tertutup.

### 4. Panel Admin & Manajemen Konten (`/admin`)
* **Proteksi Akses:** Dilindungi kata sandi admin (dapat diubah langsung dari dashboard).
* **Editor Konten Live:**
  * Pengubahan judul situs, tagline, dan deskripsi hero.
  * Pengubahan data almarhum (Bapak) dan almarhumah (Ibu).
  * Pengubahan teks Kata Pengantar dan daftar FAQ.
  * Penambahan, pengeditan, atau penghapusan item Galeri Kenangan.
* **Integrasi Unggah Gambar:**
  * Mendukung penyimpanan cloud via **Cloudinary** atau **ImgBB**.
  * Fallback otomatis ke format *Base64 data URL* jika kredensial cloud belum diatur.
* **Sistem Backup & Publikasi Konten:**
  * Perubahan tersimpan seketika di `localStorage` peramban admin.
  * Tombol **Download Konten (`site-content.json`)** untuk mengekspor data yang siap ditimpa ke repositori proyek agar berlaku untuk seluruh pengunjung publik.
  * Fitur **Upload / Import JSON** untuk memindahkan data antar perangkat dengan mudah.

### 5. UI/UX & Tema
* **Mode Gelap & Terang (Dark / Light Theme):** Pengalih tema terintegrasi dengan palet warna natural (*stone* & *emerald*).
* **Tipografi Terkurasi:**
  * Teks Latin: *Merriweather* (Serif) & *Inter* (Sans).
  * Teks Arab: *Amiri* / *Traditional Arabic*.

---

## 🛠️ Tech Stack & Dependensi

| Kategori | Teknologi / Pustaka | Keterangan |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Library UI terkini (`react: ^19.2.8`) |
| **Bundler & Build Tool** | [Vite 8](https://vite.dev/) | Server dev kilat dan bundler produksi (`vite: ^8.2.2`) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) | Manajemen rute SPA (`react-router-dom: ^7.18.3`) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS via `@tailwindcss/vite` |
| **Ikon** | [Lucide React](https://lucide.dev/) | Paket ikon modern (`lucide-react: ^1.43.0`) |
| **Linter** | [Oxlint](https://oxc.rs/) | Linter performa tinggi berbasis Rust |
| **Hosting Gambar** | Cloudinary / ImgBB / Base64 | Client-side upload handler di `src/lib/imageUpload.js` |

---

## 📁 Struktur Direktori

```text
yasin-digital/
├── .env.example                # Template variabel lingkungan hosting gambar
├── index.html                  # HTML entry point aplikasi
├── package.json                # Daftar dependensi & scripts npm
├── project.md                  # Dokumentasi teknis proyek ini
├── vercel.json                 # Konfigurasi rewrite SPA untuk deploy Vercel
├── vite.config.js              # Konfigurasi plugin Vite & Tailwind
│
├── public/                     # Aset statis yang disajikan langsung
│   ├── _redirects              # Aturan rewrite SPA untuk Netlify
│   ├── favicon.svg             # Ikon favicon situs
│   └── hero_bg.jpg             # Foto latar belakang bawaan
│
├── rules/                      # Dokumen standar desain & pedoman UI (Anti-Slop)
│   ├── 01-anti-slop-part1.md
│   ├── 02-anti-slop-part2.md
│   ├── 03-anti-slop-part3.md
│   ├── 04-anti-slop-part4.md
│   └── 05-anti-slop-part5.md
│
└── src/
    ├── App.jsx                 # Routing utama & pembungkus ContentProvider
    ├── index.css               # Setup Tailwind CSS, custom fonts & styling Arab
    ├── main.jsx                # Titik masuk React DOM render
    │
    ├── components/             # Komponen antarmuka yang dapat digunakan ulang
    │   ├── ui/
    │   │   └── interactive-gallery.jsx  # Galeri foto interaktif model accordion
    │   ├── FAQAccordion.jsx    # Daftar akordion tanya jawab
    │   ├── Footer.jsx          # Bagian kaki halaman
    │   ├── Hero.jsx            # Banner foto, memorial almarhum, dan tombol CTA
    │   ├── Navigation.jsx      # Navbar atas dengan toggle tema & menu mobile
    │   ├── ThemeProvider.jsx   # Pengelola state mode gelap/terang
    │   └── theme-context.js    # Definisi context tema
    │
    ├── context/                # Pengelolaan State Aplikasi
    │   ├── ContentContext.jsx  # Sinkronisasi data JSON publik & localStorage
    │   └── content-context.js  # Definisi ContentContext
    │
    ├── data/                   # Basis data statis & konten publik
    │   ├── site-content.json   # Sumber utama teks, data hero, dan galeri web
    │   ├── tahlil.json         # Data susunan bacaan doa tahlil
    │   └── yasin.json          # Data 83 ayat Surat Yasin
    │
    ├── lib/                    # Fungsi utilitas
    │   └── imageUpload.js      # Handler unggah gambar (Cloudinary/ImgBB)
    │
    └── pages/                  # Halaman aplikasi
        ├── AdminPage.jsx       # Dashboard admin pengelola konten
        ├── Galeri.jsx          # Halaman galeri kenangan mandiri
        ├── Home.jsx            # Halaman beranda utama
        ├── InteractiveFeatures.jsx # Halaman Tasbih digital
        ├── ReadingMenu.jsx     # Halaman navigasi pilihan bacaan
        ├── SurahYasin.jsx      # Halaman baca Surat Yasin
        └── Tahlil.jsx          # Halaman baca Doa Tahlil
```

---

## ⚙️ Variabel Lingkungan (`.env`)

Untuk mengaktifkan unggah gambar otomatis langsung ke server penyimpanan awan (agar file JSON tidak membengkak karena Base64), buat file `.env` di direktori utama:

```env
# Opsi 1: Cloudinary (Disarankan - Unsigned Preset)
VITE_CLOUDINARY_CLOUD_NAME=nama_cloud_anda
VITE_CLOUDINARY_UPLOAD_PRESET=preset_unsigned_anda

# Opsi 2: ImgBB (Alternatif sederhana)
VITE_IMGBB_API_KEY=api_key_imgbb_anda
```

*Catatan: Jika variabel di atas tidak diisi, gambar yang diunggah di Panel Admin akan otomatis disimpan sebagai data Base64 lokal.*

---

## 💻 Panduan Menjalankan Proyek

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Aplikasi akan aktif di `http://localhost:5173`.

### 3. Membangun untuk Produksi (Build)
```bash
npm run build
```
Hasil kompilasi siap saji akan berada di folder `dist/`.

### 4. Menjalankan Pratinjau Hasil Build
```bash
npm run preview
```

### 5. Menjalankan Linter
```bash
npm run lint
```

---

## 🌐 Alur Pembaruan Konten ke Produksi

1. Masuk ke halaman **`/admin`** pada browser.
2. Lakukan perubahan teks atau unggah foto yang diinginkan, lalu klik **"Simpan Semua Perubahan"**.
3. Gulir ke bagian **Backup & Transfer Data** lalu klik **"Download Konten (site-content.json)"**.
4. Salin file hasil unduhan tersebut ke folder proyek: `src/data/site-content.json`.
5. Lakukan commit dan push ke GitHub:
   ```bash
   git add src/data/site-content.json
   git commit -m "feat: perbarui konten website"
   git push origin main
   ```
6. Penyedia hosting (seperti Vercel atau Netlify) akan otomatis memproses dan memperbarui tampilan untuk seluruh pengunjung web.

---

## 🚢 Panduan Deployment

* **Vercel:** Konfigurasi rute SPA telah diatur dalam file `vercel.json`. Hubungkan repositori GitHub langsung ke Vercel untuk deployment otomatis.
* **Netlify:** Konfigurasi *redirect* SPA telah disediakan pada `public/_redirects`.
