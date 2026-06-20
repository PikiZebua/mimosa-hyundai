# Mimosa Hyundai Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully static Hyundai dealer website (Mimosa Hyundai Medan) with product catalog, detail pages, promo, about, and an HTML-based CMS admin panel — deployable to GitHub Pages with zero backend.

**Architecture:** All pages are static HTML files. Data lives in JSON files under `data/`. A shared `js/app.js` provides utility functions (`loadJSON`, `formatPrice`, `buildWhatsAppLink`). Each page fetches its own JSON on load and renders the DOM with vanilla JS. The admin panel (`admin.html`) manages JSON in-browser and exports downloadable files.

**Tech Stack:** HTML5, Tailwind CSS (CDN v3), Vanilla JS (ES6+), GitHub Pages

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Homepage — navbar, featured split hero, stats bar, footer |
| `catalog.html` | Product grid with category filter pills and sort |
| `product.html` | Single product detail — gallery, variants table, specs, WA CTA |
| `promo.html` | Promo cards loaded from promos.json |
| `about.html` | Dealer profile — address, hours, maps embed |
| `admin.html` | CMS panel — tabs for Products / Promos / Dealer, export JSON |
| `js/app.js` | Shared: `loadJSON()`, `formatPrice()`, `buildWhatsAppLink()`, `renderNavbar()`, `renderFooter()`, `initWAButton()` |
| `data/products.json` | All product data per schema |
| `data/promos.json` | Active promos array |
| `data/dealer.json` | Dealer info, WA number, maps URL |
| `images/placeholder.jpg` | Fallback image when product image missing |
| `.nojekyll` | Prevent GitHub Pages Jekyll processing |
| `README.md` | Deployment guide for admin |

---

## Task 1: Project Scaffold & Data Files

**Files:**
- Create: `data/products.json`
- Create: `data/promos.json`
- Create: `data/dealer.json`
- Create: `images/placeholder.jpg` (via curl)
- Create: `.nojekyll`
- Create: `README.md`

- [ ] **Step 1: Initialize git repo**

```bash
cd /Users/mac/Dev/mimosa-hyundai
git init
echo ".superpowers/" >> .gitignore
echo "*.DS_Store" >> .gitignore
```

- [ ] **Step 2: Create `.nojekyll` and folder structure**

```bash
touch .nojekyll
mkdir -p data images js
```

- [ ] **Step 3: Create `data/dealer.json`**

```json
{
  "name": "Mimosa Hyundai",
  "tagline": "Authorized Dealer Medan",
  "company": "PT Shinari Putra Kencana",
  "address": "Jl. K.L. Yos Sudarso No. 5 Medan",
  "phone": "+6261XXXXXXX",
  "whatsapp": "+628XXXXXXXXXX",
  "email": "info@mimosahyundai.com",
  "website": "mimosahyundai.com",
  "hours": "Senin–Sabtu 08.00–17.00 WIB",
  "mapsEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0!2d98.67!3d3.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMzUnMjQuMCJOMjLCsDQwJzEyLjAiRQ!5e0!3m2!1sen!2sid!4v1234567890",
  "instagram": "https://instagram.com/mimosahyundai",
  "facebook": "https://facebook.com/mimosahyundai",
  "sales": [
    { "name": "Hyundai Yos Sudarso", "phone": "+628XXXXXXXXXX" }
  ]
}
```

