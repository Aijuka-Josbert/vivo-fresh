/* ============================================================
   PRODUCT DETAIL PAGE — product.html?id=<product-id>
   Uses the existing product data only (nothing invented).
   ============================================================ */
(function () {
  'use strict';
  const VIVO = window.VIVO;
  const root = document.getElementById('productDetail');
  if (!VIVO || !root) return;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* The id is validated against the data; it is never inserted into the page raw. */
  const rawId = new URLSearchParams(window.location.search).get('id') || '';
  const product = /^[a-z0-9-]{1,80}$/i.test(rawId) ? VIVO.getProduct(rawId) : null;

  if (!product) {
    document.title = 'Product not found | VIVO FRESH @ UGANDA';
    root.innerHTML = '<div class="empty-state"><h3>We could not find that product</h3>' +
      '<p>It may have been renamed or removed. Browse everything we sell instead.</p>' +
      '<a class="btn btn--primary" href="shop.html">Browse the shop</a></div>';
    return;
  }

  const isMeat = (window.VIVO_MEAT || []).some(function (p) { return p.id === product.id; });
  const isVeg = (window.VIVO_VEGETABLES || []).some(function (p) { return p.id === product.id; });
  const dept = isMeat ? { label: 'Meat', href: 'meat.html' }
    : (isVeg ? { label: 'Vegetables & Spices', href: 'vegetables.html' } : { label: 'Fruits', href: 'products.html' });
  const price = VIVO.formatPrice(product);
  const tone = VIVO.toneFor(product.category);

  /* Page title / description / canonical */
  document.title = product.name + ' — fresh from Nakasero | VIVO FRESH @ UGANDA';
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', product.name + ' (' + VIVO.unitLabel(product) + ') — ' + price + '. ' + product.description);
  const canon = document.getElementById('canonicalLink');
  if (canon) canon.setAttribute('href', 'https://vivofreshuganda.com/product.html?id=' + encodeURIComponent(product.id));

  const crumbs = document.getElementById('pdCrumbs');
  if (crumbs) {
    crumbs.innerHTML = '<a href="index.html">Home</a> <span aria-hidden="true">/</span> ' +
      '<a href="' + dept.href + (isMeat ? '' : '?category=' + encodeURIComponent(product.category)) + '">' + esc(isMeat ? 'Meat' : product.category) + '</a> ' +
      '<span aria-hidden="true">/</span> <span aria-current="page">' + esc(product.name) + '</span>';
  }

  const note = product.variablePrice
    ? '<p class="pd__note">This price is a range. We confirm the exact price with you on WhatsApp before your order total is final.</p>'
    : '';
  const waText = 'Hello VIVO FRESH, I would like to ask about: ' + product.name + ' (' + VIVO.unitLabel(product) + ').';

  root.innerHTML =
    '<article class="pd">' +
    '<div class="pd__media pcard__media" data-media data-tone="' + tone + '">' +
    '<img src="' + esc(product.image) + '" alt="' + esc(product.name) + ' — VIVO FRESH @ UGANDA" width="800" height="800" fetchpriority="high" decoding="async" ' +
    'onerror="this.parentNode.classList.add(\'is-fallback\');this.remove();">' +
    '<span class="media-fallback">' + esc(product.name) + '</span>' +
    '</div>' +
    '<div class="pd__info">' +
    '<span class="pd__tag">' + esc(product.category) + '</span>' +
    '<h1 class="pd__title">' + esc(product.name) + '</h1>' +
    '<p class="pd__unit">' + esc(VIVO.unitLabel(product)) + '</p>' +
    '<p class="pd__price">' + esc(price) + '</p>' + note +
    '<p class="pd__desc">' + esc(product.description) + '</p>' +
    '<div class="pd__buy">' +
    '<div class="pd__qty" role="group" aria-label="Quantity">' +
    '<button type="button" id="pdMinus" aria-label="Decrease quantity">−</button>' +
    '<input id="pdQty" type="number" inputmode="numeric" min="1" max="99" value="1" aria-label="Quantity">' +
    '<button type="button" id="pdPlus" aria-label="Increase quantity">+</button>' +
    '</div>' +
    '<button type="button" class="btn btn--coral" id="pdAdd">Add to order</button>' +
    '</div>' +
    '<a class="btn btn--ghost pd__ask" id="pdAsk" target="_blank" rel="noopener noreferrer" href="' + esc(VIVO.whatsapp.link(waText)) + '">Ask about this on WhatsApp</a>' +
    '<ul class="pd__facts">' +
    '<li><span>Sold</span><strong>' + esc(VIVO.unitLabel(product)) + '</strong></li>' +
    '<li><span>Category</span><strong>' + esc(product.category) + '</strong></li>' +
    '<li><span>Availability &amp; delivery</span><strong>Confirmed on WhatsApp</strong></li>' +
    '</ul>' +
    '</div>' +
    '</article>';

  const qty = document.getElementById('pdQty');
  function clamp() { let v = Math.floor(Number(qty.value)); if (!Number.isFinite(v) || v < 1) v = 1; if (v > 99) v = 99; qty.value = v; return v; }
  document.getElementById('pdMinus').addEventListener('click', function () { qty.value = clamp() - 1; clamp(); });
  document.getElementById('pdPlus').addEventListener('click', function () { qty.value = clamp() + 1; clamp(); });
  qty.addEventListener('change', clamp);
  document.getElementById('pdAdd').addEventListener('click', function (e) {
    const n = clamp();
    if (VIVO.cart.add(product.id, n)) {
      e.target.textContent = 'Added ✓';
      setTimeout(function () { e.target.textContent = 'Add to order'; }, 1400);
      VIVO.toast(n + ' × ' + product.name + ' added to your order.', 'View order →', 'cart.html');
    }
  });

  /* Structured data (fixed-price items include the price; no availability claims) */
  try {
    const ld = {
      '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description,
      category: product.category, image: new URL(product.image, window.location.href).href, brand: { '@type': 'Brand', name: 'VIVO FRESH @ UGANDA' }
    };
    if (!product.variablePrice && product.price > 0) ld.offers = { '@type': 'Offer', priceCurrency: 'UGX', price: String(product.price) };
    const tag = document.createElement('script'); tag.type = 'application/ld+json'; tag.textContent = JSON.stringify(ld);
    document.head.appendChild(tag);
  } catch (e) { /* non-critical */ }

  /* You may also like: same category first, then the rest of the same department, then the other one */
  const pool = (isMeat ? window.VIVO_MEAT : (isVeg ? window.VIVO_VEGETABLES : window.VIVO_FRUITS)) || [];
  const others = pool.filter(function (p) { return p.id !== product.id && p.available !== false; });
  const same = others.filter(function (p) { return p.category === product.category; });
  const rest = others.filter(function (p) { return p.category !== product.category; });
  const idx = pool.findIndex(function (p) { return p.id === product.id; });
  const rotate = function (list) { return list.filter(function (p) { return pool.indexOf(p) > idx; }).concat(list.filter(function (p) { return pool.indexOf(p) < idx; })); };
  /* Meat has few items: top up with popular vegetables so the strip is never nearly empty */
  const extra = isMeat ? (window.VIVO_VEGETABLES || []).slice(0, 4) : [];
  const picks = rotate(same).concat(rotate(rest), extra).slice(0, 4);
  const grid = document.getElementById('alsoGrid');
  const sect = document.getElementById('alsoSection');
  if (grid && sect && picks.length) {
    grid.innerHTML = picks.map(VIVO.renderProductCard).join('');
    grid.querySelectorAll('.reveal').forEach(function (c) { c.classList.add('is-in'); });
    sect.hidden = false;
  }
})();
