# VIVO FRESH @ UGANDA — Website

A static, deployment-ready website for **VIVO FRESH @ UGANDA**, a fresh fruit business
based at Nakasero Market, Kampala, delivering across Uganda.

Built with HTML5, CSS3 and vanilla JavaScript. No backend, no database, no build step.

---

## 1. Run the website locally

You can open `index.html` directly in a browser, but **some features need a local server**
(product images, and browser security around `file://`).

**Option A — Python (already installed on most machines):**

```bash
cd vivo-fresh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

**Option B — Node.js:**

```bash
npx serve .
```

**Option C — VS Code:** install the *Live Server* extension, right-click `index.html` →
*Open with Live Server*.

---

## 2. Project structure

```
vivo-fresh/
├── index.html            Home
├── about.html            About Us (vision / mission / goals)
├── products.html         Full catalogue (search + filters)
├── cart.html             Order review + customer details
├── delivery.html         Delivery information
├── contact.html          Contact + email form
├── robots.txt
├── sitemap.xml
├── netlify.toml
├── README.md
├── assets/
│   └── images/
│       ├── fruits/       <- put fruit photos here
│       ├── vegetables/
│       ├── banners/
│       └── branding/
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
└── js/
    ├── config.js         <- ALL business details
    ├── main.js           Core utilities + site chrome
    ├── cart.js           Cart state + cart page rendering
    ├── products.js       Catalogue rendering, search, filters
    ├── whatsapp.js       WhatsApp message builder
    ├── order-form.js     Checkout validation + send
    ├── contact.js        Contact form (Formspree / Web3Forms)
    └── data/
        ├── fruits.js     <- 43 products
        └── vegetables.js <- future vegetable catalogue
```

---

## 3. Update products / prices

**All product data lives in `js/data/fruits.js`.** Nothing is hardcoded in the HTML.

Each product looks like this:

```js
{
  id: "mangoes",                       // unique, lowercase, hyphenated
  name: "Mangoes (kg)",                // exactly as supplied by the business
  category: "Tropical Fruits",
  description: "Ripe Ugandan mangoes with soft, fragrant flesh.",
  image: "assets/images/fruits/mangoes.jpg",
  unit: "kg",                          // piece | kg | packet | cluster | each | unit
  price: 5000,                         // fixed price in UGX (or null if range-priced)
  priceMin: null,
  priceMax: null,
  variablePrice: false,                // true -> price is a range
  available: true
}
```

### Change a price

Find the product and edit `price`. Restart nothing — just refresh the browser.

### Add a product

Copy an existing object, change `id` (must be unique), `name`, `category`, `image`, `unit`,
`price`. It appears automatically on the catalogue, in the category counts, and in search.

### Range-priced products

For products with a price range, use this shape and **never** set `price`:

```js
{
  id: "peaches",
  name: "Peaches",
  price: null,
  priceMin: 8000,
  priceMax: 52000,
  variablePrice: true,
  // ...
}
```

Range-priced items:
- display as `UGX 8,000 – 52,000`
- are **excluded** from the subtotal
- show "Final price confirmed on WhatsApp" in the cart
- appear in the WhatsApp message as "Line total: To be confirmed"

This is deliberate. Do not add a numeric subtotal for these items.

---

## 4. Update WhatsApp contacts

Open `js/config.js`:

```js
whatsapp: {
  orderNumber: "256788733850",   // <- the single number that RECEIVES website orders
  primary:  { intl: "256788733850", display: "+256 788 733 850", label: "WhatsApp" },
}
```

- `orderNumber` — digits only, international format, no `+`, no spaces.
- `primary` / `business` — the display strings and the numbers used in the footer and contact page.

Note that `contact.html` and the footer contain hardcoded `wa.me` links; update those too if the
numbers change (search for `wa.me/` in the HTML files).

---

## 5. Configure the email contact form

The form on `contact.html` will **not pretend to send** until you configure it. Until then it
displays a message directing visitors to email or WhatsApp.

### Option A — Formspree (recommended)

1. Create a free account at <https://formspree.io>.
2. Create a new form; set the notification email to `amongivivian123@gmail.com`.
3. Copy the endpoint (looks like `https://formspree.io/f/abcdwxyz`).
4. In `js/config.js`:

