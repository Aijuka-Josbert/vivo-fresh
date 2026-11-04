/* ============================================================
   WHATSAPP — builds a draft order message and opens wa.me.
   Opening WhatsApp is NOT order submission.
   ============================================================ */
(function () {
    'use strict';

    const VIVO = window.VIVO;
    if (!VIVO) return;

    const CFG = VIVO.config;

    function link(message) {
        return 'https://wa.me/' + CFG.whatsapp.orderNumber +
            '?text=' + encodeURIComponent(message);
    }

    function buildOrderMessage(customer, lines) {
        const L = [];
        L.push('Hello ' + CFG.brand.name + '!');
        L.push('');
        L.push('I would like to place an order.');
        L.push('');
        L.push('Customer: ' + customer.name);
        L.push('Contact: ' + customer.phone);
        L.push('Delivery location: ' + customer.location);
        L.push('');
        L.push('ORDER DETAILS:');
        L.push('');

        let fixedSubtotal = 0;
        const variable = [];

        lines.forEach(function (line, i) {
            const p = line.product;
            L.push((i + 1) + '. ' + p.name);
            L.push('   Quantity: ' + line.qty);
            if (p.variablePrice) {
                L.push('   Listed range: ' + VIVO.formatPrice(p) + ' ' + VIVO.unitLabel(p));
                L.push('   Line total: To be confirmed');
                variable.push(p);
            } else {
                L.push('   Unit price: ' + VIVO.formatUGX(p.price));
                L.push('   Line total: ' + VIVO.formatUGX(p.price * line.qty));
                fixedSubtotal += p.price * line.qty;
            }
            L.push('');
        });

        L.push('Subtotal (fixed-price items): ' + VIVO.formatUGX(fixedSubtotal));

        if (variable.length) {
            L.push('');
            L.push('The following items are priced on confirmation:');
            variable.forEach(function (p) {
                L.push('- ' + p.name + ' (' + VIVO.formatPrice(p) + ' ' + VIVO.unitLabel(p) + ')');
            });
            L.push('Please confirm the final price for these before the order is finalised.');
        }

        if (customer.notes && customer.notes.trim()) {
            L.push('');
            L.push('Additional instructions:');
            L.push(customer.notes.trim());
        }

        L.push('');
        L.push('Please confirm product availability, delivery fees and estimated delivery time.');
        L.push('');
        L.push('Thank you!');

        return L.join('\n');
    }

    VIVO.whatsapp = {
        link: link,
        buildOrderMessage: buildOrderMessage,
        open: function (message) {
            const url = link(message);
            const win = window.open(url, '_blank', 'noopener');
            if (!win) window.location.href = url;
            return url;
        }
    };
})();