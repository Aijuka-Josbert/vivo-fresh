# Where to host VIVO FRESH (and how to set up each option)

The site is 100% static (HTML/CSS/JS), so any static host works. Pick ONE.

## My recommendation
**Buy the domain at Namecheap, host the site on Netlify (or Cloudflare Pages).**

| Option | Best for | Why / why not |
|---|---|---|
| **Netlify** (recommended, already configured) | Easiest path | Auto-deploys every time you push to GitHub, free HTTPS, global CDN, instant rollback. `netlify.toml` (security headers, caching) is already in the project, so nothing to change. |
| **Cloudflare Pages** | Same as above, a bit more "set and forget" | Free, very large global network, built-in DDoS protection. Copy `hosting/cloudflare-pages/_headers` to the project root. |
| **Namecheap shared hosting (cPanel)** | Only if you want everything in one bill / business email in cPanel | Works, but it is one server (no worldwide CDN), you upload files by hand, and security headers depend on the `.htaccess` below. Fine for a small local audience; not the fastest or safest default. |

**Namecheap is a great place to buy the domain** regardless of where the site lives: you only change the DNS records
(Netlify/Cloudflare show you the exact records to copy). Check each host's current free-plan limits before launch.

## Option A — Netlify (nothing to change)
1. Push the project to GitHub. In Netlify: *Add new site, Import from Git*, choose the repo, build command empty, publish directory `.`.
2. Domain settings, add `vivofreshuganda.com` (or your domain). At Namecheap, add the DNS records Netlify shows.
3. Wait for the free HTTPS certificate, then test the live site.

## Option B — Cloudflare Pages
1. Copy `hosting/cloudflare-pages/_headers` to the project root (next to `index.html`). You can delete `netlify.toml` or leave it.
2. Cloudflare dashboard, *Workers & Pages, Create, Pages, Connect to Git*; no build command, output directory `/`.
3. Add the custom domain and follow Cloudflare's DNS instructions.

## Option C — Namecheap shared hosting (cPanel)
1. In cPanel turn on **AutoSSL** (free HTTPS) for the domain.
2. Upload everything in this project to `public_html/` (File Manager or FTP). Do not upload the `.git` folder.
3. Copy `hosting/namecheap-cpanel/.htaccess` to `public_html/.htaccess`. It forces HTTPS, adds the security headers, enables compression/caching and hides `.md/.toml` files.
4. Test the 404 page and open the site over https.

## After going live (any host)
- Confirm the canonical domain in the HTML (`vivofreshuganda.com`) matches the domain you really use.
- Put your Web3Forms key in `js/config.js` (see README) and send a test message.
- Test the order flow on a phone; run PageSpeed Insights; check the browser console for CSP messages.
