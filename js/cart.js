/* ============================================================
   CART — localStorage-backed. Variable-price lines never
   contribute a numeric subtotal.
   ============================================================ */
(function () {
  'use strict';

  const VIVO = window.VIVO;
  if (!VIVO) return;

  const KEY = (VIVO.config.cart && VIVO.config.cart.storageKey) || 'vivofresh.cart.v1';
  const MAX_QTY = 999;
  const listeners = [];

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter(function (i) {
          return i && typeof i.id === 'string' && Number.isFinite(i.qty) && i.qty > 0;
        })
        .map(function (i) {
          return { id: i.id, qty: Math.min(MAX_QTY, Math.max(1, Math.floor(i.qty))) };
        })
        .filter(function (i) { return !!VIVO.getProduct(i.id); });
    } catch (e) {
      return [];
    }
  }

  function write(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage unavailable */ }
  }

  function emit() {
    updateBadges();
    listeners.forEach(function (fn) { try { fn(); } catch (e) { /* noop */ } });
  }

  function updateBadges() {
    const n = count();
    document.querySelectorAll('.js-cart-count').forEach(function (el) {
      el.textContent = String(n);
      el.dataset.count = String(n);
    });
  }

  function count() {
    return read().reduce(function (sum, i) { return sum + i.qty; }, 0);
  }

  function lines() {
    return read().map(function (item) {
      const product = VIVO.getProduct(item.id);
      if (!product) return null;
      return {
        product: product,
        qty: item.qty,
        lineTotal: product.variablePrice ? null : product.price * item.qty
      };
    }).filter(Boolean);
  }

  function subtotal() {
    return lines().reduce(function (sum, l) {
      return l.lineTotal === null ? sum : sum + l.lineTotal;
    }, 0);
  }

  function variableLines() {
    return lines().filter(function (l) { return l.product.variablePrice; });
  }

  VIVO.cart = {
    get: read,
    lines: lines,
    count: count,
    subtotal: subtotal,
    variableLines: variableLines,
    hasItems: function () { return read().length > 0; },

    add: function (id, qty) {
      const amount = Math.max(1, Math.floor(qty || 1));
      if (!VIVO.getProduct(id)) return false;
      const items = read();
      const existing = items.find(function (i) { return i.id === id; });
      if (existing) {
        existing.qty = Math.min(MAX_QTY, existing.qty + amount);
      } else {
        items.push({ id: id, qty: Math.min(MAX_QTY, amount) });
      }
      write(items);
      emit();
      return true;
    },

    setQty: function (id, qty) {
      const q = Math.floor(qty);
      let items = read();
      if (!Number.isFinite(q) || q < 1) {
        items = items.filter(function (i) { return i.id !== id; });
      } else {
        const item = items.find(function (i) { return i.id === id; });
        if (!item) return;
        item.qty = Math.min(MAX_QTY, q);
      }
      write(items);
      emit();
    },

    remove: function (id) {
      write(read().filter(function (i) { return i.id !== id; }));
      emit();
    },

    clear: function () { 
      write([]); 
      emit(); 
      // Clear the "drafted" flag when the cart is completely emptied
      sessionStorage.removeItem('vivo_wa_drafted');
    },

    onChange: function (fn) { listeners.push(fn); },
    refreshBadges: updateBadges
  };

  /* Cross-tab sync */
  window.addEventListener('storage', function (e) {
    if (e.key === KEY) emit();
  });

  updateBadges();

  /* ============================================================
     CART PAGE RENDERING (only runs where the elements exist)
     ============================================================ */
  const listEl = document.getElementById('cartItems');
  const emptyEl = document.getElementById('cartEmpty');
  const summaryEl = document.getElementById('cartSummary');
  const layoutEl = document.getElementById('cartLayout');

  if (!listEl) return;

  function mediaMarkup(product, cls) {
    const tone = VIVO.toneFor(product.category);
    return '<div class="' + cls + '" data-media data-tone="' + tone + '">' +
      '<img src="' + product.image + '" alt="' + product.name + ' — VIVO FRESH @ UGANDA" ' +
      'loading="lazy" decoding="async" ' +
      'onerror="this.parentNode.classList.add(\'is-fallback\');this.remove();">' +
      '<span class="media-fallback">' + product.name + '</span>' +
      '</div>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render() {
    const items = VIVO.cart.lines();
    const has = items.length > 0;

    if (emptyEl) emptyEl.hidden = has;
    listEl.hidden = !has;
    if (layoutEl) layoutEl.classList.toggle('is-empty', !has);

    if (!has) {
      listEl.innerHTML = '';
      if (summaryEl) summaryEl.innerHTML = '';
      return;
    }

    listEl.innerHTML = items.map(function (line) {
      const p = line.product;
      const priceLine = p.variablePrice
        ? '<p class="citem__price citem__price--var">' + VIVO.formatPrice(p) + ' ' + VIVO.unitLabel(p) + '</p>' +
          '<p class="citem__flag">Final price confirmed on WhatsApp</p>'
        : '<p class="citem__price">' + VIVO.formatUGX(p.price) + ' · ' + VIVO.unitLabel(p) + '</p>';

      const totalLine = line.lineTotal === null
        ? '<span class="citem__total citem__total--var">To be confirmed</span>'
        : '<span class="citem__total">' + VIVO.formatUGX(line.lineTotal) + '</span>';

      return '' +
        '<article class="citem" data-id="' + p.id + '">' +
          mediaMarkup(p, 'citem__media') +
          '<div class="citem__info">' +
            '<h3 class="citem__name">' + esc(p.name) + '</h3>' +
            priceLine +
          '</div>' +
          '<div class="citem__controls">' +
            '<div class="stepper" role="group" aria-label="Quantity for ' + esc(p.name) + '">' +
              '<button type="button" class="stepper__btn" data-act="dec" aria-label="Decrease quantity">&minus;</button>' +
              '<input class="stepper__input" type="number" inputmode="numeric" min="1" max="999" value="' + line.qty + '" data-act="qty" aria-label="Quantity">' +
              '<button type="button" class="stepper__btn" data-act="inc" aria-label="Increase quantity">+</button>' +
            '</div>' +
            totalLine +
            '<button type="button" class="citem__remove" data-act="remove">Remove</button>' +
          '</div>' +
        '</article>';
    }).join('');

    renderSummary(items);
  }

  function renderSummary(items) {
    if (!summaryEl) return;
    const fixedSubtotal = VIVO.cart.subtotal();
    const variable = items.filter(function (l) { return l.product.variablePrice; });
    const fixedCount = items.filter(function (l) { return !l.product.variablePrice; }).length;

    let variableBlock = '';
    if (variable.length) {
      variableBlock =
        '<div class="summary__var">' +
          '<h3 class="summary__var-title">Price confirmation required</h3>' +
          '<ul>' +
            variable.map(function (l) {
              return '<li><strong>' + esc(l.product.name) + '</strong> × ' + l.qty +
                     ' — listed at ' + VIVO.formatPrice(l.product) + ' ' + VIVO.unitLabel(l.product) + '</li>';
            }).join('') +
          '</ul>' +
          '<p>The final amount for these items will be confirmed with you on WhatsApp before your order is finalised.</p>' +
        '</div>';
    }

    summaryEl.innerHTML = '' +
      '<div class="summary__card">' +
        '<h2 class="summary__title">Order summary</h2>' +
        '<dl class="summary__rows">' +
          '<div><dt>Fixed-price items (' + fixedCount + ')</dt><dd>' + VIVO.formatUGX(fixedSubtotal) + '</dd></div>' +
          (variable.length
            ? '<div><dt>Range-priced items</dt><dd class="summary__muted">To be confirmed</dd></div>'
            : '') +
          '<div><dt>Delivery</dt><dd class="summary__muted">Fee applies (confirmed on WhatsApp)</dd></div>' +
        '</dl>' +
        '<div class="summary__total">' +
          '<span>Subtotal' + (variable.length ? ' (fixed items)' : '') + '</span>' +
          '<strong>' + VIVO.formatUGX(fixedSubtotal) + '</strong>' +
        '</div>' +
        variableBlock +
        '<div class="summary__var" style="background: rgba(40, 89, 67, 0.08); border-color: rgba(40, 89, 67, 0.2); margin-bottom: 1rem;">' +
          '<p style="font-weight: 600; color: var(--green);">Payment Method: Cash on Delivery</p>' +
          '<p style="margin-top: 0.25rem; color: var(--charcoal); font-size: 0.8rem;">We accept cash upon delivery. No online payment is required.</p>' +
        '</div>' +
        '<p class="summary__note">Delivery fees are not calculated here. VIVO FRESH will confirm delivery fees and timing with you before the order is completed.</p>' +
        '<button type="submit" form="orderForm" class="btn btn--coral btn--block" id="sendOrderBtn">Send order via WhatsApp</button>' +
        '<p class="summary__safe">Opening WhatsApp does <strong>not</strong> place your order — you must press <strong>Send</strong> in WhatsApp. We will then confirm availability, final prices and delivery.</p>' +
        '<button type="button" class="btn btn--ghost btn--block btn--sm" id="copyOrderBtn">Copy order message</button>' +
        '<button type="button" class="btn btn--ghost btn--block btn--sm summary__clear" id="clearOrderBtn">Clear whole order</button>' +
      '</div>';

    // Check if they already clicked send (sessionStorage flag set by order-form.js)
    if (VIVO.cart.hasItems() && sessionStorage.getItem('vivo_wa_drafted') === 'true') {
        const sendBtn = document.getElementById('sendOrderBtn');
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.textContent = 'Order drafted — check WhatsApp';
            sendBtn.style.background = 'var(--line-strong)';
            sendBtn.style.borderColor = 'var(--line-strong)';
            sendBtn.style.color = 'var(--muted)';
            sendBtn.style.cursor = 'not-allowed';
            sendBtn.style.transform = 'none';
            if (!document.getElementById('resendBtn')) {
                const again = document.createElement('button');
                again.type = 'button';
                again.id = 'resendBtn';
                again.className = 'btn btn--ghost btn--block btn--sm';
                again.textContent = 'WhatsApp did not open? Send again';
                again.addEventListener('click', function () {
                    sessionStorage.removeItem('vivo_wa_drafted');
                    render();
                });
                sendBtn.insertAdjacentElement('afterend', again);
            }
        }
    }
  }

  /* ---------- Quantity / remove interaction ---------- */
  listEl.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-act]');
    if (!btn) return;
    const card = btn.closest('.citem');
    if (!card) return;
    const id = card.dataset.id;
    const current = VIVO.cart.get().find(function (i) { return i.id === id; });
    if (!current) return;

    const act = btn.dataset.act;
    if (act === 'inc' || act === 'dec' || act === 'remove') {
        // If they modify the cart, remove the drafted flag so they can send an updated order
        sessionStorage.removeItem('vivo_wa_drafted');
    }

    if (act === 'inc') VIVO.cart.setQty(id, current.qty + 1);
    if (act === 'dec') VIVO.cart.setQty(id, current.qty - 1);
    if (act === 'remove') {
      VIVO.cart.remove(id);
      VIVO.toast('Removed from your order.');
    }
  });

  listEl.addEventListener('change', function (e) {
    const input = e.target.closest('input[data-act="qty"]');
    if (!input) return;
    const card = input.closest('.citem');
    const id = card.dataset.id;
    const value = parseInt(input.value, 10);
    
    // If they modify the cart, remove the drafted flag so they can send an updated order
    sessionStorage.removeItem('vivo_wa_drafted');
    
    /* A blank or 0 entry used to delete the line silently. Restore a safe quantity instead;
       the Remove button is the only way to delete. */
    if (!Number.isFinite(value) || value < 1) {
      const cur = VIVO.cart.get().find(function (i) { return i.id === id; });
      input.value = cur ? cur.qty : 1;
      VIVO.toast('Quantity must be at least 1. Use Remove to delete an item.');
    } else {
      VIVO.cart.setQty(id, value);
    }
  });

  /* Clear whole order (asks first so a stray tap cannot wipe the cart) */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#clearOrderBtn')) return;
    if (window.confirm('Remove every item from your order?')) {
      sessionStorage.removeItem('vivo_wa_drafted');
      VIVO.cart.clear();
      VIVO.toast('Your order has been cleared.');
    }
  });

  VIVO.cart.onChange(render);
  render();
})();