- [ ] **Step 4: Create `data/products.json`** with all 7 models from brosur

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
    "description": "Palisade HEV hadir sebagai SUV premium 7-penumpang dengan sistem hybrid canggih yang menggabungkan performa luar biasa dengan efisiensi bahan bakar. Desain eksterior yang commanding dengan interior mewah menjadikannya pilihan ideal untuk keluarga modern yang aktif.",
    "image": "images/palisade-hev.jpg",
    "gallery": [],
    "priceStart": 1138900000,
    "variants": [
      { "name": "Signature", "price": 1138900000 },
      { "name": "Calligraphy", "price": 1311700000 },
      { "name": "Calligraphy AWD", "price": 1398800000 }
    ],
    "specs": [
      { "key": "Mesin", "value": "1.6L Turbo GDi Hybrid" },
      { "key": "Transmisi", "value": "6-Speed DCT" },
      { "key": "Kapasitas", "value": "7 Penumpang" },
      { "key": "Penggerak", "value": "FWD / AWD (Calligraphy AWD)" }
    ],
    "notes": ["*Matte Color +Rp 3.500.000"]
  },
  {
    "id": "santa-fe",
    "name": "Santa Fe",
    "year": 2026,
    "category": "SUV",
    "subcategory": "Hybrid",
    "featured": false,
    "tagline": "The All-New Hyundai Santa Fe",
    "description": "Santa Fe generasi terbaru tampil dengan desain kotak yang bold dan maskulin. Tersedia dalam pilihan mesin Hybrid 2.5L dan Gasoline 2.5L, Santa Fe menawarkan fleksibilitas sesuai kebutuhan Anda.",
    "image": "images/santa-fe.jpg",
    "gallery": [],
    "priceStart": 743000000,
    "variants": [
      { "name": "Hybrid Prime", "price": 834600000 },
      { "name": "Hybrid Calligraphy", "price": 921900000 },
      { "name": "Hybrid XRT", "price": 939600000 },
      { "name": "2.5 Gasoline Prime A/T", "price": 743000000 },
      { "name": "2.5 Gasoline Calligraphy A/T", "price": 832500000 }
    ],
    "specs": [
      { "key": "Mesin Hybrid", "value": "2.5L GDi Hybrid" },
      { "key": "Mesin Gasoline", "value": "2.5L MPI" },
      { "key": "Transmisi", "value": "Automatic" },
      { "key": "Kapasitas", "value": "7 Penumpang" }
    ],
    "notes": ["*Matte Color +Rp 3.500.000"]
  },
  {
    "id": "kona-ev",
    "name": "Kona EV",
    "year": 2026,
    "category": "SUV",
    "subcategory": "Electric",
    "featured": false,
    "tagline": "The All-New Hyundai Kona EV",
    "description": "Kona EV adalah crossover listrik yang stylish dan bertenaga. Dengan desain futuristik dan jangkauan berkendara yang impresif, Kona EV adalah pilihan sempurna untuk kehidupan urban modern.",
    "image": "images/kona-ev.jpg",
    "gallery": [],
    "priceStart": 581850000,
    "variants": [
      { "name": "Style", "price": 581850000 },
      { "name": "Prime Regular", "price": 600100000 },
      { "name": "Prime Long Range", "price": 651100000 },
      { "name": "Signature Regular", "price": 668200000 },
      { "name": "Signature Long", "price": 685150000 },
      { "name": "N Line", "price": 706150000 }
    ],
    "specs": [
      { "key": "Motor", "value": "Elektromotor 160kW" },
      { "key": "Baterai", "value": "48.4 kWh / 65.4 kWh (Long Range)" },
      { "key": "Transmisi", "value": "Single Speed" },
      { "key": "Kapasitas", "value": "5 Penumpang" }
    ],
    "notes": ["*Matte Color +Rp 3.500.000", "**Two Tone +Rp 3.000.000"]
  },
  {
    "id": "ioniq5",
    "name": "IONIQ 5",
    "year": 2026,
    "category": "Electric",
    "subcategory": "Electric",
    "featured": false,
    "tagline": "Hyundai IONIQ 5",
    "description": "IONIQ 5 adalah crossover listrik ikonik dengan desain pixel-inspired yang revolusioner. Dilengkapi teknologi pengisian ultra-cepat 800V dan interior luas dengan konsol tengah yang bisa digeser.",
    "image": "images/ioniq5.jpg",
    "gallery": [],
    "priceStart": 824500000,
    "variants": [
      { "name": "Prime Regular", "price": 824500000 },
      { "name": "Prime Long Range", "price": 868000000 },
      { "name": "Signature Regular", "price": 890500000 },
      { "name": "Signature Long Range", "price": 942200000 }
    ],
    "specs": [
      { "key": "Motor", "value": "Elektromotor 160kW / 225kW" },
      { "key": "Baterai", "value": "58 kWh / 77.4 kWh (Long Range)" },
      { "key": "Pengisian", "value": "800V Ultra-Fast Charging" },
      { "key": "Kapasitas", "value": "5 Penumpang" }
    ],
    "notes": ["*Matte Color +Rp 3.500.000"]
  },
  {
    "id": "stargazer-cartenz-x",
    "name": "Stargazer Cartenz X",
    "year": 2026,
    "category": "MPV",
    "subcategory": "MPV",
    "featured": false,
    "tagline": "Hyundai Stargazer Cartenz X",
    "description": "Stargazer Cartenz X hadir sebagai MPV premium dengan tampilan yang lebih bold dan sporty. Pilihan tepat untuk keluarga aktif yang menginginkan kapasitas penumpang besar tanpa mengorbankan gaya.",
    "image": "images/stargazer-cartenz-x.jpg",
    "gallery": [],
    "priceStart": 378250000,
    "variants": [
      { "name": "Trend IVT", "price": 378250000 },
      { "name": "Style IVT", "price": 391700000 },
      { "name": "Prime 1T IVT", "price": 408700000 }
    ],
    "specs": [
      { "key": "Mesin", "value": "1.5L MPI" },
      { "key": "Transmisi", "value": "IVT" },
      { "key": "Kapasitas", "value": "7 Penumpang" }
    ],
    "notes": ["*Captain Seat/Premium Color +Rp 3.500.000"]
  },
  {
    "id": "stargazer-cartenz",
    "name": "Stargazer Cartenz",
    "year": 2026,
    "category": "MPV",
    "subcategory": "MPV",
    "featured": false,
    "tagline": "Hyundai Stargazer Cartenz",
    "description": "Stargazer Cartenz menawarkan kombinasi sempurna antara kenyamanan, kapasitas, dan keterjangkauan. Tersedia dalam pilihan transmisi M/T dan IVT sesuai preferensi berkendara Anda.",
    "image": "images/stargazer-cartenz.jpg",
    "gallery": [],
    "priceStart": 284100000,
    "variants": [
      { "name": "Trend M/T", "price": 284100000 },
      { "name": "Trend IVT", "price": 294350000 },
      { "name": "Style M/T", "price": 304600000 },
      { "name": "Style IVT", "price": 314800000 },
      { "name": "Smart HSS IVT", "price": 348350000 },
      { "name": "Smart Non HSS IVT", "price": 338350000 },
      { "name": "Prime HSS IVT", "price": 366300000 },
      { "name": "Prime Non HSS IVT", "price": 356300000 }
    ],
    "specs": [
      { "key": "Mesin", "value": "1.5L MPI" },
      { "key": "Transmisi", "value": "M/T / IVT" },
      { "key": "Kapasitas", "value": "7 Penumpang" }
    ],
    "notes": ["*Captain Seat +Rp 3.500.000"]
  },
  {
    "id": "new-creta",
    "name": "New Creta Facelift",
    "year": 2026,
    "category": "SUV",
    "subcategory": "Compact SUV",
    "featured": false,
    "tagline": "Hyundai New Creta Facelift",
    "description": "New Creta Facelift tampil segar dengan desain eksterior yang diperbarui dan fitur-fitur terkini. Compact SUV terlaris yang kini hadir dengan pilihan varian N Line yang sporty dan bertenaga.",
    "image": "images/new-creta.jpg",
    "gallery": [],
    "priceStart": 315800000,
    "variants": [
      { "name": "Active M/T", "price": 315800000 },
      { "name": "Trend M/T", "price": 348600000 },
      { "name": "Trend IVT", "price": 369650000 },
      { "name": "Style IVT", "price": 415350000 },
      { "name": "Prime IVT", "price": 446500000 },
      { "name": "Alpha IVT", "price": 463000000 },
      { "name": "N Line", "price": 481000000 },
      { "name": "N Line Turbo", "price": 529000000 }
    ],
    "specs": [
      { "key": "Mesin", "value": "1.5L MPI / 1.4L T-GDi (N Line Turbo)" },
      { "key": "Transmisi", "value": "M/T / IVT" },
      { "key": "Kapasitas", "value": "5 Penumpang" }
    ],
    "notes": ["*Two Tone +Rp 3.000.000"]
  }
]
```

- [ ] **Step 5: Create `data/promos.json`**

```json
[
  {
    "id": "promo-juni-2026",
    "title": "Promo Akhir Tahun 2026",
    "description": "Dapatkan cashback spesial dan kemudahan cicilan untuk pembelian unit Hyundai pilihan di bulan Juni 2026. Syarat dan ketentuan berlaku.",
    "period": "1 Juni – 30 Juni 2026",
    "image": "images/promo-juni.jpg",
    "relatedProducts": ["new-creta", "stargazer-cartenz"],
    "badge": "HOT",
    "cta": "Hubungi Sales"
  },
  {
    "id": "promo-test-drive",
    "title": "Test Drive & Dapatkan Hadiah",
    "description": "Lakukan test drive Hyundai Palisade HEV atau IONIQ 5 dan dapatkan hadiah menarik. Booking sekarang via WhatsApp.",
    "period": "Berlaku sepanjang 2026",
    "image": "images/promo-testdrive.jpg",
    "relatedProducts": ["palisade-hev", "ioniq5"],
    "badge": "NEW",
    "cta": "Book Test Drive"
  }
]
```

- [ ] **Step 6: Download placeholder image**

```bash
curl -L "https://placehold.co/800x500/e8f0fe/003876?text=Mimosa+Hyundai" -o images/placeholder.jpg 2>/dev/null || \
  curl -L "https://via.placeholder.com/800x500/e8f0fe/003876?text=Foto+Mobil" -o images/placeholder.jpg 2>/dev/null || \
  echo '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="#e8f0fe"/><text x="400" y="260" font-family="sans-serif" font-size="32" fill="#003876" text-anchor="middle">Mimosa Hyundai</text></svg>' > images/placeholder.jpg
```

- [ ] **Step 7: Create `README.md`**

```markdown
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
```

- [ ] **Step 8: Initial commit**

```bash
git add .
git commit -m "feat: initial project scaffold with data files"
```

---

## Task 2: Shared JS Utilities (js/app.js)

**Files:**
- Create: `js/app.js`

- [ ] **Step 1: Create `js/app.js`** with all shared utilities

```javascript
// Shared utilities for Mimosa Hyundai website

const DATA_BASE = 'data/';

async function loadJSON(filename) {
  const res = await fetch(DATA_BASE + filename);
  if (!res.ok) throw new Error(`Failed to load ${filename}`);
  return res.json();
}

function formatPrice(number) {
  if (number >= 1000000000) {
    const milyar = number / 1000000000;
    return `Rp ${milyar % 1 === 0 ? milyar : milyar.toFixed(3).replace(/\.?0+$/, '')} M`;
  }
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(number);
}

function formatPriceShort(number) {
  if (number >= 1000000000) return (number / 1000000000).toFixed(2).replace(/\.?0+$/, '') + ' M';
  if (number >= 1000000) return Math.floor(number / 1000000) + ' jt';
  return formatPrice(number);
}

