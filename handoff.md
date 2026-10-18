# Developer Handoff: Yasin Digital

Dokumen ini ditujukan sebagai panduan serah terima (*handoff*) teknis bagi pengembang untuk memahami status terkini proyek, arsitektur data, keputusan teknis, catatan penting (*gotchas*), serta langkah kerja lanjutan.

---

## 📌 Status Terakhir Proyek (Current State)

* **Branch Utama:** `main` (tersinkronisasi dengan `origin/main`)
* **Kondisi Build:** `npm run build` sukses (siap produksi).
* **Pembaruan Terkini:**
  * Konten publik di `src/data/site-content.json` telah diperbarui dengan foto latar belakang Hero dan ke-7 foto kenangan Galeri dalam format Base64 asli.
  * Perubahan telah di-commit dan di-push ke remote GitHub (`commit 0f37ec5`).
  * Konfigurasi rewrite SPA telah aktif untuk deployment di Vercel (`vercel.json`) dan Netlify (`public/_redirects`).

---

## 🏗️ Arsitektur & Pola Alur Data

### 1. Model Konten Hibrida (JSON + LocalStorage)
Aplikasi menggunakan pola arsitektur **Client-First CMS** tanpa backend database terpisah:

```
[src/data/site-content.json] (Konten Default untuk Publik)
               ↓
     [ContentContext.jsx]
         ↙           ↘
 (Jika ada cache)     (Pengunjung Baru)
[localStorage]      [baseContent dari JSON]
```

* **Untuk Pengunjung Umum:** Konten selalu bersumber dari file `src/data/site-content.json`.
* **Untuk Admin di Browser:** Saat admin menyimpan perubahan di `/admin`, perubahan tersebut disimpan langsung ke `localStorage.getItem('yasin_content')`.
* **Proses Publikasi ke Semua Pengunjung:** Admin mengeklik tombol **"Download Konten (site-content.json)"** di menu admin, lalu file tersebut ditimpa ke `src/data/site-content.json` dan di-commit ke Git.

### 2. Penanganan Unggah Gambar (`src/lib/imageUpload.js`)
* Sistem mendukung integrasi *client-side upload* ke **Cloudinary** atau **ImgBB**.
* **Fallback Otomatis:** Jika tidak ada variabel `.env` yang diatur, gambar otomatis dikonversi menjadi *Base64 Data URL* dan disimpan di dalam JSON.
* *Rekomendasi:* Sebaiknya gunakan Cloudinary/ImgBB untuk produksi jangka panjang agar ukuran file JSON tetap kecil dan performa muat halaman lebih optimal.

### 3. Modul Bacaan Al-Qur'an & Doa
* **Dataset Yasin (`src/data/yasin.json`):** Berisi 83 ayat dengan format API equran.id (`nomorAyat`, `ar`, `tr`, `idn`).
* **Dataset Tahlil (`src/data/tahlil.json`):** Berisi rangkaian bacaan doa dan dzikir tahlil.
* Komponen [SurahYasin.jsx](file:///c:/ai/yasin-digital/src/pages/SurahYasin.jsx) memiliki state mandiri untuk ukuran font teks Arab (`fontSize`) dengan bilah alat lengket (*sticky toolbar*).

### 4. Tasbih Digital (`src/pages/InteractiveFeatures.jsx`)
* Menggunakan `localStorage.getItem('tasbihCount')` untuk persistensi hitungan.
* Memanfaatkan `navigator.vibrate()` untuk efek haptic di smartphone.

---

## 🔐 Kredensial & Konfigurasi

| Parameter | Lokasi Penyimpanan | Default / Nilai Saat Ini | Catatan |
| :--- | :--- | :--- | :--- |
| **Password Admin** | `localStorage` / `site-content.json` | `yasin2024` | Dapat diganti langsung melalui halaman `/admin` |
| **Cloudinary** | `.env` (`VITE_CLOUDINARY_*`) | *Belum diset* (menggunakan Base64) | Opsi hosting gambar cloud |
| **ImgBB** | `.env` (`VITE_IMGBB_API_KEY`) | *Belum diset* (menggunakan Base64) | Alternatif hosting gambar |

---

## ⚠️ Catatan Kritis & "Gotchas" (Penting Dipahami)

1. **Cache LocalStorage Pengembang/Admin:**
   * Jika Anda telah membuka website sebelumnya dan melakukan edit di `/admin`, browser Anda menyimpan data di `localStorage`.
   * **Masalah:** Saat file `src/data/site-content.json` diganti di Git, browser Anda mungkin masih menampilkan data lama dari `localStorage`.
   * **Solusi:** Buka `/admin` lalu klik tombol **"Reset Semua"** untuk membersihkan `localStorage`, atau uji menggunakan **Tab Incognito**.

2. **Ukuran Bundle (Base64 Images):**
   * Karena saat ini gambar Hero dan Galeri menggunakan string Base64 langsung di dalam file `site-content.json`, ukuran bundle file JS mencapai ~1.9 MB (gzip ~1.3 MB).
   * **Saran Optimasi:** Jika ingin mempercepat loading pertama kali, pindahkan gambar Base64 ke Cloudinary atau simpan file `.jpg`/`.webp` di folder `public/` lalu rujuk melalui URL relatif (misalnya `/images/galeri-1.jpg`).

3. **Routing SPA Saat Refresh:**
   * Karena aplikasi menggunakan `BrowserRouter`, routing di server produksi membutuhkan rewrite semua URL ke `index.html`.
   * File `vercel.json` dan `public/_redirects` sudah dikonfigurasi untuk menangani hal ini. Jangan hapus kedua file ini.

---

## 🚀 Panduan Memulai Cepat untuk Pengembang Baru

```bash
# 1. Clone repositori
git clone https://github.com/duwikachek/yasin-digital.git
cd yasin-digital

# 2. Install dependensi
npm install

# 3. Jalankan development server
npm run dev

# 4. Akses halaman aplikasi
# Beranda: http://localhost:5173/
# Baca Yasin: http://localhost:5173/yasin
# Doa Tahlil: http://localhost:5173/tahlil
# Tasbih: http://localhost:5173/interaktif
# Admin Panel: http://localhost:5173/admin (Password: yasin2024)
```

---

## 📋 Rekomendasi Pengembangan Lanjutan (Roadmap)

- [ ] **Migrasi Gambar dari Base64 ke Cloud / Aset Publik:** Mengganti foto Base64 di `site-content.json` dengan URL Cloudinary atau file webp di `public/` agar ukuran bundle berkurang drastis.
- [ ] **PWA (Progressive Web App):** Menambahkan `manifest.json` dan service worker agar ayat Yasin dan Tahlil dapat diakses 100% tanpa kuota internet (*offline mode*).
- [x] **Audio Murottal & Font Al-Qur'an Standar:** Integrasi pemutar audio per ayat & full surah, font mushaf resmi (Amiri Quran/Scheherazade New), dan dataset Surat Yasin bersih (Kemenag & Rasm Utsmani).
- [ ] **Buku Tamu / Doa Digital:** Penambahan kolom bagi kerabat untuk mengirimkan untaian doa dan ucapan belasungkawa.
