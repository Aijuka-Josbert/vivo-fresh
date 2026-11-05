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
        Array.isArray(window.VIVO_VEGETABLES) ? window.VIVO_VEGETABLES : []
    );

    VIVO.getProduct = function (id) {
        return VIVO.products.find(function (p) { return p.id === id; }) || null;
    };

    VIVO.CATEGORIES = [
        'Tropical Fruits', 'Berries', 'Citrus Fruits',
        'Exotic Fruits', 'Everyday Fruits', 'Seasonal Fruits'
    ];

    /* ---------- Formatting ---------- */
    const nf = new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 });

    VIVO.formatNumber = function (n) { return nf.format(Math.round(n)); };
    VIVO.formatUGX = function (n) { return 'UGX ' + nf.format(Math.round(n)); };

    VIVO.formatPrice = function (p) {
        if (!p) return '';
        if (p.variablePrice) {
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

    const TONES = {
        'Tropical Fruits': 'tropical', 'Berries': 'berries',
        'Citrus Fruits': 'citrus', 'Exotic Fruits': 'exotic',
        'Everyday Fruits': 'everyday', 'Seasonal Fruits': 'seasonal',
        'Vegetables': 'everyday'
    };
    VIVO.toneFor = function (category) { return TONES[category] || 'exotic'; };

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