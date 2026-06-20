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
