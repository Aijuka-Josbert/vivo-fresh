# VIVO FRESH — change log (cumulative)

Owner decisions applied: second number (+256 755 554 669) removed, one WhatsApp number only (+256 788 733 850); delivery all over Uganda and cash on delivery are owner-approved and kept; Web3Forms key to be added by owner.

## Fixes (Phase 1)

- Counts derived from data (`data-catalog-count`), including the hero badge (was 133), About and vegetables (was 90). 131 = 43 + 88.
- Variable-price item with no range showed "UGX 0 – 0"; now "Price on WhatsApp".
- Homepage script-order bug: index.html loaded main.js last, so products.js ran before the shared helpers and the featured strip/category tiles could not render. main.js now loads before products.js.
- delivery.html: "all over Uganda; availability, fee and timing confirmed on WhatsApp".
- Contact page: second number removed (card + meta text); README updated.

## Shop experience (Phase 2)

- NEW shop.html "Shop All" (all products, same data and JS); in the nav on every page, header "Shop Now" points to it, added to sitemap.
- Hero: "Fresh from Nakasero. Delivered across Uganda." with "Shop all products" / "Explore categories".
- Category tiles use real product photos from existing images (fruits and vegetables/spices/meat).
- Search matches all words; Esc clears; sort (A-Z, price); "Clear filters"; price-confirmation note.
- Floating order bar: item count, fixed subtotal, "items to confirm" for variable prices.
- Cart: no silent delete on 0/blank quantity; Clear whole order (confirm); "WhatsApp did not open? Send again".
- Product name/price in DM Sans; equal-height cards with button pinned to the bottom.

## Responsive / accessibility (Phase 3)

- Two-column product grid <=480px; swipeable chips; 44px tap targets; 320px tweaks.
- Mobile menu now scrolls on short screens (was overflow hidden).
- Visible focus ring; prefers-reduced-motion respected.

## Tests actually run

- node --check on all JS; data audit (131 records, 0 duplicate IDs, 131/131 images exist); 0 broken local links.
- jsdom (simulated browser over HTTP): shop.html 131 cards and 18 chips, multi-word search, sort, clear filters, add-to-cart updates header badge and order bar, home tiles (6 fruit + 11 veg) with photos, correct counts, ?category=Meat, cart page loads. 12/12 pass.
- NOT tested: real browsers/phones, visual layout at 320/360/390/430px, Netlify.

## Still needs the owner

- Web3Forms key (see README). Until then the form says it is not connected.
- Confirm vivofreshuganda.com is owned and live.
- Check every product name/unit/price against the approved catalogue (never copy competitor prices).
- Genuine photos, testimonials, offers/packages: none added (none supplied).
- products.html <title>/meta still say 43 (static meta).

## Round 3 (after owner feedback + screenshots)

- FIXED blank white block on the homepage "Fresh favourites": cards carried `.reveal` (opacity 0) and were never shown. js/products.js now marks them visible.
- Foodier homepage: photo food cards (fruits / vegetables / meat) with real product photos, a coral-to-gold scrolling flavour ribbon, emoji section titles, warmer tinted bands, shorter copy throughout (hero, intro, why, steps, delivery, CTA).
- WhatsApp double-text protection: when the order is sent to WhatsApp, the basket is cleared the moment the customer leaves the page/tab (visibilitychange/pagehide). A snapshot is kept so the empty cart shows "Order sent ✓ — Restore my last order" if WhatsApp never opened. (js/order-form.js, js/cart.js)
- Filter panel redesigned as one card: search + sort on top, chips below (swipeable on phones), result count + coral "Clear filters" at the bottom. Fixed a CSS class clash that squashed the Clear button (`.toolbar__reset`).
- About page: photo slot. Save a landscape image as `assets/images/about-photo.jpg` (about 1600x900); until then `assets/images/about-placeholder.svg` is shown.
- Call button (tel:+256788733850, same number) on the contact page, homepage CTA and footers.
- Tests (jsdom, simulated browser): featured strip visible, 3 photo cards, ribbon, cart clears on leaving only when a send was flagged, restore works, about slot, toolbar parts. All pass. No real browser was available here, so the LOOK (spacing, ribbon animation, mobile layout) is untested; please check on your phone.

## Round 4 — details page, forms, speed, security, hosting

