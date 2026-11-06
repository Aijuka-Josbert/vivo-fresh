/* ============================================================
   PRODUCT CATALOGUE — rendering, search, filtering, add-to-order
   Scope-aware: fruits.html uses 'fruits', vegetables.html uses 'veg'.
   Homepage featured strip runs on any page.
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
            '<span class="pcard__tag">' + esc(product.category) + '</span>' +
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
        /* Cards carry .reveal (opacity 0 until observed); dynamically added cards must be shown
           explicitly or the whole strip looks like a blank white block. */
        featuredGrid.querySelectorAll('.reveal').forEach(function (c) { c.classList.add('is-in'); });
    }

    /* ---------- Homepage category tiles ---------- */
    /* Category tile photo = the first real product photo in that category (no new assets) */
    function tilePhoto(cat) {
        const hit = (VIVO.products || []).concat(window.VIVO_VEGETABLES || []).find(function (p) {
            return p.category === cat && p.image;
        });
        return hit ? '<img class="cattile__img" src="' + esc(hit.image) + '" alt="" loading="lazy" decoding="async">' : '';
    }
        document.querySelectorAll('[data-photo-cat]').forEach(function (el) {
        el.insertAdjacentHTML('afterbegin', tilePhoto(el.getAttribute('data-photo-cat')));
    });
    const categoryGrid = document.getElementById('categoryGrid');
    if (categoryGrid) {
        /* Homepage shows fruit categories only — veg has its own page */
        const FRUIT_CATS = ['Tropical Fruits', 'Berries', 'Citrus Fruits', 'Exotic Fruits', 'Everyday Fruits', 'Seasonal Fruits'];
        categoryGrid.innerHTML = FRUIT_CATS.map(function (cat) {
            const n = VIVO.products.filter(function (p) { return p.category === cat; }).length;
            if (!n) return '';
            return '' +
                '<a class="cattile" href="products.html?category=' + encodeURIComponent(cat) + '" data-tone="' + VIVO.toneFor(cat) + '">' +
                tilePhoto(cat) + '<span class="cattile__glow" aria-hidden="true"></span>' +
                '<span class="cattile__name">' + esc(cat) + '</span>' +
                '<span class="cattile__count">' + n + ' ' + (n === 1 ? 'product' : 'products') + '</span>' +
                '<span class="cattile__arrow" aria-hidden="true">→</span>' +
                '</a>';
        }).join('');
    }

    /* ---------- Homepage: vegetable / spice / meat category tiles ---------- */
    const vegCategoryGrid = document.getElementById('vegCategoryGrid');
    if (vegCategoryGrid) {
        const veg = window.VIVO_VEGETABLES || [];
        const cats = VIVO.CATEGORIES.filter(function (c) { return veg.some(function (p) { return p.category === c; }); });
        vegCategoryGrid.innerHTML = cats.map(function (cat) {
            const n = veg.filter(function (p) { return p.category === cat; }).length;
            return '<a class="cattile" href="vegetables.html?category=' + encodeURIComponent(cat) + '" data-tone="' + VIVO.toneFor(cat) + '">' +
                tilePhoto(cat) + '<span class="cattile__glow" aria-hidden="true"></span>' +
                '<span class="cattile__name">' + esc(cat) + '</span>' +
                '<span class="cattile__count">' + n + ' ' + (n === 1 ? 'product' : 'products') + '</span>' +
                '<span class="cattile__arrow" aria-hidden="true">→</span></a>';
        }).join('');
    }

    /* ---------- Floating "your order" bar (all pages with product cards) ---------- */
    if (document.querySelector('[data-add]') || document.getElementById('productGrid') || featuredGrid) {
        const bar = document.createElement('a');
        bar.className = 'orderbar';
        bar.href = 'cart.html';
        bar.hidden = true;
        bar.setAttribute('aria-live', 'polite');
        document.body.appendChild(bar);
        const refreshBar = function () {
            const lines = VIVO.cart.lines();
            const count = lines.reduce(function (t, l) { return t + l.qty; }, 0);
            bar.hidden = !lines.length;
            const fixed = VIVO.cart.subtotal();
            const hasVar = VIVO.cart.variableLines().length > 0;
            const money = fixed > 0 ? 'UGX ' + new Intl.NumberFormat('en-UG').format(fixed) + (hasVar ? ' + items to confirm' : '') : (hasVar ? 'Price to confirm' : '');
            bar.innerHTML = '<span><b>' + lines.length + (lines.length === 1 ? ' item' : ' items') + '</b>' +
                (money ? '<small>' + money + '</small>' : '') + '</span><strong>View order →</strong>';
            bar.setAttribute('aria-label', 'Review your order: ' + lines.length + ' items, ' + count + ' units');
        };
        VIVO.cart.onChange(refreshBar);
        refreshBar();
    }

    /* ---------- Catalogue page ---------- */
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    /* The host page declares its scope on <body data-scope="fruits|veg">.
       Fallback: infer from the presence of the category chips on the page. */
    const SCOPE = document.body.dataset.scope || 'all';

    const SCOPE_POOL = (function () {
        const fruits = Array.isArray(window.VIVO_FRUITS) ? window.VIVO_FRUITS : [];
        const veg    = Array.isArray(window.VIVO_VEGETABLES) ? window.VIVO_VEGETABLES : [];
        if (SCOPE === 'fruits') return fruits;
        if (SCOPE === 'veg')    return veg;
        return fruits.concat(veg);
    })();

    const SCOPE_CATEGORIES = (function () {
        const all = VIVO.CATEGORIES;
        const present = new Set(SCOPE_POOL.map(function (p) { return p.category; }));
        return all.filter(function (c) { return present.has(c); });
    })();

    const searchInput = document.getElementById('productSearch');
    const clearBtn = document.getElementById('clearSearch');
    const chipsHost = document.getElementById('categoryChips');
    const countEl = document.getElementById('resultCount');
    const emptyState = document.getElementById('emptyState');

    const params = new URLSearchParams(window.location.search);
    let activeCategory = params.get('category') || 'All';
    let query = '';
    let sortMode = 'default';

    /* Sort control, injected once so both catalogue pages share one implementation */
    const toolbarEl = document.querySelector('.toolbar');
    if (toolbarEl) {
        const sortWrap = document.createElement('label');
        sortWrap.className = 'toolbar__sort';
        sortWrap.innerHTML = '<span>Sort by</span><select id="productSort">' +
            '<option value="default">Featured order</option>' +
            '<option value="name">Name A–Z</option>' +
            '<option value="low">Price: low to high</option>' +
            '<option value="high">Price: high to low</option></select>';
        const countNode = document.getElementById('resultCount');
        toolbarEl.insertBefore(sortWrap, countNode);
        sortWrap.querySelector('select').addEventListener('change', function (e) {
            sortMode = e.target.value;
            render();
        });
    }
    /* Variable-price items sort by the low end of their listed range; unpriced ones go last. */
    function sortKey(p) {
        const v = p.variablePrice ? p.priceMin : p.price;
        return v > 0 ? v : Infinity;
    }

    if (!['All'].concat(SCOPE_CATEGORIES).includes(activeCategory)) activeCategory = 'All';

    function buildChips() {
        const cats = ['All'].concat(SCOPE_CATEGORIES);
        chipsHost.innerHTML = cats.map(function (cat) {
            const n = cat === 'All'
                ? SCOPE_POOL.length
                : SCOPE_POOL.filter(function (p) { return p.category === cat; }).length;
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
        /* Every word typed must appear somewhere (order-independent): "red pepper" finds "Pepper, Red" */
        return query.split(/\s+/).every(function (w) { return haystack.indexOf(w) !== -1; });
    }

    let clearFilters = null;
    if (toolbarEl) {
        clearFilters = document.createElement('button');
        clearFilters.type = 'button';
        clearFilters.className = 'toolbar__reset';
        clearFilters.textContent = 'Clear filters';
        clearFilters.hidden = true;
        toolbarEl.appendChild(clearFilters);
        clearFilters.addEventListener('click', function () {
            query = ''; activeCategory = 'All'; sortMode = 'default';
            if (searchInput) searchInput.value = '';
            if (clearBtn) clearBtn.hidden = true;
            const sel = document.getElementById('productSort'); if (sel) sel.value = 'default';
            const url = new URL(window.location.href); url.searchParams.delete('category'); history.replaceState({}, '', url);
            render();
        });
    }

    function render() {
        if (clearFilters) clearFilters.hidden = !(query || activeCategory !== 'All' || sortMode !== 'default');
        const results = SCOPE_POOL.filter(matches);
        if (sortMode === 'name') results.sort(function (a, b) { return a.name.localeCompare(b.name); });
        if (sortMode === 'low') results.sort(function (a, b) { return sortKey(a) - sortKey(b); });
        if (sortMode === 'high') results.sort(function (a, b) {
            const x = sortKey(a), y = sortKey(b);
            return (y === Infinity ? -1 : y) - (x === Infinity ? -1 : x);
        });
        grid.innerHTML = results.map(VIVO.renderProductCard).join('');
        grid.querySelectorAll('.reveal').forEach(function (card) { card.classList.add('is-in'); });

        grid.hidden = results.length === 0;
        if (emptyState) emptyState.hidden = results.length !== 0;

        if (countEl) {
            const noun = SCOPE === 'fruits' ? 'fruits' : 'products';
            countEl.textContent = results.length === 0
                ? 'No ' + noun + ' match your search'
                : 'Showing ' + results.length + ' of ' + SCOPE_POOL.length + ' ' + noun;
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
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchInput.value) { clearBtn && clearBtn.click(); }
        });
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