function buildWhatsAppLink(waNumber, message) {
  const cleaned = waNumber.replace(/\D/g, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

function getCategoryLabel(cat, subcat) {
  const labels = { 'Electric': 'EV', 'Hybrid': 'Hybrid', 'Compact SUV': 'SUV', 'MPV': 'MPV', 'SUV': 'SUV' };
  return labels[subcat] || labels[cat] || cat;
}

function getCategoryColor(subcat) {
  const colors = {
    'Electric': 'bg-green-100 text-green-800',
    'Hybrid': 'bg-blue-100 text-blue-800',
    'Compact SUV': 'bg-indigo-100 text-indigo-800',
    'MPV': 'bg-purple-100 text-purple-800',
    'SUV': 'bg-sky-100 text-sky-800'
  };
  return colors[subcat] || 'bg-gray-100 text-gray-800';
}

function renderNavbar(activePage) {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'catalog.html', label: 'Produk' },
    { href: 'promo.html', label: 'Promo' },
    { href: 'about.html', label: 'Tentang Kami' },
  ];
  const links = pages.map(p => {
    const isActive = p.href === activePage;
    return `<a href="${p.href}" class="text-sm font-semibold transition-colors ${isActive ? 'text-[#003876]' : 'text-gray-600 hover:text-[#003876]'}">${p.label}</a>`;
  }).join('');

  return `
  <nav class="bg-white border-b-4 border-[#003876] sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="index.html" class="flex items-center gap-3">
          <div class="w-9 h-9 bg-[#003876] rounded-lg flex items-center justify-center">
            <span class="text-white font-black text-sm">H</span>
          </div>
          <div>
            <div class="text-[#003876] font-black text-sm tracking-wide leading-tight">MIMOSA HYUNDAI</div>
            <div class="text-gray-400 text-xs leading-tight">Authorized Dealer Medan</div>
          </div>
        </a>
        <div class="hidden md:flex items-center gap-6">
          ${links}
          <a href="about.html#contact" class="bg-[#003876] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#1565C0] transition-colors">Kontak</a>
        </div>
        <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
      ${pages.map(p => `<a href="${p.href}" class="text-sm font-semibold text-gray-700 py-1">${p.label}</a>`).join('')}
      <a href="about.html#contact" class="bg-[#003876] text-white text-sm font-bold px-4 py-2 rounded-lg text-center">Kontak</a>
    </div>
  </nav>`;
}

function renderFooter(dealer) {
  return `
  <footer class="bg-[#003876] text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span class="text-[#003876] font-black">H</span>
            </div>
            <div>
              <div class="font-black text-lg">MIMOSA HYUNDAI</div>
              <div class="text-blue-200 text-xs">${dealer.tagline}</div>
            </div>
          </div>
          <p class="text-blue-200 text-sm">${dealer.company}</p>
        </div>
        <div>
          <h4 class="font-bold mb-3 text-blue-100">Informasi Kontak</h4>
          <div class="space-y-2 text-sm text-blue-200">
            <p>📍 ${dealer.address}</p>
            <p>📞 ${dealer.phone}</p>
            <p>✉️ ${dealer.email}</p>
            <p>🕐 ${dealer.hours}</p>
          </div>
        </div>
        <div>
          <h4 class="font-bold mb-3 text-blue-100">Ikuti Kami</h4>
          <div class="flex gap-3">
            ${dealer.instagram ? `<a href="${dealer.instagram}" target="_blank" class="bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-sm transition-colors">Instagram</a>` : ''}
            ${dealer.facebook ? `<a href="${dealer.facebook}" target="_blank" class="bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-sm transition-colors">Facebook</a>` : ''}
          </div>
          <div class="mt-4">
            <a href="catalog.html" class="text-blue-200 text-sm hover:text-white transition-colors block">→ Lihat Semua Produk</a>
            <a href="promo.html" class="text-blue-200 text-sm hover:text-white transition-colors block mt-1">→ Promo Terkini</a>
          </div>
        </div>
      </div>
      <div class="border-t border-white/20 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p class="text-blue-300 text-xs">© 2026 Mimosa Hyundai. Harga OTR Medan. Harga & spesifikasi dapat berubah sewaktu-waktu.</p>
        <p class="text-blue-400 text-xs">${dealer.website}</p>
      </div>
    </div>
  </footer>`;
}

function initWAButton(waNumber, defaultMessage) {
  const btn = document.createElement('a');
  btn.href = buildWhatsAppLink(waNumber, defaultMessage);
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl';
  btn.innerHTML = `
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    <span class="hidden sm:inline">Chat WhatsApp</span>`;
  document.body.appendChild(btn);
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }
}

function handleImageError(img) {
  img.onerror = null;
  img.src = 'images/placeholder.jpg';
}
```

- [ ] **Step 2: Commit**

```bash
git add js/app.js
git commit -m "feat: add shared JS utilities"
```

---

## Task 3: Homepage (index.html)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Mimosa Hyundai Medan — Authorized Dealer</title>
  <meta name="description" content="Dealer resmi Hyundai di Medan. Temukan lineup terbaru Hyundai 2026 dengan harga OTR terbaik. Santa Fe, Palisade HEV, IONIQ 5, Kona EV, Creta, Stargazer."/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="js/app.js"></script>
</head>
<body class="bg-gray-50 font-sans">

  <div id="navbar"></div>

  <main>
    <!-- Hero Featured Split -->
    <section id="hero" class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          <!-- Left: Featured Product (60%) -->
          <div id="featured-product" class="lg:col-span-3 bg-gradient-to-br from-[#003876] to-[#1565C0] rounded-2xl overflow-hidden relative min-h-[360px] flex flex-col justify-between p-8">
            <div class="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-10 -translate-x-8"></div>
            <div class="relative z-10 text-center py-16 text-white">
              <div class="animate-pulse text-blue-200 text-sm">Memuat...</div>
            </div>
          </div>

          <!-- Right: Product List (40%) -->
          <div class="lg:col-span-2 flex flex-col">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-[#003876] font-black text-sm tracking-widest uppercase">Lineup 2026</h2>
            </div>
            <div id="product-list" class="flex flex-col gap-3 flex-1">
              <div class="text-gray-400 text-sm">Memuat produk...</div>
            </div>
            <a href="catalog.html" class="mt-4 border-2 border-[#003876] text-[#003876] font-bold py-3 rounded-xl text-sm text-center hover:bg-[#003876] hover:text-white transition-all duration-200 block">
              Lihat Semua Produk →
            </a>
          </div>

        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="bg-[#003876]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white" id="stats-bar">
          <div>
            <div class="text-3xl font-black" id="stat-models">7</div>
            <div class="text-blue-200 text-xs font-medium mt-1">Model Tersedia</div>
          </div>
          <div>
            <div class="text-3xl font-black">OTR</div>
            <div class="text-blue-200 text-xs font-medium mt-1">Harga Medan</div>
          </div>
          <div>
            <div class="text-3xl font-black">✓</div>
            <div class="text-blue-200 text-xs font-medium mt-1">Authorized Dealer</div>
          </div>
          <div>
            <div class="text-3xl font-black">WA</div>
            <div class="text-blue-200 text-xs font-medium mt-1">Chat Langsung</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Quick Links -->
    <section class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-[#003876] font-black text-xl mb-6 text-center">Jelajahi Berdasarkan Kategori</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="catalog.html?cat=SUV" class="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 group">
            <div class="text-4xl mb-2">🚙</div>
            <div class="text-[#003876] font-bold text-sm group-hover:text-[#1565C0]">SUV</div>
            <div class="text-gray-400 text-xs">Santa Fe, Creta, Palisade</div>
          </a>
          <a href="catalog.html?cat=Electric" class="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 group">
            <div class="text-4xl mb-2">⚡</div>
            <div class="text-[#003876] font-bold text-sm group-hover:text-[#1565C0]">Electric</div>
            <div class="text-gray-400 text-xs">IONIQ 5, Kona EV</div>
          </a>
          <a href="catalog.html?cat=Hybrid" class="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 group">
            <div class="text-4xl mb-2">🌿</div>
            <div class="text-[#003876] font-bold text-sm group-hover:text-[#1565C0]">Hybrid</div>
            <div class="text-gray-400 text-xs">Santa Fe HEV, Palisade HEV</div>
          </a>
          <a href="catalog.html?cat=MPV" class="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 group">
            <div class="text-4xl mb-2">🚌</div>
            <div class="text-[#003876] font-bold text-sm group-hover:text-[#1565C0]">MPV</div>
            <div class="text-gray-400 text-xs">Stargazer Cartenz</div>
          </a>
        </div>
      </div>
    </section>
  </main>

  <div id="footer"></div>

  <script>
    async function init() {
      const [products, dealer] = await Promise.all([
        loadJSON('products.json'),
        loadJSON('dealer.json')
      ]);

      document.getElementById('navbar').innerHTML = renderNavbar('index.html');
      document.getElementById('footer').innerHTML = renderFooter(dealer);
      initWAButton(dealer.whatsapp, 'Halo Mimosa Hyundai, saya ingin tanya info produk terbaru.');
      initMobileMenu();

      // Featured product
      const featured = products.find(p => p.featured) || products[0];
      document.getElementById('stat-models').textContent = products.length;
      document.getElementById('featured-product').innerHTML = `
        <div class="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-10 -translate-x-8"></div>
        <div class="relative z-10">
          <span class="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-4">★ Unggulan</span>
          <p class="text-blue-200 text-xs tracking-widest uppercase mb-1">${featured.tagline}</p>
          <h1 class="text-white text-4xl lg:text-5xl font-black leading-tight mb-2">${featured.name}</h1>
          <p class="text-blue-200 text-sm mb-6">Mulai <span class="text-white font-bold text-lg">${formatPrice(featured.priceStart)}</span></p>
          <div class="aspect-video bg-white/10 rounded-xl overflow-hidden mb-6 max-h-48">
            <img src="${featured.image}" alt="${featured.name}" class="w-full h-full object-cover" onerror="handleImageError(this)"/>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="product.html?id=${featured.id}" class="bg-white text-[#003876] font-black px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors">Lihat Detail</a>
            <a href="${buildWhatsAppLink(dealer.whatsapp, 'Halo, saya tertarik dengan ' + featured.name + '. Bisa info lebih lanjut dan jadwal test drive?')}" target="_blank" rel="noopener" class="border-2 border-white/60 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors">Test Drive →</a>
          </div>
        </div>`;

      // Other products list
      const others = products.filter(p => p.id !== featured.id).slice(0, 5);
      document.getElementById('product-list').innerHTML = others.map(p => `
        <a href="product.html?id=${p.id}" class="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#003876] hover:shadow-md transition-all group">
          <div class="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" onerror="handleImageError(this)"/>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-[#003876] font-bold text-sm truncate">${p.name}</div>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(p.subcategory)}">${getCategoryLabel(p.category, p.subcategory)}</span>
              <span class="text-gray-500 text-xs">Mulai ${formatPriceShort(p.priceStart)}</span>
            </div>
          </div>
          <svg class="w-5 h-5 text-gray-300 group-hover:text-[#003876] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>`).join('');
    }

    init().catch(console.error);
  </script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open index.html
