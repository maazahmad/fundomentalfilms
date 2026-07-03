/**
 * ============================================================
 * FUNDOMENTALFILMS — Project Data Store
 * ============================================================
 * 
 * TO ADD A NEW PROJECT:
 * Simply add a new object to the `projects` array below.
 * 
 * Each project object has:
 *   - title       (string)  : Display name of the project
 *   - slug        (string)  : URL-friendly identifier (lowercase, hyphens)
 *   - vimeoId     (string)  : Vimeo video ID (the number from vimeo.com/XXXXXXX)
 *   - description (string)  : Short description shown on the project detail page
 *   - category    (string)  : One of: "showreel", "commercial", "narrative", 
 *                             "documentary", "music-video", "fashion", "short-film"
 *   - thumbnail   (string)  : Path to thumbnail image (relative to root)
 *   - year        (string)  : Year the project was made (optional)
 *   - client      (string)  : Client name (optional)
 *   - role        (string)  : Your role on the project (optional)
 * 
 * The FIRST project in the array with category "showreel" will be 
 * used as the featured showreel on the home page.
 * ============================================================
 */

const projects = [
  {
    title: "Showreel",
    slug: "showreel",
    vimeoId: "1197492291",
    description: "Fundomental Films — Director Showreel. A curated selection of our finest cinematography work across commercials, narratives, documentaries, and music videos.",
    category: "showreel",
    thumbnail: "assets/images/showreel.png",
    year: "2024",
  },
  {
    title: "Golden Hour",
    slug: "golden-hour",
    vimeoId: "921550657",
    description: "A cinematic commercial capturing the warmth and beauty of golden hour light. Shot on location with natural lighting techniques.",
    category: "commercial",
    thumbnail: "assets/images/commercial.png",
    year: "2024",
    client: "Sample Brand",
    role: "Director of Photography",
  },
  {
    title: "Hands of Time",
    slug: "hands-of-time",
    vimeoId: "218673982",
    description: "An intimate documentary exploring the craft of traditional pottery making. Following artisans as they shape clay with generations of inherited skill.",
    category: "documentary",
    thumbnail: "assets/images/documentary.png",
    year: "2023",
    role: "Director / Cinematographer",
  },
  {
    title: "Neon Nights",
    slug: "neon-nights",
    vimeoId: "169599296",
    description: "A moody narrative short film set in rain-soaked city streets. Exploring themes of solitude and connection through atmospheric cinematography.",
    category: "narrative",
    thumbnail: "assets/images/narrative.png",
    year: "2023",
    role: "Director of Photography",
  },
  {
    title: "Pulse",
    slug: "pulse",
    vimeoId: "231160847",
    description: "A high-energy music video combining dynamic camera movement with dramatic stage lighting and smoke effects.",
    category: "music-video",
    thumbnail: "assets/images/musicvideo.png",
    year: "2023",
    client: "Independent Artist",
    role: "Director / Cinematographer",
  },
  {
    title: "The Archway",
    slug: "the-archway",
    vimeoId: "364402896",
    description: "A fashion film capturing elegant movement through historic European architecture. Soft natural light meets refined wardrobe.",
    category: "fashion",
    thumbnail: "assets/images/fashion.png",
    year: "2022",
    client: "Fashion Label",
    role: "Director of Photography",
  },
  {
    title: "Last Orders",
    slug: "last-orders",
    vimeoId: "194276412",
    description: "An intimate short film about two strangers meeting in a dimly lit café. A story told through glances, silences, and warm tungsten light.",
    category: "short-film",
    thumbnail: "assets/images/shortfilm.png",
    year: "2022",
    role: "Director / Writer / Cinematographer",
  },
  {
    title: "Wide Open",
    slug: "wide-open",
    vimeoId: "289442556",
    description: "An epic travel film capturing the vast scale of desert landscapes from the air. A meditation on space, freedom, and the open road.",
    category: "narrative",
    thumbnail: "assets/images/travel.png",
    year: "2022",
    role: "Director / Cinematographer",
  },
];

// ============================================================
// Site Configuration
// ============================================================
const siteConfig = {
  brandName: "Fundomental Films",
  subtitle: "Director of Photography",
  email: "hello@fundomentalfilms.com",
  phone: "",
  social: {
    instagram: "https://instagram.com/fundomentalfilms",
    vimeo: "https://vimeo.com/fundomentalfilms",
    linkedin: "https://linkedin.com/in/fundomentalfilms",
  },
  aboutText: `Fundomental Films is a creative filmmaking studio specialising in cinematography, direction, and visual storytelling. With a passion for light, composition, and emotion, we bring stories to life across commercials, narrative films, documentaries, fashion, and music videos.

Our work has taken us across the world, collaborating with brands, independent artists, and fellow filmmakers to craft visuals that resonate. Every project is approached with a deep respect for the craft — combining technical precision with artistic instinct.

We believe in the power of images to move people. Whether it's a sweeping landscape or an intimate close-up, we find the frame that tells the story.`,
};
