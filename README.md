# Mimosa Hyundai — Website

Website resmi Mimosa Hyundai Medan. Dihosting di GitHub Pages.

## Cara Update Konten (Admin)

1. Buka `admin.html` di browser
2. Edit produk/promo/info dealer lewat form
3. Klik "Export" → download file JSON
4. Di GitHub repo ini, buka `data/` → upload/replace file JSON
5. Upload foto baru ke folder `images/`
6. Website otomatis update dalam ~1 menit

## Struktur File

- `data/products.json` — data semua produk
- `data/promos.json` — data promo aktif
- `data/dealer.json` — info dealer
- `images/` — foto produk
- `admin.html` — panel CMS (akses manual, tidak di menu publik)