```js
email: {
  provider: "formspree",
  formspreeEndpoint: "https://formspree.io/f/abcdwxyz",
  web3formsAccessKey: "",
  recipient: "amongivivian123@gmail.com"
}
```

### Option B — Web3Forms

1. Get an access key at <https://web3forms.com> (enter the recipient email).
2. In `js/config.js`:

```js
email: {
  provider: "web3forms",
  formspreeEndpoint: "",
  web3formsAccessKey: "your-access-key-here",
  recipient: "amongivivian123@gmail.com"
}
```

> **Security note:** Formspree form IDs and Web3Forms access keys are designed to be used in
> frontend code — they are public identifiers, not secrets. **Never** put SMTP passwords,
> API secret keys or private tokens in this project. If you need server-side email with a
> secret, use a serverless function on Netlify instead.

---

## 6. Replace product photographs

1. Save your photo as a **JPG or WebP**, roughly **800 × 800 px**, optimised (< 150 KB each).
2. Name it exactly to match the `image` path in `js/data/fruits.js` — for example:
   `assets/images/fruits/dragon-fruit.jpg`
3. Drop it into `assets/images/fruits/`.

**Naming convention:** lowercase, hyphens, no spaces, matching the product `id`.

If an image is missing, the site automatically shows a designed colour tile with the product
name instead of a broken image. The site never breaks because of a missing photo.

**Full filename list** (all 43):

```
custard-apple.jpg      blueberry.jpg          tree-tomatoes.jpg
dragon-fruit.jpg       red-pawpaw.jpg         jackfruit.jpg
guavas.jpg             bitter-berries.jpg     chayote.jpg
imported-lemon.jpg     bananas.jpg            avocado.jpg
nectarines.jpg         apples.jpg             kiwi.jpg
sweet-melons.jpg       grapefruit.jpg         grapes.jpg
strawberries.jpg       imported-oranges.jpg   thorn-melons.jpg
cocoa.jpg              local-lemon.jpg        local-oranges.jpg
pineapple.jpg          small-bananas.jpg      passion-fruit.jpg
local-tangerines.jpg   mangoes.jpg            soursop.jpg
limes.jpg              watermelon-zebra.jpg   peaches.jpg
imported-pears.jpg     plums.jpg              tamarind.jpg
coconut.jpg            litchi.jpg             gooseberry.jpg
dates.jpg              mandarins.jpg          pawpaw.jpg
black-watermelon.jpg
```

Hero / banner images referenced in `index.html`:

```
assets/images/fruits/dragon-fruit.jpg
assets/images/fruits/strawberries.jpg
assets/images/fruits/mangoes.jpg
assets/images/banners/og-image.jpg   (1200 × 630, for social sharing)
```

---

## 7. Adding the vegetable catalogue later

1. Add vegetable objects to `js/data/vegetables.js` using the exact same schema as fruits.
2. If you need new categories, add them to `VIVO.CATEGORIES` in `js/main.js` and to the
   `TONES` map in the same file.
3. Nothing else changes. Products appear on `products.html`, in search, in category counts,
   in the cart and in WhatsApp orders automatically.

Suggested vegetable categories: `Leafy Greens`, `Roots & Tubers`, `Peppers & Chillies`,
`Tomatoes & Onions`, `Beans & Peas`.

---

## 8. Deploy to Netlify

