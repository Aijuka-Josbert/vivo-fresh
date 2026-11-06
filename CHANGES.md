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
