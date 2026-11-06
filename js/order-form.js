/* ============================================================
   CHECKOUT FORM — validation + WhatsApp draft generation
   ============================================================ */
(function () {
    'use strict';

    const VIVO = window.VIVO;
    if (!VIVO) return;

    const form = document.getElementById('orderForm');
    if (!form) return;

    const statusEl = document.getElementById('orderStatus');

    const fields = {
        fullName: {
            el: document.getElementById('fullName'),
            validate: function (v) {
                if (!v.trim()) return 'Please enter your full name.';
                if (v.trim().length < 2) return 'That name looks too short.';
                return '';
            }
        },
        phone: {
            el: document.getElementById('phone'),
            validate: function (v) {
                const digits = v.replace(/[^\d]/g, '');
                if (!digits) return 'Please enter your WhatsApp or contact number.';
                if (digits.length < 9) return 'Please enter a valid phone number.';
                if (digits.length > 15) return 'That number looks too long.';
                return '';
            }
        },
        location: {
            el: document.getElementById('location'),
            validate: function (v) {
                if (!v.trim()) return 'Please tell us where to deliver.';
                if (v.trim().length < 3) return 'Please give a more specific location.';
                return '';
            }
        }
    };

    function setError(key, message) {
        const el = fields[key].el;
        const holder = document.querySelector('[data-error-for="' + key + '"]');
        el.classList.toggle('has-error', !!message);
        el.setAttribute('aria-invalid', message ? 'true' : 'false');
        if (holder) holder.textContent = message;
    }

    function validateAll() {
        let firstInvalid = null;
        Object.keys(fields).forEach(function (key) {
            const message = fields[key].validate(fields[key].el.value);
            setError(key, message);
            if (message && !firstInvalid) firstInvalid = fields[key].el;
        });
        return firstInvalid;
    }

    Object.keys(fields).forEach(function (key) {
        fields[key].el.addEventListener('blur', function () {
            setError(key, fields[key].validate(fields[key].el.value));
        });
        fields[key].el.addEventListener('input', function () {
            if (fields[key].el.classList.contains('has-error')) {
                setError(key, fields[key].validate(fields[key].el.value));
            }
        });
    });

    function collectCustomer() {
        return {
            name: fields.fullName.el.value.trim(),
            phone: fields.phone.el.value.trim(),
            location: fields.location.el.value.trim(),
            notes: (document.getElementById('notes') || {}).value || ''
        };
    }

    function showStatus(kind, html) {
        if (!statusEl) return;
        statusEl.className = 'form-status is-' + kind;
        statusEl.innerHTML = html;
        statusEl.hidden = false;
    }

    function buildMessage() {
        return VIVO.whatsapp.buildOrderMessage(collectCustomer(), VIVO.cart.lines());
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!VIVO.cart.hasItems()) {
            VIVO.toast('Your order is empty — add some fruits first.');
            return;
        }

        const invalid = validateAll();
        if (invalid) {
            invalid.focus();
            showStatus('error', '<strong>Please check the highlighted fields.</strong>');
            return;
        }

        const message = buildMessage();
        const url = VIVO.whatsapp.open(message);
        sessionStorage.setItem('vivo_wa_drafted', 'true');

        // 1. Show the status message
        showStatus('info',
            '<strong>WhatsApp has opened in a new tab.</strong>' +
            '<p>Please press <strong>Send</strong> in the WhatsApp app to deliver your order to us. We will then confirm availability, final prices and delivery.</p>' +
            '<p class="form-status__small">If WhatsApp did not open, use <strong>Copy order message</strong> and send it manually.</p>'
        );

        // 2. Change the UI to show we are waiting for them to send it
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Waiting for WhatsApp...';

            // Optional: Re-enable after 10 seconds in case they couldn't send it
            setTimeout(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Re-send order via WhatsApp';
            }, 10000);
        }
    });

    const copyBtn = document.getElementById('copyOrderBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            if (!VIVO.cart.hasItems()) {
                VIVO.toast('Your order is empty.');
                return;
            }
            const invalid = validateAll();
            if (invalid) { invalid.focus(); return; }
            const message = buildMessage();
            const done = function () {
                copyBtn.textContent = 'Copied ✓';
                setTimeout(function () { copyBtn.textContent = 'Copy order message'; }, 1800);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(message).then(done).catch(function () {
                    VIVO.toast('Could not copy automatically. Please select the text manually.');
                });
            } else {
                VIVO.toast('Copying is not supported in this browser.');
            }
        });
    }
})();