# Verify: navbar tampil, featured split hero muncul, product list di kanan, WA button di pojok kanan bawah
# Jika fetch gagal (CORS di file://) gunakan: python3 -m http.server 8080
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add homepage with featured split hero"
```

---

## Task 4: Catalog Page (catalog.html)

**Files:**
- Create: `catalog.html`

- [ ] **Step 1: Create `catalog.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Katalog Produk — Mimosa Hyundai Medan</title>
  <meta name="description" content="Lihat semua lineup Hyundai terbaru 2026 dengan harga OTR Medan. Filter berdasarkan SUV, Electric, Hybrid, MPV."/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="js/app.js"></script>
</head>
<body class="bg-gray-50 font-sans">
  <div id="navbar"></div>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-[#003876] font-black text-3xl lg:text-4xl">Semua Produk</h1>
      <p class="text-gray-500 mt-1">Harga OTR Medan · Update Januari 2026</p>
    </div>

    <!-- Filter + Sort Bar -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div id="filter-pills" class="flex flex-wrap gap-2">
        <!-- rendered by JS -->
      </div>
      <select id="sort-select" class="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-[#003876]">
        <option value="default">Urutan Default</option>
        <option value="price-asc">Harga: Terendah</option>
        <option value="price-desc">Harga: Tertinggi</option>
        <option value="name">Nama A–Z</option>
      </select>
    </div>

    <!-- Product Grid -->
    <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="col-span-full text-center py-16 text-gray-400">Memuat produk...</div>
    </div>
  </main>

  <div id="footer"></div>

  <script>
    const FILTERS = ['Semua', 'SUV', 'Electric', 'Hybrid', 'MPV'];
    let allProducts = [];
    let activeFilter = 'Semua';
    let activeSort = 'default';

    function getFilterCategory(product) {
      const sub = product.subcategory;
      if (sub === 'Electric') return 'Electric';
      if (sub === 'Hybrid') return 'Hybrid';
      if (product.category === 'MPV') return 'MPV';
      return 'SUV';
    }

    function renderFilters() {
      document.getElementById('filter-pills').innerHTML = FILTERS.map(f => {
        const isActive = f === activeFilter;
        return `<button onclick="setFilter('${f}')" class="px-4 py-2 rounded-full text-sm font-semibold transition-all ${isActive ? 'bg-[#003876] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#003876] hover:text-[#003876]'}">${f}</button>`;
      }).join('');
    }

    function renderGrid() {
      let products = [...allProducts];
      if (activeFilter !== 'Semua') products = products.filter(p => getFilterCategory(p) === activeFilter);
      if (activeSort === 'price-asc') products.sort((a, b) => a.priceStart - b.priceStart);
      else if (activeSort === 'price-desc') products.sort((a, b) => b.priceStart - a.priceStart);
      else if (activeSort === 'name') products.sort((a, b) => a.name.localeCompare(b.name));

      if (!products.length) {
        document.getElementById('product-grid').innerHTML = `<div class="col-span-full text-center py-16 text-gray-400">Tidak ada produk di kategori ini.</div>`;
        return;
      }

      document.getElementById('product-grid').innerHTML = products.map(p => `
        <a href="product.html?id=${p.id}" class="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#003876] hover:shadow-lg transition-all duration-200 group flex flex-col">
          <div class="aspect-[16/10] bg-gray-100 overflow-hidden">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="handleImageError(this)"/>
          </div>
          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 class="text-[#003876] font-black text-lg leading-tight">${p.name}</h3>
              <span class="text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap flex-shrink-0 ${getCategoryColor(p.subcategory)}">${getCategoryLabel(p.category, p.subcategory)}</span>
            </div>
            <p class="text-gray-400 text-xs mb-1">Tahun ${p.year}</p>
            <p class="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">${p.description}</p>
            <div class="border-t border-gray-100 pt-4 flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-xs">Mulai dari</p>
                <p class="text-[#003876] font-black text-lg">${formatPriceShort(p.priceStart)}</p>
              </div>
              <span class="bg-[#003876] group-hover:bg-[#1565C0] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">Detail →</span>
            </div>
          </div>
        </a>`).join('');
    }

    function setFilter(f) {
      activeFilter = f;
      renderFilters();
      renderGrid();
      const url = new URL(window.location);
      f === 'Semua' ? url.searchParams.delete('cat') : url.searchParams.set('cat', f);
      window.history.replaceState({}, '', url);
    }

    document.addEventListener('DOMContentLoaded', async () => {
      const [products, dealer] = await Promise.all([loadJSON('products.json'), loadJSON('dealer.json')]);
      allProducts = products;

      document.getElementById('navbar').innerHTML = renderNavbar('catalog.html');
      document.getElementById('footer').innerHTML = renderFooter(dealer);
      initWAButton(dealer.whatsapp, 'Halo Mimosa Hyundai, saya ingin tanya info produk.');
      initMobileMenu();

      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('cat');
      if (catParam && FILTERS.includes(catParam)) activeFilter = catParam;

      document.getElementById('sort-select').addEventListener('change', e => { activeSort = e.target.value; renderGrid(); });

      renderFilters();
      renderGrid();
    });
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify**

```bash
# python3 -m http.server 8080  lalu buka http://localhost:8080/catalog.html
# Verify: grid 3 kolom, filter pills aktif, sort berfungsi, klik filter SUV → hanya SUV tampil
```

- [ ] **Step 3: Commit**

```bash
git add catalog.html
git commit -m "feat: add catalog page with filter and sort"
```

---

## Task 5: Product Detail Page (product.html)

**Files:**
- Create: `product.html`

- [ ] **Step 1: Create `product.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Detail Produk — Mimosa Hyundai Medan</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="js/app.js"></script>
</head>
<body class="bg-gray-50 font-sans">
  <div id="navbar"></div>

  <main id="product-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center py-20 text-gray-400">Memuat produk...</div>
  </main>

  <div id="footer"></div>

  <script>
    async function init() {
      const [products, dealer] = await Promise.all([loadJSON('products.json'), loadJSON('dealer.json')]);
      document.getElementById('navbar').innerHTML = renderNavbar('catalog.html');
      document.getElementById('footer').innerHTML = renderFooter(dealer);
      initWAButton(dealer.whatsapp, 'Halo Mimosa Hyundai, saya ingin tanya info produk.');
      initMobileMenu();

      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const product = products.find(p => p.id === id);

      if (!product) {
        document.getElementById('product-content').innerHTML = `
          <div class="text-center py-20">
            <p class="text-gray-400 mb-4">Produk tidak ditemukan.</p>
            <a href="catalog.html" class="bg-[#003876] text-white font-bold px-6 py-3 rounded-xl">← Kembali ke Katalog</a>
          </div>`;
        return;
      }

      document.title = `${product.name} — Mimosa Hyundai Medan`;

      const allImages = [product.image, ...product.gallery].filter(Boolean);
      const waMsg = `Halo Mimosa Hyundai, saya tertarik dengan ${product.name} ${product.year}. Bisa info lebih lanjut?`;

      document.getElementById('product-content').innerHTML = `
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <a href="index.html" class="hover:text-[#003876]">Home</a>
          <span>/</span>
          <a href="catalog.html" class="hover:text-[#003876]">Produk</a>
          <span>/</span>
          <span class="text-[#003876] font-semibold">${product.name}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Left: Gallery -->
          <div>
            <div class="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-3">
              <img id="main-photo" src="${allImages[0] || 'images/placeholder.jpg'}" alt="${product.name}" class="w-full h-full object-cover" onerror="handleImageError(this)"/>
            </div>
            ${allImages.length > 1 ? `
            <div class="flex gap-2 flex-wrap">
              ${allImages.map((img, i) => `
                <button onclick="document.getElementById('main-photo').src='${img}'" class="w-16 h-12 rounded-lg overflow-hidden border-2 ${i === 0 ? 'border-[#003876]' : 'border-gray-200'} hover:border-[#003876] transition-colors">
                  <img src="${img}" alt="foto ${i+1}" class="w-full h-full object-cover" onerror="handleImageError(this)"/>
                </button>`).join('')}
            </div>` : ''}
          </div>

          <!-- Right: Info -->
          <div>
            <div class="flex items-start gap-3 mb-2">
              <span class="text-xs px-2 py-1 rounded-full font-semibold ${getCategoryColor(product.subcategory)}">${getCategoryLabel(product.category, product.subcategory)}</span>
              <span class="text-xs text-gray-400 pt-1">Tahun ${product.year}</span>
            </div>
            <h1 class="text-[#003876] font-black text-3xl lg:text-4xl mb-1">${product.name}</h1>
            <p class="text-gray-400 text-sm italic mb-4">${product.tagline}</p>
            <p class="text-gray-600 leading-relaxed mb-6">${product.description}</p>

            <!-- Price CTA -->
            <div class="bg-[#003876] rounded-2xl p-5 mb-6 text-white">
              <p class="text-blue-200 text-xs mb-1">Mulai dari (OTR Medan)</p>
              <p class="text-3xl font-black mb-3">${formatPrice(product.priceStart)}</p>
              <a href="${buildWhatsAppLink(dealer.whatsapp, waMsg)}" target="_blank" rel="noopener"
                class="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3 px-6 rounded-xl transition-colors w-full">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Hubungi Sales via WhatsApp
              </a>
            </div>

            <!-- Variants Table -->
            <div class="mb-6">
              <h2 class="text-[#003876] font-black text-lg mb-3">Varian & Harga</h2>
              <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
                ${product.variants.map((v, i) => `
                  <div class="flex items-center justify-between px-4 py-3 ${i % 2 === 0 ? '' : 'bg-gray-50'} ${i < product.variants.length - 1 ? 'border-b border-gray-100' : ''}">
                    <span class="text-gray-700 text-sm font-medium">${v.name}</span>
                    <span class="text-[#003876] font-bold text-sm">${formatPrice(v.price)}</span>
                  </div>`).join('')}
              </div>
              ${product.notes && product.notes.length ? `<p class="text-gray-400 text-xs mt-2">${product.notes.join(' · ')}</p>` : ''}
            </div>

            <!-- Specs -->
            ${product.specs && product.specs.length ? `
            <div>
              <h2 class="text-[#003876] font-black text-lg mb-3">Spesifikasi</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${product.specs.map(s => `
                  <div class="bg-white rounded-xl border border-gray-100 p-4">
                    <p class="text-gray-400 text-xs mb-1">${s.key}</p>
                    <p class="text-[#003876] font-bold text-sm">${s.value}</p>
                  </div>`).join('')}
              </div>
            </div>` : ''}
          </div>
        </div>

        <!-- Related Products -->
        <div class="mt-16">
          <h2 class="text-[#003876] font-black text-2xl mb-6">Produk Lainnya</h2>
          <div id="related-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"></div>
        </div>`;

      // Related products
      const related = products.filter(p => p.id !== product.id).slice(0, 4);
      document.getElementById('related-grid').innerHTML = related.map(p => `
        <a href="product.html?id=${p.id}" class="bg-white rounded-xl border border-gray-100 hover:border-[#003876] hover:shadow-md transition-all overflow-hidden group">
          <div class="aspect-video bg-gray-100 overflow-hidden">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" onerror="handleImageError(this)"/>
          </div>
          <div class="p-4">
            <h3 class="text-[#003876] font-bold text-sm">${p.name}</h3>
            <p class="text-gray-500 text-xs">Mulai ${formatPriceShort(p.priceStart)}</p>
          </div>
        </a>`).join('');
    }

    init().catch(console.error);
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify**

```bash
# http://localhost:8080/product.html?id=palisade-hev
# Verify: foto tampil, tabel varian semua row muncul, tombol WA buka chat dengan pesan preset, related products 4 card
```

- [ ] **Step 3: Commit**

```bash
git add product.html
git commit -m "feat: add product detail page with gallery, variants, specs, WA CTA"
```

---

## Task 6: Promo Page (promo.html)

**Files:**
- Create: `promo.html`

- [ ] **Step 1: Create `promo.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Promo & Penawaran — Mimosa Hyundai Medan</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="js/app.js"></script>
</head>
<body class="bg-gray-50 font-sans">
  <div id="navbar"></div>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-[#003876] font-black text-3xl lg:text-4xl">Promo & Penawaran</h1>
      <p class="text-gray-500 mt-1">Penawaran terbaik dari Mimosa Hyundai Medan</p>
    </div>
    <div id="promo-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="col-span-full text-center py-16 text-gray-400">Memuat promo...</div>
    </div>
  </main>

  <div id="footer"></div>

  <script>
    async function init() {
      const [promos, products, dealer] = await Promise.all([
        loadJSON('promos.json'), loadJSON('products.json'), loadJSON('dealer.json')
      ]);

      document.getElementById('navbar').innerHTML = renderNavbar('promo.html');
      document.getElementById('footer').innerHTML = renderFooter(dealer);
      initWAButton(dealer.whatsapp, 'Halo Mimosa Hyundai, saya ingin tanya info promo terbaru.');
      initMobileMenu();

      const BADGE_COLORS = { 'HOT': 'bg-red-500', 'NEW': 'bg-green-500', 'LIMITED': 'bg-orange-500' };

      document.getElementById('promo-grid').innerHTML = promos.map(promo => {
        const related = products.filter(p => promo.relatedProducts && promo.relatedProducts.includes(p.id));
        const badgeColor = BADGE_COLORS[promo.badge] || 'bg-blue-500';
        const waMsg = `Halo Mimosa Hyundai, saya tertarik dengan promo "${promo.title}". Bisa info lebih lanjut?`;
        return `
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div class="aspect-video bg-gradient-to-br from-[#003876] to-[#1565C0] relative overflow-hidden">
              <img src="${promo.image}" alt="${promo.title}" class="w-full h-full object-cover" onerror="this.style.display='none'"/>
              <div class="absolute inset-0 bg-gradient-to-t from-[#003876]/80 to-transparent flex items-end p-5">
                <div>
                  ${promo.badge ? `<span class="inline-block ${badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full mb-2">${promo.badge}</span>` : ''}
                  <h2 class="text-white font-black text-xl">${promo.title}</h2>
                  <p class="text-blue-200 text-xs">📅 ${promo.period}</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <p class="text-gray-600 text-sm mb-4">${promo.description}</p>
              ${related.length ? `
                <div class="mb-4">
                  <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Berlaku untuk:</p>
                  <div class="flex flex-wrap gap-2">
                    ${related.map(p => `<a href="product.html?id=${p.id}" class="text-xs bg-blue-50 text-[#003876] font-semibold px-3 py-1 rounded-full hover:bg-[#003876] hover:text-white transition-colors">${p.name}</a>`).join('')}
                  </div>
                </div>` : ''}
              <a href="${buildWhatsAppLink(dealer.whatsapp, waMsg)}" target="_blank" rel="noopener"
                class="flex items-center justify-center gap-2 bg-[#003876] hover:bg-[#1565C0] text-white font-bold py-3 px-5 rounded-xl transition-colors w-full text-sm">
                ${promo.cta || 'Hubungi Sales'} →
              </a>
            </div>
          </div>`;
      }).join('');
    }

    init().catch(console.error);
  </script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add promo.html
git commit -m "feat: add promo page"
```

---

## Task 7: About / Dealer Profile (about.html)

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create `about.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Tentang Mimosa Hyundai Medan</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="js/app.js"></script>
</head>
<body class="bg-gray-50 font-sans">
  <div id="navbar"></div>

  <main id="about-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center py-20 text-gray-400">Memuat...</div>
  </main>

  <div id="footer"></div>

  <script>
    async function init() {
      const dealer = await loadJSON('dealer.json');
      document.getElementById('navbar').innerHTML = renderNavbar('about.html');
      document.getElementById('footer').innerHTML = renderFooter(dealer);
      initWAButton(dealer.whatsapp, 'Halo Mimosa Hyundai, saya ingin tanya informasi dealer.');
      initMobileMenu();

      document.getElementById('about-content').innerHTML = `
        <!-- Hero -->
        <div class="bg-gradient-to-br from-[#003876] to-[#1565C0] rounded-2xl p-8 md:p-12 mb-8 text-white text-center">
          <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-[#003876] font-black text-2xl">H</span>
          </div>
          <h1 class="font-black text-3xl md:text-4xl mb-2">${dealer.name}</h1>
          <p class="text-blue-200 text-lg">${dealer.tagline}</p>
          <p class="text-blue-300 text-sm mt-1">${dealer.company}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Contact Info -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6" id="contact">
            <h2 class="text-[#003876] font-black text-xl mb-5">Informasi Kontak</h2>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">📍</span>
                </div>
                <div>
                  <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Alamat</p>
                  <p class="text-gray-700 font-medium">${dealer.address}</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">📞</span>
                </div>
                <div>
                  <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Telepon</p>
                  <a href="tel:${dealer.phone}" class="text-[#003876] font-bold hover:underline">${dealer.phone}</a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">💬</span>
                </div>
                <div>
                  <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">WhatsApp</p>
                  <a href="${buildWhatsAppLink(dealer.whatsapp, 'Halo Mimosa Hyundai!')}" target="_blank" rel="noopener" class="text-green-600 font-bold hover:underline">${dealer.whatsapp}</a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">✉️</span>
                </div>
                <div>
                  <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Email</p>
                  <a href="mailto:${dealer.email}" class="text-[#003876] font-bold hover:underline">${dealer.email}</a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">🕐</span>
                </div>
                <div>
                  <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Jam Operasional</p>
                  <p class="text-gray-700 font-medium">${dealer.hours}</p>
                </div>
              </div>
            </div>
            <a href="${buildWhatsAppLink(dealer.whatsapp, 'Halo Mimosa Hyundai, saya ingin tanya info produk.')}" target="_blank" rel="noopener"
              class="mt-6 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3 px-5 rounded-xl transition-colors w-full">
              Chat WhatsApp Sekarang
            </a>
          </div>

          <!-- Maps -->
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div class="p-4 border-b border-gray-100">
              <h2 class="text-[#003876] font-black text-xl">Lokasi</h2>
            </div>
            <div class="aspect-square md:aspect-auto md:h-[400px]">
              <iframe src="${dealer.mapsEmbed}" width="100%" height="100%" style="border:0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-full h-full"></iframe>
            </div>
          </div>
        </div>

        ${dealer.sales && dealer.sales.length ? `
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 class="text-[#003876] font-black text-xl mb-5">Tim Sales Kami</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${dealer.sales.map(s => `
              <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div class="w-12 h-12 bg-[#003876] rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-black text-lg">${s.name.charAt(0)}</span>
                </div>
                <div>
                  <p class="text-[#003876] font-bold">${s.name}</p>
                  <a href="${buildWhatsAppLink(s.phone, 'Halo, saya ingin tanya info produk Hyundai.')}" target="_blank" rel="noopener" class="text-green-600 text-sm font-medium hover:underline">${s.phone}</a>
                </div>
              </div>`).join('')}
          </div>
        </div>` : ''}`;
    }

    init().catch(console.error);
  </script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add about.html
git commit -m "feat: add about/dealer profile page"
```

---

## Task 8: Admin CMS Panel (admin.html)

**Files:**
- Create: `admin.html`

- [ ] **Step 1: Create `admin.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Panel — Mimosa Hyundai CMS</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 font-sans min-h-screen">

  <!-- Admin Navbar -->
  <nav class="bg-[#003876] text-white px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
        <span class="text-[#003876] font-black text-sm">H</span>
      </div>
      <div>
        <div class="font-black text-sm">MIMOSA HYUNDAI — CMS Admin</div>
        <div class="text-blue-200 text-xs">Panel pengelolaan konten website</div>
      </div>
    </div>
    <a href="index.html" class="text-blue-200 text-xs hover:text-white">← Lihat Website</a>
  </nav>

  <!-- Info Banner -->
  <div class="bg-amber-50 border-b border-amber-200 px-6 py-3 text-sm text-amber-800">
    💡 <strong>Cara pakai:</strong> Edit konten di bawah → klik Export → upload file JSON ke GitHub repo di folder <code class="bg-amber-100 px-1 rounded">data/</code> → website otomatis update.
  </div>

  <!-- Tabs -->
  <div class="max-w-5xl mx-auto px-4 py-6">
    <div class="flex gap-2 mb-6">
      <button onclick="switchTab('products')" id="tab-products" class="tab-btn px-5 py-2 rounded-lg font-bold text-sm bg-[#003876] text-white">Produk</button>
      <button onclick="switchTab('promos')" id="tab-promos" class="tab-btn px-5 py-2 rounded-lg font-bold text-sm bg-white text-gray-600 border border-gray-200">Promo</button>
      <button onclick="switchTab('dealer')" id="tab-dealer" class="tab-btn px-5 py-2 rounded-lg font-bold text-sm bg-white text-gray-600 border border-gray-200">Info Dealer</button>
    </div>

    <!-- PRODUCTS TAB -->
    <div id="tab-content-products">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Product Form -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 class="text-[#003876] font-black text-lg mb-4" id="product-form-title">Tambah Produk Baru</h2>
          <form id="product-form" class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">Nama Produk *</label>
                <input id="p-name" type="text" placeholder="Palisade HEV" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]" required/>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">ID/Slug *</label>
                <input id="p-id" type="text" placeholder="palisade-hev" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]" required/>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">Kategori</label>
                <select id="p-category" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]">
                  <option>SUV</option><option>MPV</option><option>Electric</option><option>Sedan</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">Sub-kategori</label>
                <select id="p-subcategory" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]">
                  <option>SUV</option><option>Hybrid</option><option>Electric</option><option>Compact SUV</option><option>MPV</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">Tahun</label>
                <input id="p-year" type="number" value="2026" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Tagline</label>
              <input id="p-tagline" type="text" placeholder="The All-New Hyundai Palisade HEV" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Deskripsi</label>
              <textarea id="p-description" rows="3" placeholder="Deskripsi produk..." class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876] resize-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">Path Foto Utama</label>
                <input id="p-image" type="text" placeholder="images/palisade-hev.jpg" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/>
              </div>
              <div class="flex items-center gap-3 pt-5">
                <input id="p-featured" type="checkbox" class="w-4 h-4 accent-[#003876]"/>
                <label for="p-featured" class="text-sm font-semibold text-gray-700">Produk Unggulan (Featured)</label>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-2">Varian & Harga</label>
              <div id="variants-container" class="space-y-2"></div>
              <button type="button" onclick="addVariant()" class="mt-2 text-xs text-[#003876] font-bold hover:underline">+ Tambah Varian</button>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-2">Spesifikasi</label>
              <div id="specs-container" class="space-y-2"></div>
              <button type="button" onclick="addSpec()" class="mt-2 text-xs text-[#003876] font-bold hover:underline">+ Tambah Spesifikasi</button>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Catatan Harga (pisah dengan Enter)</label>
              <textarea id="p-notes" rows="2" placeholder="*Matte Color +Rp 3.500.000" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876] resize-none"></textarea>
            </div>
            <div class="flex gap-3">
              <button type="button" onclick="saveProduct()" class="flex-1 bg-[#003876] text-white font-bold py-2 rounded-lg text-sm hover:bg-[#1565C0] transition-colors">Simpan Produk</button>
              <button type="button" onclick="resetProductForm()" class="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Reset</button>
            </div>
          </form>
        </div>

        <!-- Product List -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-[#003876] font-black text-lg">Daftar Produk</h2>
            <button onclick="exportProducts()" class="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors">↓ Export products.json</button>
          </div>
          <div id="products-list" class="space-y-2 max-h-[600px] overflow-y-auto pr-1"></div>
        </div>
      </div>
    </div>

    <!-- PROMOS TAB -->
    <div id="tab-content-promos" class="hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 class="text-[#003876] font-black text-lg mb-4" id="promo-form-title">Tambah Promo</h2>
          <form id="promo-form" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">ID Promo *</label>
              <input id="pr-id" type="text" placeholder="promo-juni-2026" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Judul Promo *</label>
              <input id="pr-title" type="text" placeholder="Promo Akhir Tahun 2026" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Deskripsi</label>
              <textarea id="pr-description" rows="3" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876] resize-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">Periode</label>
                <input id="pr-period" type="text" placeholder="1 Jan – 31 Jan 2026" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">Badge</label>
                <select id="pr-badge" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]">
                  <option value="">Tidak ada</option><option>HOT</option><option>NEW</option><option>LIMITED</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Teks CTA Button</label>
              <input id="pr-cta" type="text" placeholder="Hubungi Sales" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Path Foto</label>
              <input id="pr-image" type="text" placeholder="images/promo.jpg" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/>
            </div>
            <button type="button" onclick="savePromo()" class="w-full bg-[#003876] text-white font-bold py-2 rounded-lg text-sm hover:bg-[#1565C0] transition-colors">Simpan Promo</button>
          </form>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-[#003876] font-black text-lg">Daftar Promo</h2>
            <button onclick="exportPromos()" class="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg text-sm">↓ Export promos.json</button>
          </div>
          <div id="promos-list" class="space-y-2"></div>
        </div>
      </div>
    </div>

    <!-- DEALER TAB -->
    <div id="tab-content-dealer" class="hidden">
      <div class="bg-white rounded-2xl border border-gray-100 p-6 max-w-2xl">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-[#003876] font-black text-lg">Info Dealer</h2>
          <button onclick="exportDealer()" class="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg text-sm">↓ Export dealer.json</button>
        </div>
        <form id="dealer-form" class="space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-xs font-semibold text-gray-500 mb-1">Nama Dealer</label><input id="d-name" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
            <div><label class="block text-xs font-semibold text-gray-500 mb-1">Tagline</label><input id="d-tagline" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
          </div>
          <div><label class="block text-xs font-semibold text-gray-500 mb-1">Nama Perusahaan</label><input id="d-company" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
          <div><label class="block text-xs font-semibold text-gray-500 mb-1">Alamat</label><input id="d-address" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-xs font-semibold text-gray-500 mb-1">Telepon</label><input id="d-phone" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
            <div><label class="block text-xs font-semibold text-gray-500 mb-1">WhatsApp</label><input id="d-whatsapp" type="text" placeholder="+628XXXXXXXXXX" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-xs font-semibold text-gray-500 mb-1">Email</label><input id="d-email" type="email" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
            <div><label class="block text-xs font-semibold text-gray-500 mb-1">Website</label><input id="d-website" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
          </div>
          <div><label class="block text-xs font-semibold text-gray-500 mb-1">Jam Operasional</label><input id="d-hours" type="text" placeholder="Senin–Sabtu 08.00–17.00 WIB" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
          <div><label class="block text-xs font-semibold text-gray-500 mb-1">Maps Embed URL (dari Google Maps → Share → Embed → src="...")</label><input id="d-maps" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-xs font-semibold text-gray-500 mb-1">Instagram URL</label><input id="d-instagram" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
            <div><label class="block text-xs font-semibold text-gray-500 mb-1">Facebook URL</label><input id="d-facebook" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003876]"/></div>
          </div>
          <button type="button" onclick="saveDealer()" class="w-full bg-[#003876] text-white font-bold py-2 rounded-lg text-sm hover:bg-[#1565C0] transition-colors">Simpan Perubahan</button>
        </form>
      </div>
    </div>
  </div>

  <script>
    let products = [];
    let promos = [];
    let dealer = {};
    let editingProductId = null;
    let editingPromoId = null;

    // Tab switching
    function switchTab(tab) {
      ['products','promos','dealer'].forEach(t => {
        document.getElementById(`tab-content-${t}`).classList.toggle('hidden', t !== tab);
        const btn = document.getElementById(`tab-${t}`);
        btn.className = `tab-btn px-5 py-2 rounded-lg font-bold text-sm ${t === tab ? 'bg-[#003876] text-white' : 'bg-white text-gray-600 border border-gray-200'}`;
      });
    }

    // Variants
    function addVariant(name='', price='') {
      const c = document.getElementById('variants-container');
      const div = document.createElement('div');
      div.className = 'flex gap-2 items-center';
      div.innerHTML = `
        <input type="text" placeholder="Nama Varian (misal: Prime A/T)" value="${name}" class="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#003876]"/>
        <input type="number" placeholder="Harga" value="${price}" class="w-36 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#003876]"/>
        <button type="button" onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-600 text-lg font-bold">×</button>`;
      c.appendChild(div);
    }

    function addSpec(key='', value='') {
      const c = document.getElementById('specs-container');
      const div = document.createElement('div');
      div.className = 'flex gap-2 items-center';
      div.innerHTML = `
        <input type="text" placeholder="Key (misal: Mesin)" value="${key}" class="w-32 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#003876]"/>
        <input type="text" placeholder="Value (misal: 1.6L Turbo)" value="${value}" class="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#003876]"/>
        <button type="button" onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-600 text-lg font-bold">×</button>`;
      c.appendChild(div);
    }

    function getVariants() {
      return [...document.getElementById('variants-container').querySelectorAll('div')].map(row => {
        const inputs = row.querySelectorAll('input');
        return { name: inputs[0].value.trim(), price: parseInt(inputs[1].value) || 0 };
      }).filter(v => v.name);
    }

    function getSpecs() {
      return [...document.getElementById('specs-container').querySelectorAll('div')].map(row => {
        const inputs = row.querySelectorAll('input');
        return { key: inputs[0].value.trim(), value: inputs[1].value.trim() };
      }).filter(s => s.key);
    }

    function saveProduct() {
      const id = document.getElementById('p-id').value.trim();
      const name = document.getElementById('p-name').value.trim();
      if (!id || !name) { alert('ID dan Nama wajib diisi'); return; }

      const variants = getVariants();
      const priceStart = variants.length ? Math.min(...variants.map(v => v.price)) : 0;
      const p = {
        id, name,
        year: parseInt(document.getElementById('p-year').value) || 2026,
        category: document.getElementById('p-category').value,
        subcategory: document.getElementById('p-subcategory').value,
        featured: document.getElementById('p-featured').checked,
        tagline: document.getElementById('p-tagline').value.trim(),
        description: document.getElementById('p-description').value.trim(),
        image: document.getElementById('p-image').value.trim() || 'images/placeholder.jpg',
        gallery: [],
        priceStart,
        variants,
        specs: getSpecs(),
        notes: document.getElementById('p-notes').value.split('\n').map(s => s.trim()).filter(Boolean)
      };

      const idx = products.findIndex(x => x.id === id);
      if (idx >= 0) products[idx] = p; else products.push(p);
      renderProductsList();
      resetProductForm();
    }

    function resetProductForm() {
      ['p-id','p-name','p-tagline','p-description','p-image','p-notes'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('p-year').value = 2026;
      document.getElementById('p-featured').checked = false;
      document.getElementById('variants-container').innerHTML = '';
      document.getElementById('specs-container').innerHTML = '';
      document.getElementById('product-form-title').textContent = 'Tambah Produk Baru';
      editingProductId = null;
    }

    function editProduct(id) {
      const p = products.find(x => x.id === id);
      if (!p) return;
      document.getElementById('p-id').value = p.id;
      document.getElementById('p-name').value = p.name;
      document.getElementById('p-year').value = p.year;
      document.getElementById('p-category').value = p.category;
      document.getElementById('p-subcategory').value = p.subcategory;
      document.getElementById('p-featured').checked = p.featured;
      document.getElementById('p-tagline').value = p.tagline || '';
      document.getElementById('p-description').value = p.description || '';
      document.getElementById('p-image').value = p.image || '';
      document.getElementById('p-notes').value = (p.notes || []).join('\n');
      document.getElementById('variants-container').innerHTML = '';
      (p.variants || []).forEach(v => addVariant(v.name, v.price));
      document.getElementById('specs-container').innerHTML = '';
      (p.specs || []).forEach(s => addSpec(s.key, s.value));
      document.getElementById('product-form-title').textContent = `Edit: ${p.name}`;
      document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
    }

    function deleteProduct(id) {
      if (!confirm(`Hapus produk "${id}"?`)) return;
      products = products.filter(p => p.id !== id);
      renderProductsList();
    }

    function renderProductsList() {
      document.getElementById('products-list').innerHTML = products.map(p => `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div class="flex-1 min-w-0">
            <div class="text-[#003876] font-bold text-sm truncate">${p.name} ${p.featured ? '⭐' : ''}</div>
            <div class="text-gray-400 text-xs">${p.id} · ${p.subcategory} · Rp ${(p.priceStart/1000000).toFixed(0)}jt</div>
          </div>
          <button onclick="editProduct('${p.id}')" class="text-xs text-[#003876] font-bold hover:underline">Edit</button>
          <button onclick="deleteProduct('${p.id}')" class="text-xs text-red-500 font-bold hover:underline">Hapus</button>
        </div>`).join('') || '<p class="text-gray-400 text-sm text-center py-4">Belum ada produk</p>';
    }

    function exportJSON(data, filename) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    }

    function exportProducts() { exportJSON(products, 'products.json'); }

    // Promos
    function savePromo() {
      const id = document.getElementById('pr-id').value.trim();
      const title = document.getElementById('pr-title').value.trim();
      if (!id || !title) { alert('ID dan Judul wajib diisi'); return; }
      const pr = {
        id, title,
        description: document.getElementById('pr-description').value.trim(),
        period: document.getElementById('pr-period').value.trim(),
        image: document.getElementById('pr-image').value.trim(),
        relatedProducts: [],
        badge: document.getElementById('pr-badge').value,
        cta: document.getElementById('pr-cta').value.trim() || 'Hubungi Sales'
      };
      const idx = promos.findIndex(x => x.id === id);
      if (idx >= 0) promos[idx] = pr; else promos.push(pr);
      renderPromosList();
    }

    function renderPromosList() {
      document.getElementById('promos-list').innerHTML = promos.map(p => `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div class="flex-1 min-w-0">
            <div class="text-[#003876] font-bold text-sm truncate">${p.title}</div>
            <div class="text-gray-400 text-xs">${p.period}</div>
          </div>
          <button onclick="deletePromo('${p.id}')" class="text-xs text-red-500 font-bold hover:underline">Hapus</button>
        </div>`).join('') || '<p class="text-gray-400 text-sm text-center py-4">Belum ada promo</p>';
    }

    function deletePromo(id) {
      if (!confirm('Hapus promo ini?')) return;
      promos = promos.filter(p => p.id !== id);
      renderPromosList();
    }

    function exportPromos() { exportJSON(promos, 'promos.json'); }

    // Dealer
    function populateDealerForm(d) {
      ['name','tagline','company','address','phone','whatsapp','email','website','hours'].forEach(f => {
        const el = document.getElementById(`d-${f}`);
        if (el) el.value = d[f] || '';
      });
      document.getElementById('d-maps').value = d.mapsEmbed || '';
      document.getElementById('d-instagram').value = d.instagram || '';
      document.getElementById('d-facebook').value = d.facebook || '';
    }

    function saveDealer() {
      dealer = {
        name: document.getElementById('d-name').value,
        tagline: document.getElementById('d-tagline').value,
        company: document.getElementById('d-company').value,
        address: document.getElementById('d-address').value,
        phone: document.getElementById('d-phone').value,
        whatsapp: document.getElementById('d-whatsapp').value,
        email: document.getElementById('d-email').value,
        website: document.getElementById('d-website').value,
        hours: document.getElementById('d-hours').value,
        mapsEmbed: document.getElementById('d-maps').value,
        instagram: document.getElementById('d-instagram').value,
        facebook: document.getElementById('d-facebook').value,
        sales: dealer.sales || []
      };
      alert('Data dealer disimpan! Klik "Export dealer.json" untuk download.');
    }

    function exportDealer() { exportJSON(dealer, 'dealer.json'); }

    // Init: try to load existing data
    async function init() {
      try {
        const [p, pr, d] = await Promise.all([
          fetch('data/products.json').then(r => r.ok ? r.json() : []),
          fetch('data/promos.json').then(r => r.ok ? r.json() : []),
          fetch('data/dealer.json').then(r => r.ok ? r.json() : {})
        ]);
        products = p; promos = pr; dealer = d;
      } catch(e) { products = []; promos = []; dealer = {}; }
      renderProductsList();
      renderPromosList();
      populateDealerForm(dealer);
    }

    init();
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify**

```bash
# http://localhost:8080/admin.html
# Verify: 3 tab switching, form produk bisa tambah varian/spec, Export button download file JSON
```

- [ ] **Step 3: Commit**

```bash
git add admin.html
git commit -m "feat: add admin CMS panel with product/promo/dealer management"
```

---

## Task 9: GitHub Repo & Pages Setup

**Files:** GitHub repo (remote)

- [ ] **Step 1: Create GitHub repo**

```bash
gh repo create mimosa-hyundai --public --description "Website Mimosa Hyundai Medan — Authorized Dealer" --source=. --remote=origin --push
# Atau manual: buat repo di github.com, lalu:
# git remote add origin https://github.com/USERNAME/mimosa-hyundai.git
# git push -u origin main
```

- [ ] **Step 2: Enable GitHub Pages**

```bash
gh api repos/:owner/mimosa-hyundai/pages --method POST --field source[branch]=main --field source[path]=/
# Atau: GitHub.com → repo → Settings → Pages → Source: main branch, folder: / (root) → Save
```

- [ ] **Step 3: Verify deployment**

```bash
# Tunggu 1–2 menit lalu buka:
# https://USERNAME.github.io/mimosa-hyundai/
# Verify: homepage load, produk tampil, WA button muncul
```

- [ ] **Step 4: Update dealer.json dengan nomor WA dan info asli**

Buka `admin.html` → Tab Info Dealer → isi nomor WhatsApp, alamat asli, email → Export → upload ke GitHub.

---

## Task 10: Final Polish & Mobile Verification

- [ ] **Step 1: Test mobile responsiveness**

```bash
# Di browser DevTools, aktifkan device toolbar
# Test di: iPhone SE (375px), iPhone 14 (390px), iPad (768px)
# Verify: navbar collapse ke hamburger, grid 1 kolom, hero split stack vertikal
```

- [ ] **Step 2: Verify all internal links**

```bash
# Klik semua link di navbar
# Klik "Detail" dari homepage → product.html load dengan data benar
# Klik "Lihat Semua Produk" → catalog.html
# Filter di catalog.html berfungsi semua kategori
# WA button di semua halaman buka WhatsApp dengan nomor benar
```

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: mimosa hyundai website complete — v1.0"
git push origin main
```
