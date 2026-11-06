# VIVO FRESH — change log (this pass)

Files changed: index.html, products.html, js/main.js, js/products.js

1. Counts: homepage said "133 products / 79 vegetables"; data has 43 + 88 = 131. Static text corrected and now filled from the data arrays (`data-count` attributes, js/products.js).
2. `red-pepper-powder` is variable-price with no range, so the site showed "UGX 0 – 0". It now shows "Price on WhatsApp" (js/main.js). No price was invented.
3. Search: all typed words must match (any order); Esc clears the search box.

Tested: syntax check (node --check), data audit script (131 records, 0 duplicate ids, 131/131 images exist).
NOT tested: in a browser, on a phone, or on Netlify.

Needs owner decision (NOT changed):
- Second WhatsApp number +256 755 554 669 on contact.html, while config.js says one number only.
- Cash on delivery is stated on about/delivery/cart/index and in the WhatsApp message ("I will pay cash on delivery"). Confirm it is real.
- Delivery coverage "All over Uganda" and no delivery fee/time promised: confirm.
- Contact form provider is "none" (form cannot send until Formspree/Web3Forms is set).
- Domain vivofreshuganda.com used in canonical/sitemap: confirm it is owned and live.
- Static meta text in products.html (title/description say "43") cannot be data-driven; update if fruit count changes.

Suggested commit: "fix: correct catalogue counts, zero-range price display, multi-word search"
