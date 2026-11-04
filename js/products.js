/* ============================================================
   PRODUCT CATALOGUE — rendering, search, filtering, add-to-order
   Also renders the homepage "featured" strip.
   ============================================================ */
(function () {
    'use strict';

    const VIVO = window.VIVO;
    if (!VIVO) return;

    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    /* ---------- Card renderer (reused everywhere) ---------- */
    VIVO.renderProductCard = function (product) {
        const tone = VIVO.toneFor(product.category);
        const priceClass = product.variablePrice ? 'pcard__price pcard__price--var' : 'pcard__price';
        const note = product.variablePrice
            ? '<p class="pcard__note">Final price confirmed on WhatsApp</p>'
            : '';

        return '' +
            '<article class="pcard reveal" data-id="' + product.id + '" data-category="' + esc(product.category) + '">' +
            '<div class="pcard__media" data-media data-tone="' + tone + '">' +
            '<img src="' + product.image + '" alt="' + esc(product.name) + ' — VIVO FRESH @ UGANDA" ' +
            'loading="lazy" decoding="async" ' +
            'onerror="this.parentNode.classList.add(\'is-fallback\');this.remove();">' +
            '<span class="media-fallback">' + esc(product.name) + '</span>' +
            '<span class="pcard__tag">' + esc(product.category.replace(' Fruits', '')) + '</span>' +
            '</div>' +
            '<div class="pcard__body">' +
            '<h3 class="pcard__name">' + esc(product.name) + '</h3>' +
            '<p class="pcard__unit">' + VIVO.unitLabel(product) + '</p>' +
            note +
            '<div class="pcard__foot">' +
            '<span class="' + priceClass + '">' + VIVO.formatPrice(product) + '</span>' +
            '<button type="button" class="pcard__add" data-add="' + product.id + '" ' +
            'aria-label="Add ' + esc(product.name) + ' to your order">Add</button>' +
            '</div>' +
            '</div>' +
            '</article>';
    };

    /* ---------- Add-to-order (delegated, works on every page) ---------- */
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-add]');
        if (!btn) return;
        const id = btn.dataset.add;
        if (!VIVO.cart || !VIVO.cart.add(id)) return;

        btn.classList.add('is-added');
        btn.textContent = 'Added ✓';
        setTimeout(function () {
            btn.classList.remove('is-added');
            btn.textContent = 'Add';
        }, 1400);

        const product = VIVO.getProduct(id);
        VIVO.toast(
            product.name + ' added to your order.',
            'View order →',
            'cart.html'
        );
    });

    /* ---------- Homepage featured strip ---------- */
    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid) {
        const FEATURED = ['dragon-fruit', 'blueberry', 'strawberries', 'mangoes', 'avocado', 'pineapple'];
        featuredGrid.innerHTML = FEATURED
            .map(VIVO.getProduct)
            .filter(Boolean)
            .map(VIVO.renderProductCard)
            .join('');
    }

    /* ---------- Homepage category tiles ---------- */
    const categoryGrid = document.getElementById('categoryGrid');
    if (categoryGrid) {
        categoryGrid.innerHTML = VIVO.CATEGORIES.map(function (cat) {
            const n = VIVO.products.filter(function (p) { return p.category === cat; }).length;
            if (!n) return '';
            return '' +
                '<a class="cattile" href="products.html?category=' + encodeURIComponent(cat) + '" data-tone="' + VIVO.toneFor(cat) + '">' +
                '<span class="cattile__glow" aria-hidden="true"></span>' +
                '<span class="cattile__name">' + esc(cat) + '</span>' +
                '<span class="cattile__count">' + n + ' ' + (n === 1 ? 'product' : 'products') + '</span>' +
                '<span class="cattile__arrow" aria-hidden="true">→</span>' +
                '</a>';
        }).join('');
    }

    /* ---------- Catalogue page ---------- */
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const searchInput = document.getElementById('productSearch');
    const clearBtn = document.getElementById('clearSearch');
    const chipsHost = document.getElementById('categoryChips');
    const countEl = document.getElementById('resultCount');
    const emptyState = document.getElementById('emptyState');

    const params = new URLSearchParams(window.location.search);
    let activeCategory = params.get('category') || 'All';
    let query = '';

    if (!['All'].concat(VIVO.CATEGORIES).includes(activeCategory)) activeCategory = 'All';

    /* Build chips */
    function buildChips() {
        const cats = ['All'].concat(VIVO.CATEGORIES.filter(function (c) {
            return VIVO.products.some(function (p) { return p.category === c; });
        }));

        chipsHost.innerHTML = cats.map(function (cat) {
            const n = cat === 'All'
                ? VIVO.products.length
                : VIVO.products.filter(function (p) { return p.category === cat; }).length;
            return '<button type="button" class="chip" data-cat="' + esc(cat) + '" ' +
                'aria-pressed="' + (cat === activeCategory) + '">' +
                esc(cat) + ' <span class="chip__n">' + n + '</span></button>';
        }).join('');
    }

    function matches(product) {
        const catOk = activeCategory === 'All' || product.category === activeCategory;
        if (!catOk) return false;
        if (!query) return true;
        const haystack = (product.name + ' ' + product.category + ' ' + product.description).toLowerCase();
        return haystack.indexOf(query) !== -1;
    }

    function render() {
        const results = VIVO.products.filter(matches);
        grid.innerHTML = results.map(VIVO.renderProductCard).join('');
        grid.hidden = results.length === 0;
        if (emptyState) emptyState.hidden = results.length !== 0;

        if (countEl) {
            countEl.textContent = results.length === 0
                ? 'No fruits match your search'
                : 'Showing ' + results.length + ' of ' + VIVO.products.length + ' products';
        }

        chipsHost.querySelectorAll('.chip').forEach(function (c) {
            c.setAttribute('aria-pressed', String(c.dataset.cat === activeCategory));
        });
    }

    chipsHost.addEventListener('click', function (e) {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        activeCategory = chip.dataset.cat;
        const url = new URL(window.location.href);
        if (activeCategory === 'All') url.searchParams.delete('category');
        else url.searchParams.set('category', activeCategory);
        history.replaceState({}, '', url);
        render();
    });

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            query = searchInput.value.trim().toLowerCase();
            if (clearBtn) clearBtn.hidden = !query;
            render();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            searchInput.value = '';
            query = '';
            clearBtn.hidden = true;
            searchInput.focus();
            render();
        });
    }

    buildChips();
    render();
})();