1. Push the project folder to a GitHub repository.
2. Go to <https://app.netlify.com> → **Add new site** → **Import an existing project**.
3. Select your repository.
4. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.`
5. Click **Deploy**.

`netlify.toml` already sets the publish directory and basic security headers.

**Drag-and-drop alternative:** go to <https://app.netlify.com/drop> and drag the whole
`vivo-fresh` folder onto the page.

### Also works on
- **GitHub Pages** — push to a repo, Settings → Pages → deploy from branch root.
- **Cloudflare Pages** — connect the repo, framework preset "None", output directory `/`.

All asset paths are relative, so the site works in a subfolder too.

---

## 9. Connect a custom domain

**On Netlify:**

1. Site settings → **Domain management** → **Add custom domain**.
2. Enter your domain (e.g. `vivofreshuganda.com`).
3. Netlify gives you either:
   - **Nameservers** — change them at your registrar (recommended), or
   - **A / CNAME records** — add them at your DNS provider.
4. Wait for DNS propagation (typically minutes to a few hours).
5. Netlify provisions a free HTTPS certificate automatically.

**Then update these placeholder URLs** in the project:

- `canonical` and `og:url` tags in all HTML files
- `robots.txt` → `Sitemap:` line
- `sitemap.xml` → all `<loc>` entries
- `brand.siteUrl` in `js/config.js`

---

## 10. How the WhatsApp order works (important)

1. Customer adds fruits on `products.html`.
2. On `cart.html` they fill in name, contact number, delivery location and optional notes.
3. Pressing **Send order via WhatsApp** runs validation, builds a structured text message
   and opens `https://wa.me/<number>?text=<encoded message>`.
4. **The order is NOT submitted at this point.** The customer must press **Send** inside
   WhatsApp. The site says this explicitly, twice.
5. The business then replies to confirm availability, range prices, delivery fees and timing.

There is no payment processing anywhere in this project, by design.

A **Copy order message** button is provided in case the WhatsApp link is blocked by a
popup blocker or the customer prefers to paste the message manually.

---

## 11. Still needed from the business owner

These items are deliberately **not invented** on the site. Please confirm before launch:

| # | Item | Why it matters |
|---|------|----------------|
| 1 | **Units for range-priced products** — Local Lemon, Small Bananas, Peaches, Plums, Pawpaw are currently shown as "per unit" | The unit affects how customers read the price range |
| 2 | **What the price range for Peaches (8,000–52,000) and Plums (5,000–30,000) represents** — weight? box size? grade? | Customers need to understand what they are comparing |
| 3 | **Delivery fee structure** — flat rate, by zone, by order value? | Needed before any fee can be shown |
| 4 | **Estimated delivery timeframes** per area | Currently confirmed per order only |
| 5 | **Approved Vision / Mission / Goals wording** | Current text is clearly-marked draft placeholder |
| 6 | **Social media URLs** (Facebook, Instagram, TikTok, X, YouTube) | Currently placeholders in the footer |
| 7 | ~~Second WhatsApp number~~ | Resolved: owner confirmed one number only (+256 788 733 850) |
| 8 | **Preferred contact email confirmation** — is `amongivivian123@gmail.com` the long-term business address? | Used for the contact form and footer |
| 9 | **Product photography** — supply real photos for all 43 fruits | Site currently uses designed fallback tiles |
| 10 | **Stock/seasonality flags** — should some fruits show as "out of season"? | The `available` field exists but all are `true` |
| 11 | **Any legally required business disclosures** — trading name, registration, TIN | Not invented anywhere |
| 12 | **Preferred domain name** | All canonical URLs currently use `vivofreshuganda.com` |

---

## 12. Quality notes

- Mobile-first responsive layout; tested down to 320 px wide.
- Semantic HTML, ARIA labelling on controls, visible focus rings, skip link.
- `prefers-reduced-motion` respected across all animations.
- Images below the fold use `loading="lazy"`.
- Cart persists across page loads via `localStorage` (key: `vivofresh.cart.v1`).
- Graceful degradation: with JavaScript disabled, navigation, contact details and all
  content remain readable; only the catalogue and cart require JS.
- No tracking, no cookies, no third-party scripts beyond Google Fonts.

---

© VIVO FRESH @ UGANDA. Built as a static commercial website.
---

## Enabling the contact form (Web3Forms — when you have the access key)

1. Create the key at web3forms.com using the business email (`amongivivian123@gmail.com`).
2. In `js/config.js`, set `email.provider: "web3forms"` and paste the key into `email.web3formsAccessKey`.
3. Deploy, send a test message from `contact.html`, and confirm it arrives. Until then the form tells visitors it is not connected and points them to WhatsApp/email (it never pretends to send).
