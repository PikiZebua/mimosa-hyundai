# Mimosa Hyundai Website — Design Spec
Date: 2026-06-20

## Overview

Website katalog produk Mimosa Hyundai Medan yang dapat diakses publik via GitHub Pages. Tujuan utama: memudahkan calon pembeli melihat lineup produk, harga OTR Medan, dan menghubungi sales. Konten dikelola oleh admin dealer tanpa database melalui Admin Panel HTML yang menghasilkan file JSON.

## Tech Stack

- **HTML + Tailwind CSS (CDN)** — no build step, pure static
- **Vanilla JavaScript** — fetch JSON, render DOM
- **GitHub Pages** — hosting gratis, deploy otomatis dari repo
- **No database, no backend** — semua data di file JSON di repo

## Design System

- **Warna utama**: `#003876` (Hyundai Navy Blue), `#1565C0` (Hyundai Light Blue)
- **Warna aksen**: `#90CAF9` (highlight), `#FF6F00` (CTA/WhatsApp)
- **Background**: `#FFFFFF` + `#F8F9FA` (card backgrounds)
- **Typography**: System font stack, bold headings, readable body
- **Style**: Clean & Trustworthy White — profesional, mudah dibaca, semua segmen

## Halaman & Struktur File

```
mimosa-hyundai/
├── index.html          # Homepage
├── catalog.html        # Semua produk + filter
├── product.html        # Detail produk (load dari ?id= query param)
├── promo.html          # Promo & penawaran
├── about.html          # Profil dealer
├── admin.html          # CMS Panel (tidak dilink di nav publik)
├── data/
│   ├── products.json   # Array semua produk
│   ├── promos.json     # Array promo aktif
│   └── dealer.json     # Info dealer (nama, alamat, WA, jam buka)
├── images/             # Foto produk di-upload manual
│   └── placeholder.jpg
└── js/
    └── app.js          # Shared utilities: loadJSON(), renderCards(), formatPrice()
```

## Halaman Detail

### 1. Homepage (index.html)
- **Navbar**: Logo Mimosa Hyundai + tagline "Authorized Dealer Medan", link Produk / Promo / Profil / Kontak
- **Hero Featured Split**:
  - Kiri (60%): Produk yang di-flag `featured: true` di JSON — foto besar, nama, harga mulai, tombol "Lihat Detail" + "Test Drive (WA)"
  - Kanan (40%): List 4–5 produk lain dengan foto thumb, nama, harga, arrow link ke detail
  - Featured dapat dirotasi dengan mengganti flag di JSON
- **Stats Bar**: "X Model Tersedia", "Harga OTR Medan", "Authorized Dealer", "Chat WA"
- **Footer**: Alamat, nomor telepon, jam operasional, link sosmed

### 2. Katalog (catalog.html)
- Filter pill: Semua / SUV / Electric / Hybrid / MPV (filter dari field `category` di JSON)
- Grid 3 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile)
- Tiap card: foto, nama model, kategori badge, harga mulai, tombol "Detail"
- Sort: default urutan JSON, bisa diurutkan by harga

### 3. Detail Produk (product.html?id=santa-fe)
- Load produk dari `products.json` berdasarkan query param `?id=`
- Foto gallery (1 foto utama + thumbnail baris)
- Nama model, tahun, deskripsi panjang
- Tabel varian & harga (misal: Prime A/T, Calligraphy A/T, dll.)
- Spesifikasi teknis (mesin, transmisi, kapasitas, dll.)
- Tombol CTA: "Hubungi Sales via WhatsApp" (buka WA dengan pesan preset)
- Catatan harga OTR dan *matte color premium*

### 4. Promo (promo.html)
- Load dari `promos.json`
- Card tiap promo: judul, deskripsi, periode berlaku, produk terkait
- CTA ke detail produk atau WA

### 5. Profil Dealer (about.html)
- Load dari `dealer.json`
- Nama dealer, alamat lengkap, nomor telepon, email, jam operasional
- Embed Google Maps iframe (URL dikonfigurasi di dealer.json)
- Nama-nama sales (opsional, bisa ditambah ke dealer.json)

### 6. Admin Panel (admin.html)
- Tidak dilink dari navigasi publik — akses manual via URL
- Tab: **Produk** | **Promo** | **Info Dealer**
- **Tab Produk**:
  - List produk existing (load dari products.json yang ada di repo)
  - Form tambah/edit: nama, slug/id, kategori, tahun, deskripsi, featured (toggle), foto URL/path, array varian [{nama, harga}], spesifikasi [{key, value}]
  - Upload foto: input file → konversi ke base64 preview (foto aktual di-upload manual ke GitHub)
  - Tombol "Export products.json" → download file JSON hasil edit
- **Tab Promo**: form tambah/edit promo → export promos.json
- **Tab Dealer**: edit info dealer → export dealer.json
- Instruksi inline: "Setelah download, upload file ke folder data/ di GitHub repo Anda"

## Data Schema

### products.json
```json
[
  {
    "id": "palisade-hev",
    "name": "Palisade HEV",
    "year": 2026,
    "category": "SUV",
    "subcategory": "Hybrid",
    "featured": true,
    "tagline": "The All-New Hyundai Palisade HEV",
    "description": "...",
    "image": "images/palisade-hev.jpg",
    "gallery": ["images/palisade-hev-2.jpg"],
    "priceStart": 1138900000,
    "variants": [
      { "name": "Signature", "price": 1138900000 },
      { "name": "Calligraphy", "price": 1311700000 },
      { "name": "Calligraphy AWD", "price": 1398800000 }
    ],
    "specs": [
      { "key": "Mesin", "value": "1.6L Turbo Hybrid" },
      { "key": "Transmisi", "value": "6-Speed DCT" }
    ],
    "notes": ["*Matte Color +3,500,000"]
  }
]
```

### dealer.json
```json
{
  "name": "Mimosa Hyundai",
  "tagline": "Authorized Dealer Medan",
  "address": "Jl. K.L. Yos Sudarso No. 5 Medan",
  "phone": "+62...",
  "whatsapp": "+62...",
  "email": "...",
  "hours": "Senin–Sabtu 08.00–17.00",
  "mapsEmbed": "https://maps.google.com/...",
  "instagram": "...",
  "facebook": "..."
}
```

## CMS Workflow (untuk Admin)

1. Buka `admin.html` di browser lokal
2. Isi/edit form produk (nama, harga, kategori, spesifikasi, dll.)
3. Upload foto ke GitHub repo di folder `images/` (lewat GitHub UI atau git)
4. Isi path foto di form (contoh: `images/palisade-hev.jpg`)
5. Klik "Export products.json" → file ter-download
6. Di GitHub repo, buka `data/products.json` → klik Edit → paste isi file baru → Commit
7. GitHub Pages auto-deploy dalam ~1 menit — website langsung update

## GitHub Pages Setup

- Repo: `github.com/[username]/mimosa-hyundai` (public)
- Branch: `main`
- Pages source: `main` branch, root `/`
- URL: `https://[username].github.io/mimosa-hyundai/`

## Responsive Breakpoints

- Mobile (<640px): 1 kolom, hamburger menu
- Tablet (640–1024px): 2 kolom grid, nav scroll
- Desktop (>1024px): Featured Split full, 3 kolom katalog

## WhatsApp Integration

- Tombol float di semua halaman (pojok kanan bawah, warna #25D366)
- Di halaman detail produk: pesan preset "Halo, saya tertarik dengan [Nama Mobil]. Bisa info lebih lanjut?"
- Nomor WA dikonfigurasi di `dealer.json`