- Home food strip: cards and the flavour ribbon were two siblings inside a multi-column grid (so the ribbon sat beside the cards). New `.foodstrip` block stacks them full width; on phones the cards are taller with larger text.
- NEW product.html?id=... (js/product-detail.js): big photo, category, unit, price (range + "confirmed on WhatsApp" note for variable items), description, quantity + Add to order, "Ask about this on WhatsApp", and "You may also like" (4 items: same category first). Product cards (image + name) now link to it. Unknown/odd ids show a safe "not found" message (id is validated, never inserted raw).
- Live counters on every form field with a limit, e.g. "7 / 25 characters · min 2" (contact form + order form); turns amber below the minimum, green when valid, coral near the limit.
- Speed: grapefruit.jpg was 4.8 MB (5644x7526) -> 142 KB; 19 large photos resized (longest side 1000px), about 6.7 MB saved (assets 17 MB -> 11 MB). Removed an unused Bootstrap-icons stylesheet from jsDelivr (render-blocking). Card images have width/height; off-screen cards skip rendering (content-visibility); hero image loads with high priority.
- Security (netlify.toml): CSP (self + Google Fonts + form providers only), X-Frame-Options DENY / frame-ancestors none, nosniff, HSTS, COOP/CORP, Referrer-Policy, Permissions-Policy. Contact form: honeypot field, too-fast-submit check and 30 s cool-down. External links use rel="noopener noreferrer".
  Honest limits: CSP still allows inline scripts (the pages use small inline handlers), so it blocks other-origin injection but not inline injection. No static site can stop DDoS/brute force by itself; Netlify's network handles basic DDoS. Real protection for the contact form = Web3Forms/Formspree spam filtering + their key.
- Caching fix: /assets/\* was "immutable, 1 year" with unhashed file names, so a replaced photo (e.g. about-photo.jpg) would stay stale for a year. Now 7 days; CSS/JS 1 hour; HTML always revalidated.
- 404.html added (friendly, noindex).

## Hosting checklist (Netlify)

1. Push, connect repo to Netlify (publish dir ".", no build command).
2. Add the Web3Forms key in js/config.js, send a test message.
3. Confirm the domain vivofreshuganda.com is yours; if not, replace it in canonical/og/sitemap/robots/JSON-LD.
4. After deploy test: shop -> product page -> add -> cart -> WhatsApp, on a phone (and 320/360/390/430px).
5. Run PageSpeed Insights on the live URL and check the browser console for CSP warnings.


## Round 5 — final polish
- Meat is now independent: `js/data/meat.js` (5 products, moved unchanged from vegetables.js), own page `meat.html`, own nav/footer links, own counters. vegetables.html now = 83 vegetables & spices. Old links `vegetables.html?category=Meat` redirect to meat.html. Product pages/breadcrumbs know about the meat department. Sitemap updated.
- vegetables.html title fixed: "Vegetables & Spices — 83 Products" (it said 90; the page is 88 only while meat was still inside it, so after splitting meat out the correct number is 83). Home/shop/products counts are derived from the data (131 = 43 + 83 + 5).
- Bootstrap Icons implemented locally (3 KB subset, no CDN, CSP untouched). Emojis in food cards, ribbon, titles and call buttons replaced by icons. Bootstrap has no meat/pepper icon, so "fire" (grill) is used for meat and "lightning" for hot chillies.
- Home hero: girl-with-produce photo slot with colourful gold/coral/green shapes + placeholder SVG that doubles as a design guide. (The old dragon-fruit arch collage was replaced.)
- Ribbon loop: it now duplicates itself in JS so the scroll is seamless.
- Link-blocking in ALL forms (`VIVO.safety`): URLs, www., bare domains/TLDs, obfuscated ("evil dot com", "evil(.)com", spaced h t t p), IPs, javascript:/data: schemes, `<` `>` markup, on*= handlers, full-width/zero-width tricks; phone = digits only. Live red warning under the field, blocks submit, and text is cleaned again before it goes into the WhatsApp/email message.
- Hosting: netlify.toml (kept), hosting/cloudflare-pages/_headers, hosting/namecheap-cpanel/.htaccess, hosting/HOSTING.md with a recommendation.
- Tests (jsdom): 22 attack-style strings blocked, 14 normal customer texts allowed, forms warn/block (contact form sends nothing when the message holds a link), meat.html 5 cards, vegetables 83 with no Meat chip, shop 131, beef detail page + 4 recommendations, icons present, hero slot present, counts 83 veg - 5 meats. All pass. Still no real-browser/phone test: please check the hero slot, ribbon and layouts on your phone.
