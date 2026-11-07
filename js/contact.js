/* ============================================================
   CONTACT FORM — static-host compatible (Formspree / Web3Forms)
   Refuses to pretend to send when not configured.
   ============================================================ */
(function () {
  'use strict';

  const VIVO = window.VIVO;
  if (!VIVO) return;

  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('contactStatus');
  const submitBtn = form.querySelector('[type="submit"]');
  const CFG = VIVO.config.email;
  const loadedAt = Date.now();

  const rules = {
    contactName: function (v) {
      if (!v.trim()) return 'Please enter your name.';
      if (v.trim().length < 2) return 'Please enter your full name.';
      const bad = VIVO.safety.check(v);
      return bad ? bad.message : '';
    },
    contactEmail: function (v) {
      if (!v.trim()) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Please enter a valid email address.';
      return '';
    },
    contactSubject: function (v) {
      if (!v.trim()) return 'Please add a subject.';
      const bad = VIVO.safety.check(v);
      return bad ? bad.message : '';
    },
    contactMessage: function (v) {
      if (!v.trim()) return 'Please write a message.';
      if (v.trim().length < 10) return 'Please add a little more detail (10 characters minimum).';
      const bad = VIVO.safety.check(v);
      return bad ? bad.message : '';
    }
  };

  function setError(name, message) {
    const el = form.elements[name];
    const holder = form.querySelector('[data-error-for="' + name + '"]');
    if (el) {
      el.classList.toggle('has-error', !!message);
      el.setAttribute('aria-invalid', message ? 'true' : 'false');
    }
    if (holder) holder.textContent = message;
  }

  function validate() {
    let firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      const el = form.elements[name];
      const message = rules[name](el ? el.value : '');
      setError(name, message);
      if (message && !firstInvalid) firstInvalid = el;
    });
    return firstInvalid;
  }

  function showStatus(kind, html) {
    statusEl.className = 'form-status is-' + kind;
    statusEl.innerHTML = html;
    statusEl.hidden = false;
  }

  Object.keys(rules).forEach(function (name) {
    const el = form.elements[name];
    if (!el) return;
    el.addEventListener('blur', function () { setError(name, rules[name](el.value)); });
    el.addEventListener('input', function () {
      if (el.classList.contains('has-error')) setError(name, rules[name](el.value));
    });
  });

  function endpoint() {
    if (CFG.provider === 'formspree') return CFG.formspreeEndpoint;
    if (CFG.provider === 'web3forms') return 'https://api.web3forms.com/submit';
    return '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const invalid = validate();
    if (invalid) { invalid.focus(); return; }

    /* Basic bot/spam protection: honeypot, too-fast submit, and a short cool-down between sends */
    if (form.elements.botcheck && form.elements.botcheck.value) { form.reset(); return; }
    if (Date.now() - loadedAt < 2500) {
      showStatus('error', '<strong>One moment.</strong><p>Please re-read your message, then press Send again.</p>');
      return;
    }
    try {
      const last = Number(localStorage.getItem('vivo_contact_last') || 0);
      if (Date.now() - last < 30000) {
        showStatus('error', '<strong>Message already sent.</strong><p>Please wait a few seconds before sending another one.</p>');
        return;
      }
    } catch (err) { /* storage blocked: skip cool-down */ }

    const url = endpoint();
    if (!url) {
      showStatus('error',
        '<strong>The email form is not connected yet.</strong>' +
        '<p>Please reach us directly at <a href="mailto:' + CFG.recipient + '">' + CFG.recipient + '</a> ' +
        'or message us on WhatsApp at <a href="https://wa.me/' + VIVO.config.whatsapp.number.intl + '" target="_blank" rel="noopener">' +
        VIVO.config.whatsapp.number.display + '</a>.</p>'
      );
      return;
    }

    const payload = {
      name: VIVO.safety.clean(form.elements.contactName.value),
      email: form.elements.contactEmail.value.trim(),
      subject: VIVO.safety.clean(form.elements.contactSubject.value),
      message: VIVO.safety.clean(form.elements.contactMessage.value),
      _subject: 'VIVO FRESH website enquiry — ' + VIVO.safety.clean(form.elements.contactSubject.value)
    };

    if (CFG.provider === 'web3forms') {
      payload.access_key = CFG.web3formsAccessKey;
      payload.from_name = 'VIVO FRESH Website';
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    showStatus('info', 'Sending your message…');

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        if (!result.ok) throw new Error('Request failed');
        form.reset();
        try { localStorage.setItem('vivo_contact_last', String(Date.now())); } catch (err) { /* ignore */ }
        showStatus('success',
          '<strong>Thank you — your message has been sent.</strong>' +
          '<p>We will reply to you as soon as we can. For urgent orders, message us on WhatsApp.</p>'
        );
      })
      .catch(function () {
        showStatus('error',
          '<strong>Sorry, your message could not be sent.</strong>' +
          '<p>Please try again, or contact us directly at <a href="mailto:' + CFG.recipient + '">' + CFG.recipient + '</a> ' +
          'or on <a href="https://wa.me/' + VIVO.config.whatsapp.number.intl + '" target="_blank" rel="noopener">WhatsApp</a>.</p>'
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      });
  });
})();