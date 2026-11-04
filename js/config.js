/* ============================================================
   VIVO FRESH @ UGANDA — CENTRAL CONFIGURATION
   Change business details here. Nothing else needs editing.
   ============================================================ */
window.VIVO_CONFIG = {
  brand: {
    name: "VIVO FRESH @ UGANDA",
    shortName: "VIVO FRESH",
    tagline: "Nature's freshest picks, delivered to your door.",
    market: "Nakasero Market",
    city: "Kampala",
    country: "Uganda",
    location: "Nakasero Market, Kampala, Uganda",
    deliveryCoverage: "All over Uganda",
    email: "amongivivian123@gmail.com",
    siteUrl: "https://vivofreshuganda.com"
  },

  whatsapp: {
    /* Number that RECEIVES website orders. Digits only, international format. */
    orderNumber: "256755554669",
    /* Display + contact numbers */
    primary:  { intl: "256788733850", display: "+256 788 733 850", label: "WhatsApp" },
    business: { intl: "256755554669", display: "+256 755 554 669", label: "WhatsApp Business" }
  },

  email: {
    /* "formspree" | "web3forms" | "none"
       Leave as "none" until configured — the form will honestly say so. */
    provider: "none",
    formspreeEndpoint: "",      // e.g. "https://formspree.io/f/xxxxxxxx"
    web3formsAccessKey: "",     // e.g. "a1b2c3d4-...."
    recipient: "amongivivian123@gmail.com"
  },

  social: {
    facebook: "",   // e.g. "https://facebook.com/vivofreshuganda"
    instagram: "",
    tiktok: "",
    x: "",
    youtube: ""
  },

  cart: { storageKey: "vivofresh.cart.v1" },
  currency: "UGX"
};