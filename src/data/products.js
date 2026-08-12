const imageUrl = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const products = [
  {
    id: 1,
    name: "Vintage Film Camera",
    category: "Electronics",
    condition: "Like New",
    price: 145,
    oldPrice: 180,
    image: imageUrl("photo-1516035069371-29a1b244cc32"),
    gallery: [
      imageUrl("photo-1516035069371-29a1b244cc32", 1500),
      imageUrl("photo-1452780212940-6f5c0d14d848", 1500),
      imageUrl("photo-1495121553079-4c61bcce1894", 1500)
    ],
    description:
      "A beautifully preserved 35mm film camera. It is fully tested, easy to use, and includes a clean prime lens and the original leather strap.",
    features: [
      "Includes the original leather strap",
      "Lens is free from fungus and scratches",
      "Shutter speeds have been tested"
    ],
    seller: "Alex R.",
    location: "Portland, OR",
    rating: 4.9,
    reviews: 124,
    featured: true
  },
  {
    id: 2,
    name: "Mechanical Keyboard Keychron K2",
    category: "Electronics",
    condition: "Excellent",
    price: 85,
    oldPrice: 105,
    image: imageUrl("photo-1587829741301-dc798b83add3"),
    gallery: [
      imageUrl("photo-1587829741301-dc798b83add3", 1500),
      imageUrl("photo-1595225476474-87563907a212", 1500)
    ],
    description:
      "A compact wireless mechanical keyboard with tactile switches, white backlight, and very light signs of use.",
    features: [
      "Bluetooth and wired connections",
      "Tested keys and backlight",
      "USB-C cable included"
    ],
    seller: "Maya T.",
    location: "Seattle, WA",
    rating: 4.8,
    reviews: 73,
    featured: true
  },
  {
    id: 3,
    name: "Vintage Levi's Denim Jacket",
    category: "Fashion",
    condition: "Good",
    price: 55,
    oldPrice: 70,
    image: imageUrl("photo-1551537482-f2075a1d41f2"),
    gallery: [
      imageUrl("photo-1551537482-f2075a1d41f2", 1500),
      imageUrl("photo-1542272604-787c3835535d", 1500)
    ],
    description:
      "A classic medium-wash denim jacket with a comfortable relaxed fit. Clean, durable, and ready for a new owner.",
    features: [
      "Original metal buttons",
      "No tears or missing parts",
      "Freshly cleaned"
    ],
    seller: "Jordan P.",
    location: "Austin, TX",
    rating: 4.7,
    reviews: 58,
    featured: true
  },
  {
    id: 4,
    name: "Ceramic Pour-Over Coffee Set",
    category: "Home & Garden",
    condition: "Excellent",
    price: 40,
    oldPrice: 52,
    image: imageUrl("photo-1495474472287-4d71bcdd2085"),
    gallery: [
      imageUrl("photo-1495474472287-4d71bcdd2085", 1500),
      imageUrl("photo-1445116572660-236099ec97a0", 1500)
    ],
    description:
      "A handmade ceramic dripper and matching mug with a warm neutral glaze. Used only a few times and carefully stored.",
    features: [
      "Handmade ceramic pieces",
      "No chips or cracks",
      "Dishwasher safe"
    ],
    seller: "Nora K.",
    location: "Denver, CO",
    rating: 5,
    reviews: 31,
    featured: true
  },
  {
    id: 5,
    name: "Yamaha Acoustic Guitar",
    category: "Sports & Outdoors",
    condition: "Like New",
    price: 120,
    oldPrice: 155,
    image: imageUrl("photo-1510915361894-db8b60106cb1"),
    gallery: [
      imageUrl("photo-1510915361894-db8b60106cb1", 1500),
      imageUrl("photo-1525201548942-d8732f6617a0", 1500)
    ],
    description:
      "A warm-sounding acoustic guitar with smooth action and only minor signs of use. A good choice for a beginner.",
    features: [
      "New strings installed",
      "Neck and tuning checked",
      "Soft carrying bag included"
    ],
    seller: "Sam D.",
    location: "Chicago, IL",
    rating: 4.8,
    reviews: 96,
    featured: true
  },
  {
    id: 6,
    name: "Leather Hiking Boots",
    category: "Fashion",
    condition: "Good",
    price: 65,
    oldPrice: 90,
    image: imageUrl("photo-1542291026-7eec264c27ff"),
    gallery: [
      imageUrl("photo-1542291026-7eec264c27ff", 1500),
      imageUrl("photo-1460353581641-37baddab0fa2", 1500)
    ],
    description:
      "Comfortable leather hiking boots, size 10. The soles have plenty of grip and the leather has been conditioned.",
    features: [
      "Water-resistant leather",
      "Strong non-slip soles",
      "Cleaned and conditioned"
    ],
    seller: "Chris L.",
    location: "Boulder, CO",
    rating: 4.6,
    reviews: 44,
    featured: false
  },
  {
    id: 7,
    name: "Modern Brass Desk Lamp",
    category: "Home & Garden",
    condition: "Excellent",
    price: 85,
    oldPrice: 110,
    image: imageUrl("photo-1507473885765-e6ed057f782c"),
    gallery: [
      imageUrl("photo-1507473885765-e6ed057f782c", 1500),
      imageUrl("photo-1534274988757-a28bf1a57c17", 1500)
    ],
    description:
      "A clean mid-century inspired desk lamp with a soft green shade and adjustable brass arm.",
    features: [
      "Working switch and cable",
      "Energy-saving bulb included",
      "Stable weighted base"
    ],
    seller: "Eli W.",
    location: "Boston, MA",
    rating: 4.9,
    reviews: 61,
    featured: false
  },
  {
    id: 8,
    name: "Canvas Camera Bag",
    category: "Fashion",
    condition: "Like New",
    price: 45,
    oldPrice: 58,
    image: imageUrl("photo-1553062407-98eeb64c6a62"),
    gallery: [
      imageUrl("photo-1553062407-98eeb64c6a62", 1500),
      imageUrl("photo-1622560480605-d83c853bc5c3", 1500)
    ],
    description:
      "A sturdy canvas shoulder bag with a padded interior, adjustable dividers, and several accessory pockets.",
    features: [
      "Adjustable padded dividers",
      "Water-resistant canvas",
      "Comfortable shoulder strap"
    ],
    seller: "Lina B.",
    location: "Portland, OR",
    rating: 4.8,
    reviews: 37,
    featured: false
  },
  {
    id: 9,
    name: "Classic Reading Collection",
    category: "Books",
    condition: "Good",
    price: 28,
    oldPrice: 40,
    image: imageUrl("photo-1524995997946-a1c2e315a42f"),
    gallery: [
      imageUrl("photo-1524995997946-a1c2e315a42f", 1500),
      imageUrl("photo-1512820790803-83ca734da794", 1500)
    ],
    description:
      "A set of six classic novels in readable condition. Some covers show gentle shelf wear, but all pages are complete.",
    features: [
      "Six complete novels",
      "No missing or torn pages",
      "Stored in a smoke-free home"
    ],
    seller: "Omar H.",
    location: "New York, NY",
    rating: 4.7,
    reviews: 82,
    featured: false
  },
  {
    id: 10,
    name: "Wooden Building Blocks",
    category: "Toys",
    condition: "Excellent",
    price: 32,
    oldPrice: 45,
    image: imageUrl("photo-1598880940080-ff9a29891b85"),
    gallery: [
      imageUrl("photo-1598880940080-ff9a29891b85", 1500),
      imageUrl("photo-1594787318286-3d835c1d207f", 1500)
    ],
    description:
      "A colorful set of smooth wooden building blocks. All pieces are clean and stored in the included cotton bag.",
    features: [
      "Non-toxic painted wood",
      "All pieces included",
      "Cotton storage bag"
    ],
    seller: "Dana F.",
    location: "Madison, WI",
    rating: 5,
    reviews: 29,
    featured: false
  },
  {
    id: 11,
    name: "City Commuter Bicycle",
    category: "Vehicles",
    condition: "Fair",
    price: 210,
    oldPrice: 280,
    image: imageUrl("photo-1576435728678-68d0fbf94e91"),
    gallery: [
      imageUrl("photo-1576435728678-68d0fbf94e91", 1500),
      imageUrl("photo-1485965120184-e220f721d03e", 1500)
    ],
    description:
      "A reliable city bicycle with seven gears, front and rear lights, and a rear cargo rack. Cosmetic wear is visible.",
    features: [
      "Seven working gears",
      "Front and rear lights",
      "Recently serviced brakes"
    ],
    seller: "Taylor M.",
    location: "San Francisco, CA",
    rating: 4.6,
    reviews: 53,
    featured: false
  },
  {
    id: 12,
    name: "Oak Lounge Chair",
    category: "Home & Garden",
    condition: "Good",
    price: 175,
    oldPrice: 230,
    image: imageUrl("photo-1503602642458-232111445657"),
    gallery: [
      imageUrl("photo-1503602642458-232111445657", 1500),
      imageUrl("photo-1567538096630-e0c55bd6374c", 1500)
    ],
    description:
      "A solid oak lounge chair with a comfortable woven seat. The frame is strong with normal marks from careful use.",
    features: [
      "Solid oak construction",
      "Comfortable woven seat",
      "Clean and structurally sound"
    ],
    seller: "Ava S.",
    location: "Nashville, TN",
    rating: 4.9,
    reviews: 68,
    featured: false
  }
];

export const categories = [
  { name: "Electronics", icon: "devices" },
  { name: "Fashion", icon: "checkroom" },
  { name: "Home & Garden", icon: "chair" },
  { name: "Sports & Outdoors", icon: "sports_basketball" },
  { name: "Books", icon: "menu_book" },
  { name: "Toys", icon: "toys" },
  { name: "Vehicles", icon: "directions_car" },
  { name: "All", icon: "category" }
];

export const conditions = [
  "New",
  "Like New",
  "Excellent",
  "Good",
  "Fair"
];

export function findProduct(productId) {
  return products.find((product) => product.id === Number(productId));
}
