/* ============================================================
   CORE — namespace, data lookup, formatting, chrome behaviour
   ============================================================ */
(function () {
    'use strict';

    const VIVO = (window.VIVO = window.VIVO || {});
    const CFG = window.VIVO_CONFIG;
    VIVO.config = CFG;

    /* ---------- Product registry ---------- */
    VIVO.products = [].concat(
        Array.isArray(window.VIVO_FRUITS) ? window.VIVO_FRUITS : [],
        Array.isArray(window.VIVO_VEGETABLES) ? window.VIVO_VEGETABLES : [],
        Array.isArray(window.VIVO_MEAT) ? window.VIVO_MEAT : []
    );

    VIVO.getProduct = function (id) {
        return VIVO.products.find(function (p) { return p.id === id; }) || null;
    };

    VIVO.CATEGORIES = [
        /* Fruits */
        'Tropical Fruits', 'Berries', 'Citrus Fruits',
        'Exotic Fruits', 'Everyday Fruits', 'Seasonal Fruits',
        /* Vegetables / Spices / Meat */
        'Leafy Greens', 'Roots & Tubers', 'Peppers & Chillies',
        'Tomatoes & Onions', 'Beans & Peas', 'Gourds & Squashes',
        'Mushrooms', 'Herbs & Aromatics', 'Vegetables',
        'Spices', 'Meat'
    ];

    const TONES = {
        /* Fruits */
        'Tropical Fruits': 'tropical', 'Berries': 'berries',
        'Citrus Fruits': 'citrus', 'Exotic Fruits': 'exotic',
        'Everyday Fruits': 'everyday', 'Seasonal Fruits': 'seasonal',
        /* Vegetables / Spices / Meat */
        'Leafy Greens': 'leafy', 'Roots & Tubers': 'root',
        'Peppers & Chillies': 'chilli', 'Tomatoes & Onions': 'tomato',
        'Beans & Peas': 'beans', 'Gourds & Squashes': 'gourd',
        'Mushrooms': 'mushroom', 'Herbs & Aromatics': 'herb',
        'Vegetables': 'veg',
        'Spices': 'spice', 'Meat': 'meat'
    };

    VIVO.toneFor = function (category) { return TONES[category] || 'exotic'; };

    /* ---------- Formatting ---------- */
    const nf = new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 });

    VIVO.formatNumber = function (n) { return nf.format(Math.round(n)); };
    VIVO.formatUGX = function (n) { return 'UGX ' + nf.format(Math.round(n)); };

    VIVO.formatPrice = function (p) {
        if (!p) return '';
        if (p.variablePrice) {
            /* Some variable-price items have no listed range yet — never show "UGX 0 – 0" */
            if (!p.priceMin || !p.priceMax) return 'Price on WhatsApp';
            return 'UGX ' + nf.format(p.priceMin) + ' – ' + nf.format(p.priceMax);
        }
        return VIVO.formatUGX(p.price);
    };

    const UNIT_LABELS = {
        piece: 'per piece', kg: 'per kg', packet: 'per packet',
        cluster: 'per cluster', each: 'each', unit: 'per unit'
    };
    VIVO.unitLabel = function (p) {
        return UNIT_LABELS[p.unit] || ('per ' + (p.unit || 'unit'));
    };

    /* ---------- Image fallback (also used inline in HTML) ---------- */
    VIVO.imgFallback = function (img) {
        const host = img.parentNode;
        if (host && host.hasAttribute('data-media')) host.classList.add('is-fallback');
        img.remove();
    };

    /* ---------- Toast ---------- */
    let toastStack = null;
    VIVO.toast = function (message, actionLabel, actionHref) {
        if (!toastStack) {
            toastStack = document.createElement('div');
            toastStack.className = 'toast-stack';
            toastStack.setAttribute('role', 'status');
            toastStack.setAttribute('aria-live', 'polite');
            document.body.appendChild(toastStack);
        }
        const el = document.createElement('div');
        el.className = 'toast';
        const p = document.createElement('p');
        p.textContent = message;
        el.appendChild(p);
        if (actionLabel && actionHref) {
            const a = document.createElement('a');
            a.href = actionHref;
            a.textContent = actionLabel;
            a.className = 'toast__action';
            el.appendChild(a);
        }
        toastStack.appendChild(el);
        requestAnimationFrame(function () { el.classList.add('is-in'); });
        setTimeout(function () {
            el.classList.remove('is-in');
            setTimeout(function () { el.remove(); }, 400);
        }, 4200);
    };

    /* ---------- Footer year ---------- */
    document.querySelectorAll('.js-year').forEach(function (el) {
        el.textContent = String(new Date().getFullYear());
    });

    /* ---------- Header scroll state ---------- */
    const header = document.getElementById('siteHeader');
    if (header) {
        const onScroll = function () {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- Mobile navigation ---------- */
    const navToggle = document.getElementById('navToggle');
    const body = document.body;
    if (navToggle) {
        navToggle.addEventListener('click', function () {
            const open = body.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', String(open));
            navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });
        document.querySelectorAll('#primaryNav a').forEach(function (a) {
            a.addEventListener('click', function () {
                body.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && body.classList.contains('nav-open')) {
                body.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }

    /* ---------- WhatsApp generic links ---------- */
    document.querySelectorAll('[data-wa="general"]').forEach(function (el) {
        const num = CFG.whatsapp.number.intl;
        const msg = 'Hello ' + CFG.brand.name + '!\n\n' +
            "I'd like to find out more about your fresh fruits and delivery across Uganda.";
        el.setAttribute('href', 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg));
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
    });

    /* ---------- Social links ---------- */
    const socialHost = document.querySelector('[data-social-list]');
    if (socialHost) {
        const ICONS = {
            facebook: 'M13 22v-8h2.6l.4-3H13V9.2c0-.9.25-1.5 1.5-1.5H16V5.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H7v3h2.6v8H13z',
            instagram: 'M12 7.4a4.6 4.6 0 100 9.2 4.6 4.6 0 000-9.2zm0 7.6a3 3 0 110-6 3 3 0 010 6zM17 6.3a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2zM16.4 3H7.6A4.6 4.6 0 003 7.6v8.8A4.6 4.6 0 007.6 21h8.8a4.6 4.6 0 004.6-4.6V7.6A4.6 4.6 0 0016.4 3zm3 13.4a3 3 0 01-3 3H7.6a3 3 0 01-3-3V7.6a3 3 0 013-3h8.8a3 3 0 013 3v8.8z',
            tiktok: 'M16.5 3h-2.6v11.4a2.3 2.3 0 11-2.3-2.3c.24 0 .47.04.7.1V9.5a5 5 0 00-.7-.05 5 5 0 105 5V8.7a6.6 6.6 0 003.6 1.1V7.2a4.2 4.2 0 01-3.7-4.2z',
            x: 'M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.1l4.2 5.6L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z',
            youtube: 'M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3-5.2 3z'
        };
        Object.keys(ICONS).forEach(function (key) {
            const url = CFG.social[key];
            const a = document.createElement(url ? 'a' : 'span');
            a.className = 'social-btn' + (url ? '' : ' is-disabled');
            if (url) {
                a.href = url;
                a.target = '_blank';
                a.rel = 'noopener';
                a.setAttribute('aria-label', key.charAt(0).toUpperCase() + key.slice(1));
            } else {
                a.setAttribute('aria-label', key + ' (link coming soon)');
                a.setAttribute('title', 'Coming soon');
            }
            a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="' + ICONS[key] + '"/></svg>';
            socialHost.appendChild(a);
        });
    }

    /* ---------- Reveal on scroll ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in');
                        io.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
            revealEls.forEach(function (el) { io.observe(el); });
        } else {
            revealEls.forEach(function (el) { el.classList.add('is-in'); });
        }
    }
})();

/* ---------- Live catalogue counts: <span data-catalog-count="all|fruits|veg"> ---------- */
(function () {
    'use strict';
    var f = (window.VIVO_FRUITS || []).length, v = (window.VIVO_VEGETABLES || []).length, m = (window.VIVO_MEAT || []).length;
    var n = { fruits: f, veg: v, meat: m, nonfruit: v + m, all: f + v + m };
    document.querySelectorAll('[data-catalog-count]').forEach(function (el) {
        var k = el.getAttribute('data-catalog-count');
        if (n[k]) el.textContent = n[k];
    });
})();


/* ============================================================
   FORM SAFETY — blocks links / web addresses / markup in customer-typed text
   Used by the order form, the contact form and the live field hints.
   (Client-side only: it protects the people reading your WhatsApp/email.
    Spam filtering on the form provider is the second layer — see README.)
   ============================================================ */
(function () {
    'use strict';
    var TLD = 'com|net|org|info|biz|xyz|top|click|link|ug|co|io|me|app|ru|cn|tk|ml|ga|cf|gq|shop|site|online|live|club|vip|icu|buzz|cc|ly|gl|gd|to|tv|ws|pw|su|cam|work|support|store|tech|website|fun|life|world|today|page|dev|cloud|email|zip|mov|bid|loan|win|download|stream|party|review|trade|date|racing|science|men|rest|kim|ooo|gle|help|space|pro|mobi|name|asia|in|us|uk|de|fr|tr|br|ir|pk|ng|ke|za|tz|rw';
    var DOT = '(?:\\.|\\[\\.\\]|\\(\\.\\)|\\{\\.\\}|\\s+dot\\s+|\\s*\\(dot\\)\\s*)';
    var LINK_PATTERNS = [
        /(?:^|[^a-z])(?:https?|ftps?|file|data|javascript|vbscript|blob|mailto|whatsapp)\s*:/i,
        /h\s*t\s*t\s*p\s*s?\s*:/i,
        /hxxps?/i,
        /(?:^|[\s:(])\/\/\S/,
        /w{3}\s*(?:\.|\[\.\]|\(dot\))/i,
        new RegExp('(?:^|[^a-z0-9])[a-z0-9][a-z0-9-]*\\s*' + DOT + '\\s*(?:' + TLD + ')(?![a-z0-9])', 'i'),
        /\b\d{1,3}(?:\.\d{1,3}){3}\b/,
        /\bon[a-z]{3,}\s*=/i
    ];
    var MSG_LINK = 'For your safety, links and web addresses are not allowed here. Please remove it.';
    var MSG_MARKUP = 'Please remove the characters < and > (they are not allowed).';
    var MSG_PHONE = 'Please use digits only (you may include +, spaces or dashes).';

    function normalize(v) {
        var s = String(v == null ? '' : v);
        try { s = s.normalize('NFKC'); } catch (e) { /* old browser */ }
        return s.replace(/[\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g, '');
    }
    /* returns '' when fine, otherwise {code, message} */
    function check(value, kind) {
        var v = normalize(value);
        if (!v) return null;
        if (kind === 'phone') return /^[0-9+()\-\s.]*$/.test(v) ? null : { code: 'chars', message: MSG_PHONE };
        if (/[<>]/.test(v)) return { code: 'markup', message: MSG_MARKUP };
        for (var i = 0; i < LINK_PATTERNS.length; i++) {
            if (LINK_PATTERNS[i].test(v)) return { code: 'link', message: MSG_LINK };
        }
        return null;
    }
    /* last line of defence before text is placed in a WhatsApp/email message */
    function clean(value) {
        return normalize(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/g, '').replace(/[ \t]{3,}/g, '  ').trim();
    }
    window.VIVO = window.VIVO || {};
    window.VIVO.safety = { check: check, clean: clean };
})();

/* ---------- Live character counters: "7 / 25 · min 2" on every form field with a maxlength ---------- */
(function () {
    'use strict';
    document.querySelectorAll('form input[maxlength], form textarea[maxlength]').forEach(function (el) {
        if (['hidden', 'checkbox', 'radio', 'submit'].indexOf(el.type) !== -1 || el.closest('.hp')) return;
        const max = Number(el.getAttribute('maxlength'));
        const min = Number(el.getAttribute('data-min')) || 0;
        const out = document.createElement('p');
        out.className = 'charcount';
        el.insertAdjacentElement('afterend', out);
        function update() {
            const n = el.value.length;
            const kind = el.type === 'tel' ? 'phone' : 'text';
            const bad = el.type !== 'email' && window.VIVO.safety ? window.VIVO.safety.check(el.value, kind) : null;
            if (bad) {
                out.textContent = bad.message;
                out.className = 'charcount is-bad';
                el.setAttribute('aria-invalid', 'true');
                return;
            }
            out.className = 'charcount';
            if (el.getAttribute('aria-invalid') === 'true' && !el.classList.contains('has-error')) el.removeAttribute('aria-invalid');
            out.textContent = n + ' / ' + max + (min ? ' characters · min ' + min : ' characters');
            out.classList.toggle('is-short', min > 0 && n > 0 && n < min);
            out.classList.toggle('is-ok', n >= min && n > 0 && n < max * 0.9);
            out.classList.toggle('is-near', n >= max * 0.9);
        }
        el.addEventListener('input', update);
        el.addEventListener('reset', update);
        el.form && el.form.addEventListener('reset', function () { setTimeout(update, 0); });
        update();
    });
})();

/* ---------- Flavour ribbon: duplicate the items once so the scroll loops seamlessly ---------- */
(function () {
    'use strict';
    document.querySelectorAll('.ribbon__track').forEach(function (t) {
        if (t.getAttribute('data-looped')) return;
        t.innerHTML += t.innerHTML;
        t.setAttribute('data-looped', '1');
    });
})();
