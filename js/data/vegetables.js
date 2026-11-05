/* ============================================================
   VEGETABLE / SPICE / MEAT CATALOGUE
   Prices in UGX. Same schema as fruits.js.
   variablePrice: true  ->  price is null, priceMin/priceMax used.

   Categories used by vegetables, spices and meat:
     - Leafy Greens
     - Roots & Tubers
     - Peppers & Chillies
     - Tomatoes & Onions
     - Beans & Peas
     - Gourds & Squashes
     - Mushrooms
     - Herbs & Aromatics
     - Vegetables          (fallback for anything uncategorised)
     - Spices
     - Meat

   Image path convention:  assets/images/vegetables/<id>.<ext>
   Until photos are supplied, the built-in colour-tile fallback is used.
   ============================================================ */
window.VIVO_VEGETABLES = [

  /* ============================================================
     VEGETABLES — 79 items
     ============================================================ */

  /* --- Leafy Greens --- */
  {
    id: "sukuma-wiki", name: "Sukuma Wiki (Bundles)", category: "Leafy Greens",
    description: "Fresh kale-like greens sold in bundles — a Ugandan kitchen staple.",
    image: "./assets/images/vegetables/sukuma-wiki.jpeg",
    unit: "bundle", price: 2000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "spinach", name: "Spinach (Bundles)", category: "Leafy Greens",
    description: "Tender spinach leaves, bundled fresh.",
    image: "./assets/images/vegetables/spinach.avif",
    unit: "bundle", price: 2000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "nakati", name: "Nakati (Bundles)", category: "Leafy Greens",
    description: "Traditional African eggplant leaves, sold by the bundle.",
    image: "./assets/images/vegetables/nakati.jpeg",
    unit: "bundle", price: 2000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "bugga", name: "Bugga (Bundles)", category: "Leafy Greens",
    description: "Fresh bugga greens, bundled and ready to cook.",
    image: "./assets/images/vegetables/bugga.jpeg",
    unit: "bundle", price: 2000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "green-amaranth", name: "Green Amaranth (Bundle)", category: "Leafy Greens",
    description: "Leafy amaranth greens, sold in a bundle.",
    image: "./assets/images/vegetables/green-amaranth.jpeg",
    unit: "bundle", price: 3000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "lettuce", name: "Lettuce", category: "Leafy Greens",
    description: "Crisp lettuce; price depends on size.",
    image: "./assets/images/vegetables/lettuce.jpeg",
    unit: "piece", price: null, priceMin: 3500, priceMax: 4000,
    variablePrice: true, available: true
  },
  {
    id: "rocket-leaves", name: "Rocket Leaves (Bag)", category: "Leafy Greens",
    description: "Peppery rocket leaves, sold by the bag.",
    image: "./assets/images/vegetables/rocket-leaves.avif",
    unit: "bag", price: 4500, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "baby-spinach", name: "Baby Spinach", category: "Leafy Greens",
    description: "Tender baby spinach leaves.",
    image: "./assets/images/vegetables/baby-spinach.avif",
    unit: "unit", price: 2500, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "kale", name: "Kale", category: "Leafy Greens",
    description: "Fresh kale, sold by the bunch.",
    image: "./assets/images/vegetables/kale.avif",
    unit: "bunch", price: 3500, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "pok-choy", name: "Pok Choy (kg)", category: "Leafy Greens",
    description: "Crunchy pok choy with tender green stems.",
    image: "./assets/images/vegetables/pok-choy.jpeg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "chinese-cabbage", name: "Chinese Cabbage (piece)", category: "Leafy Greens",
    description: "Mild, crunchy Chinese cabbage head.",
    image: "./assets/images/vegetables/chinese-cabbage.jpeg",
    unit: "piece", price: 5000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "cabbage", name: "Cabbage", category: "Leafy Greens",
    description: "Fresh green cabbage; price depends on size.",
    image: "./assets/images/vegetables/cabbage.avif",
    unit: "piece", price: null, priceMin: 2500, priceMax: 4000,
    variablePrice: true, available: true
  },
  {
    id: "red-cabbage", name: "Red Cabbage", category: "Leafy Greens",
    description: "Deep-purple red cabbage; price depends on size.",
    image: "./assets/images/vegetables/red-cabbage.jpg",
    unit: "piece", price: null, priceMin: 3000, priceMax: 4000,
    variablePrice: true, available: true
  },
  {
    id: "umeza-stem-leaves", name: "Umeza Stem Leaves (kg)", category: "Leafy Greens",
    description: "Fresh umeza stem leaves, sold by the kilogram.",
    image: "./assets/images/vegetables/umeza-stem-leaves.jpg",
    unit: "kg", price: 3000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "sigwa", name: "Sigwa (kg)", category: "Leafy Greens",
    description: "Fresh sigwa leaves, sold by the kilogram.",
    image: "./assets/images/vegetables/sigwa.jpeg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "banana-leaves", name: "Banana Leaves", category: "Leafy Greens",
    description: "Fresh banana leaves for steaming and serving.",
    image: "./assets/images/vegetables/banana-leaves.jpeg",
    unit: "unit", price: null, priceMin: 500, priceMax: 1000,
    variablePrice: true, available: true
  },
  {
    id: "mpombo-leaf", name: "Mpombo Leaf", category: "Leafy Greens",
    description: "Fresh mpombo leaves; final price confirmed on WhatsApp.",
    image: "./assets/images/vegetables/mpombo-leaf.jpeg",
    unit: "unit", price: null, priceMin: 1500, priceMax: 2000,
    variablePrice: true, available: true
  },

  /* --- Roots & Tubers --- */
  {
    id: "taro-roots", name: "Taro Roots (kg)", category: "Roots & Tubers",
    description: "Starchy taro roots, sold by the kilogram.",
    image: "./assets/images/vegetables/taro-roots.jpg",
    unit: "kg", price: 6000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "fresh-yam", name: "Fresh Yam (kg)", category: "Roots & Tubers",
    description: "Fresh yam, sold by the kilogram.",
    image: "./assets/images/vegetables/fresh-yam.jpeg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "cassava", name: "Cassava (kg)", category: "Roots & Tubers",
    description: "Fresh cassava root, sold by the kilogram.",
    image: "./assets/images/vegetables/Cassava.avif",
    unit: "kg", price: 3500, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "irish-potatoes", name: "Irish Potatoes (kg)", category: "Roots & Tubers",
    description: "Fresh Irish potatoes, sold by the kilogram.",
    image: "./assets/images/vegetables/irish-potatoes.avif",
    unit: "kg", price: 3000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "carrots", name: "Carrots (kg)", category: "Roots & Tubers",
    description: "Fresh carrots, sold by the kilogram.",
    image: "./assets/images/vegetables/carrots.avif",
    unit: "kg", price: 3000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "beetroot", name: "Beetroot (kg)", category: "Roots & Tubers",
    description: "Deep-red beetroot, sold by the kilogram.",
    image: "./assets/images/vegetables/beetroot.avif",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "turnip", name: "Turnip (kg)", category: "Roots & Tubers",
    description: "Fresh turnip, sold by the kilogram.",
    image: "./assets/images/vegetables/turnip.avif",
    unit: "kg", price: 4500, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "radish", name: "Radish (kg)", category: "Roots & Tubers",
    description: "Crisp radish, sold by the kilogram.",
    image: "./assets/images/vegetables/radish.avif",
    unit: "kg", price: 4500, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "matoke", name: "Matoke", category: "Roots & Tubers",
    description: "Ugandan cooking bananas; price depends on bunch size.",
    image: "./assets/images/vegetables/matoke.jpg",
    unit: "unit", price: null, priceMin: 4000, priceMax: 20000,
    variablePrice: true, available: true
  },
  {
    id: "plantain", name: "Plantain", category: "Roots & Tubers",
    description: "Fresh plantain; final price confirmed on WhatsApp.",
    image: "./assets/images/vegetables/plantain.jpg",
    unit: "unit", price: null, priceMin: 5000, priceMax: 8000,
    variablePrice: true, available: true
  },
  {
    id: "turia", name: "Turia (kg)", category: "Roots & Tubers",
    description: "Fresh turia, sold by the kilogram.",
    image: "./assets/images/vegetables/turia.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },

  /* --- Peppers & Chillies --- */
  {
    id: "green-pepper", name: "Green Pepper (kg)", category: "Peppers & Chillies",
    description: "Fresh green bell peppers, sold by the kilogram.",
    image: "./assets/images/vegetables/green-pepper.avif",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "colored-pepper", name: "Colored Pepper (kg)", category: "Peppers & Chillies",
    description: "Mixed red, yellow and orange bell peppers.",
    image: "./assets/images/vegetables/colored-pepper.avif",
    unit: "kg", price: 11000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "banana-pepper", name: "Banana Pepper (kg)", category: "Peppers & Chillies",
    description: "Mild banana peppers, sold by the kilogram.",
    image: "./assets/images/vegetables/banana-pepper.avif",
    unit: "kg", price: 5000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "hot-pepper", name: "Hot Pepper (kg)", category: "Peppers & Chillies",
    description: "Small hot peppers with a serious kick.",
    image: "./assets/images/vegetables/hot-pepper.avif",
    unit: "kg", price: 5000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "redbullet-chili", name: "Redbullet Chili (kg)", category: "Peppers & Chillies",
    description: "Red bullet chillies, sold by the kilogram.",
    image: "./assets/images/vegetables/redbullet-chili.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "greenbullet-chili", name: "Greenbullet Chili (kg)", category: "Peppers & Chillies",
    description: "Green bullet chillies, sold by the kilogram.",
    image: "assets/images/vegetables/greenbullet-chili.jpg",
    unit: "kg", price: 5000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },

  /* --- Tomatoes & Onions --- */
  {
    id: "tomatoes", name: "Tomatoes", category: "Tomatoes & Onions",
    description: "Fresh tomatoes; price depends on quantity.",
    image: "./assets/images/vegetables/tomatoes.avif",
    unit: "kg", price: null, priceMin: 3000, priceMax: 4000,
    variablePrice: true, available: true
  },
  {
    id: "cherry-tomatoes", name: "Cherry Tomatoes (kg)", category: "Tomatoes & Onions",
    description: "Sweet bite-sized cherry tomatoes.",
    image: "./assets/images/vegetables/cherry-tomatoes.jpg",
    unit: "kg", price: 14000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "white-onions", name: "White Onions (kg)", category: "Tomatoes & Onions",
    description: "White onions, sold by the kilogram.",
    image: "./assets/images/vegetables/white-onions.jpg",
    unit: "kg", price: 8000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "small-onion", name: "Small Onion (kg)", category: "Tomatoes & Onions",
    description: "Small onions, sold by the kilogram.",
    image: "./assets/images/vegetables/small-onion.jpg",
    unit: "kg", price: 6000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "red-onions", name: "Red Onions (kg)", category: "Tomatoes & Onions",
    description: "Red onions, sold by the kilogram.",
    image: "./assets/images/vegetables/red-onions.jpg",
    unit: "kg", price: 5000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "spring-onions", name: "Spring Onions", category: "Tomatoes & Onions",
    description: "Fresh spring onions; price depends on bundle size.",
    image: "./assets/images/vegetables/spring-onions.jpg",
    unit: "unit", price: null, priceMin: 1000, priceMax: 7000,
    variablePrice: true, available: true
  },
  {
    id: "leeks", name: "Leeks", category: "Tomatoes & Onions",
    description: "Fresh leeks; price depends on size.",
    image: "./assets/images/vegetables/leeks.jpg",
    unit: "unit", price: null, priceMin: 3000, priceMax: 8000,
    variablePrice: true, available: true
  },

  /* --- Beans & Peas --- */
  {
    id: "long-bean", name: "Long Bean (kg)", category: "Beans & Peas",
    description: "Long green beans, sold by the kilogram.",
    image: "./assets/images/vegetables/long-bean.jpg",
    unit: "kg", price: 3000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "flat-green-beans", name: "Flat Green Beans (kg)", category: "Beans & Peas",
    description: "Flat green beans, sold by the kilogram.",
    image: "./assets/images/vegetables/flat-green-beans.jpg",
    unit: "kg", price: 9000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "french-beans", name: "French Beans (kg)", category: "Beans & Peas",
    description: "Tender French beans, sold by the kilogram.",
    image: "./assets/images/vegetables/french-beans.jpg",
    unit: "kg", price: 3000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "fresh-beans", name: "Fresh Beans", category: "Beans & Peas",
    description: "Fresh beans, sold by the kilogram.",
    image: "./assets/images/vegetables/fresh-beans.jpg",
    unit: "kg", price: 9000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "fresh-peas", name: "Fresh Peas (kg)", category: "Beans & Peas",
    description: "Fresh garden peas, sold by the kilogram.",
    image: "./assets/images/vegetables/fresh-peas.jpg",
    unit: "kg", price: 14000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "cluster-beans", name: "Cluster Beans (kg)", category: "Beans & Peas",
    description: "Cluster beans, sold by the kilogram.",
    image: "./assets/images/vegetables/cluster-beans.jpg",
    unit: "kg", price: 5000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "ground-nuts-pounded", name: "Ground Nuts Pounded (kg)", category: "Beans & Peas",
    description: "Pounded groundnuts, sold by the kilogram.",
    image: "./assets/images/vegetables/ground-nuts-pounded.jpeg",
    unit: "kg", price: 8000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "ground-nuts-whole", name: "Ground Nuts Not Pounded (kg)", category: "Beans & Peas",
    description: "Whole groundnuts, sold by the kilogram.",
    image: "./assets/images/vegetables/ground-nuts-whole.jpeg",
    unit: "kg", price: 8000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },

  /* --- Gourds & Squashes --- */
  {
    id: "bitter-gourd", name: "Bitter Gourd", category: "Gourds & Squashes",
    description: "Bitter gourd, sold per piece.",
    image: "./assets/images/vegetables/bitter-gourd.jpg",
    unit: "piece", price: 5000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "bottle-gourd", name: "Bottle Gourd (kg)", category: "Gourds & Squashes",
    description: "Bottle gourd, sold by the kilogram.",
    image: "./assets/images/vegetables/bottle-gourd.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "snake-gourd", name: "Snake Gourd (kg)", category: "Gourds & Squashes",
    description: "Long snake gourd, sold by the kilogram.",
    image: "./assets/images/vegetables/snake-gourd.jpg",
    unit: "kg", price: 6000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "ivy-gourd", name: "Ivy Gourd (kg)", category: "Gourds & Squashes",
    description: "Small ivy gourd, sold by the kilogram.",
    image: "./assets/images/vegetables/ivy-gourd.jpg",
    unit: "kg", price: 7000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "pumpkin", name: "Pumpkin", category: "Gourds & Squashes",
    description: "Fresh pumpkin; price depends on size.",
    image: "./assets/images/vegetables/pumpkin.jpg",
    unit: "piece", price: null, priceMin: 3000, priceMax: 5000,
    variablePrice: true, available: true
  },
  {
    id: "pumpkin-seeds", name: "Pumpkin Seeds (kg)", category: "Gourds & Squashes",
    description: "Dried pumpkin seeds, sold by the kilogram.",
    image: "./assets/images/vegetables/pumpkin-seeds.jpg",
    unit: "kg", price: 3500, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "zucchini", name: "Zucchini (kg)", category: "Gourds & Squashes",
    description: "Fresh zucchini, sold by the kilogram.",
    image: "./assets/images/vegetables/zucchini.avif",
    unit: "kg", price: 4500, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "cucumbers", name: "Cucumbers (kg)", category: "Gourds & Squashes",
    description: "Fresh cucumbers, sold by the kilogram.",
    image: "./assets/images/vegetables/cucumbers.jpg",
    unit: "kg", price: 3000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "english-cucumber", name: "English Cucumber (piece)", category: "Gourds & Squashes",
    description: "Long English cucumber, sold per piece.",
    image: "./assets/images/vegetables/english-cucumber.jpg",
    unit: "piece", price: 2000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "butter-nuts", name: "Butter Nuts", category: "Gourds & Squashes",
    description: "Butter nuts; price depends on size.",
    image: "./assets/images/vegetables/butter-nuts.jpg",
    unit: "unit", price: null, priceMin: 4000, priceMax: 7000,
    variablePrice: true, available: true
  },
  {
    id: "tongwa", name: "Tongwa", category: "Gourds & Squashes",
    description: "Fresh tongwa; price depends on size.",
    image: "./assets/images/vegetables/tongwa.jpeg",
    unit: "unit", price: null, priceMin: 8000, priceMax: 14000,
    variablePrice: true, available: true
  },

  /* --- Other vegetables --- */
  {
    id: "sugarcane-stalk", name: "Sugarcane Stalk", category: "Vegetables",
    description: "Fresh sugarcane stalk, sold per piece.",
    image: "./assets/images/vegetables/sugarcane-stalk.jpg",
    unit: "piece", price: 7000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "aloe-vera", name: "Aloe Vera", category: "Vegetables",
    description: "Fresh aloe vera leaf, sold per piece.",
    image: "./assets/images/vegetables/aloe-vera.jpg",
    unit: "piece", price: 2000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "asparagus", name: "Asparagus (Bundles)", category: "Vegetables",
    description: "Fresh asparagus, sold by the bundle.",
    image: "./assets/images/vegetables/asparagus.jpg",
    unit: "bundle", price: 19000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "button-mushroom", name: "Button Mushroom", category: "Mushrooms",
    description: "White button mushrooms, sold per unit.",
    image: "./assets/images/vegetables/button-mushroom.jpg",
    unit: "unit", price: 17000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "mushroom-loose", name: "Mushroom Loose (kg)", category: "Mushrooms",
    description: "Loose mushrooms, sold by the kilogram.",
    image: "./assets/images/vegetables/mushroom-loose.jpg",
    unit: "kg", price: 11000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "garden-egg", name: "Garden Egg (Etula)", category: "Vegetables",
    description: "Garden egg (etula), sold per piece.",
    image: "./assets/images/vegetables/garden-egg.jpg",
    unit: "piece", price: 3000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "big-egg-plant", name: "Big Egg Plant (kg)", category: "Vegetables",
    description: "Large eggplant, sold by the kilogram.",
    image: "./assets/images/vegetables/big-egg-plant.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "small-brinjal", name: "Small Brinjal (kg)", category: "Vegetables",
    description: "Small brinjal, sold by the kilogram.",
    image: "./assets/images/vegetables/small-brinjal.jpeg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "woso", name: "Woso (kg)", category: "Vegetables",
    description: "Fresh woso, sold by the kilogram.",
    image: "./assets/images/vegetables/woso.jpeg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "turmeric", name: "Turmeric (kg)", category: "Herbs & Aromatics",
    description: "Fresh turmeric, sold by the kilogram.",
    image: "./assets/images/vegetables/turmeric.jpeg",
    unit: "kg", price: 6000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "celery", name: "Celery", category: "Herbs & Aromatics",
    description: "Fresh celery; price depends on bundle size.",
    image: "./assets/images/vegetables/celery.jpg",
    unit: "unit", price: null, priceMin: 4000, priceMax: 7000,
    variablePrice: true, available: true
  },
  {
    id: "drumstick", name: "Drumstick (Bundles)", category: "Vegetables",
    description: "Drumstick pods, sold by the bundle.",
    image: "./assets/images/vegetables/drumstick.jpg",
    unit: "bundle", price: 2000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "okra", name: "Okra (kg)", category: "Vegetables",
    description: "Fresh okra, sold by the kilogram.",
    image: "./assets/images/vegetables/okra.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "broccoli", name: "Broccoli", category: "Vegetables",
    description: "Fresh broccoli, sold per head.",
    image: "./assets/images/vegetables/broccoli.jpg",
    unit: "piece", price: 7500, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "cauliflower", name: "Cauliflower", category: "Vegetables",
    description: "Fresh cauliflower; price depends on size.",
    image: "./assets/images/vegetables/cauliflower.jpg",
    unit: "piece", price: null, priceMin: 3500, priceMax: 5000,
    variablePrice: true, available: true
  },
  {
    id: "garlic-imported", name: "Garlic Imported", category: "Herbs & Aromatics",
    description: "Imported garlic; price depends on quantity.",
    image: "./assets/images/vegetables/garlic-imported.jpeg",
    unit: "unit", price: null, priceMin: 3000, priceMax: 15000,
    variablePrice: true, available: true
  },
  {
    id: "garlic-local", name: "Garlic Local (kg)", category: "Herbs & Aromatics",
    description: "Local garlic, sold by the kilogram.",
    image: "./assets/images/vegetables/garlic-local.jpeg",
    unit: "kg", price: 14000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },

  /* ============================================================
     SPICES — 6 items
     ============================================================ */
  {
    id: "clove-powder", name: "Clove Powder / Seed (kg)", category: "Spices",
    description: "Whole cloves or clove powder, sold by the kilogram.",
    image: "./assets/images/vegetables/clove-powder.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "black-seed", name: "Black Seed / Powder (kg)", category: "Spices",
    description: "Black seed or black seed powder, sold by the kilogram.",
    image: "./assets/images/vegetables/black-seed.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "cinnamon", name: "Cinnamon / Powder (kg)", category: "Spices",
    description: "Cinnamon sticks or powder, sold by the kilogram.",
    image: "./assets/images/vegetables/cinnamon.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "red-pepper-powder", name: "Red Pepper Seed / Powder", category: "Spices",
    description: "Red pepper seeds or powder — price confirmed on WhatsApp.",
    image: "./assets/images/vegetables/red-pepper-powder.jpg",
    unit: "kg", price: null, priceMin: null, priceMax: null,
    variablePrice: true, available: true
  },
  {
    id: "turmeric-powder", name: "Turmeric / Powder (kg)", category: "Spices",
    description: "Turmeric root or turmeric powder, sold by the kilogram.",
    image: "./assets/images/vegetables/turmeric-powder.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "ginger-powder", name: "Ginger / Powder (kg)", category: "Spices",
    description: "Dried ginger or ginger powder, sold by the kilogram.",
    image: "./assets/images/vegetables/ginger-powder.jpg",
    unit: "kg", price: 4000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },

  /* ============================================================
     MEAT — 5 items
     ============================================================ */
  {
    id: "goat-meat", name: "Goat Meat", category: "Meat",
    description: "Fresh goat meat, sold by the kilogram.",
    image: "./assets/images/vegetables/goat-meat.jpg",
    unit: "kg", price: 27000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "beef", name: "Cow's Beef", category: "Meat",
    description: "Fresh beef, sold by the kilogram.",
    image: "./assets/images/vegetables/beef.jpg",
    unit: "kg", price: 15000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "chicken", name: "Chicken (kg)", category: "Meat",
    description: "Fresh chicken, sold by the kilogram.",
    image: "./assets/images/vegetables/chicken.jpg",
    unit: "kg", price: 25000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "mutton", name: "Mutton (kg)", category: "Meat",
    description: "Fresh mutton, sold by the kilogram.",
    image: "./assets/images/vegetables/mutton.jpg",
    unit: "kg", price: 27000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  },
  {
    id: "liver", name: "Liver", category: "Meat",
    description: "Fresh liver, sold by the kilogram.",
    image: "./assets/images/vegetables/liver.jpg",
    unit: "kg", price: 27000, priceMin: null, priceMax: null,
    variablePrice: false, available: true
  }
];