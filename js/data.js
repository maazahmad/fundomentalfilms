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
    title: "Horizontal Showreel",
    slug: "hshowreel",
    vimeoId: "1197492291",
    description: "A highlight of visual content produced for fashion brands, musicians, feature films, NGOs, FMCGs and Government organisations.",
    category: "showreel",
    thumbnail: "assets/images/Hshowreel26.jpg",
    year: "2026",
  },
  {
    title: "Vertical Showreel",
    slug: "vshowreel",
    vimeoId: "1197491522",
    description: "A highlight of vertical content produced for instagram and other social media platforms.",
    category: "showreel",
    thumbnail: "assets/images/Vshowreel26.jpg",
    year: "2026",
  },
  {
    title: "National Poverty Graduation Programme (NPGP) - Paksitan, 2026",
    slug: "hands-of-time",
    vimeoId: "1193666097",
    description: "The National Poverty Graduation Programme (NPGP), implemented with the Government of Pakistan, is doing exactly that. Reaching over 630,000 rural households, it brings together social protection and livelihoods by linking the Benazir Income Support Programme to a structured graduation approach.",
    category: "documentary",
    thumbnail: "assets/images/npgp26.jpg",
    year: "2023",
    client: "IFAD",
    role: "Cinematographer",
  },
  {
    title: "Kitnay Aansu by Ansar. and Mishal Shafi - Director's Cut",
    slug: "neon-nights",
    vimeoId: "1171565061",
    description: "KOYO presents Kitnay Aansu by Ansar. and Mishal Shafi",
    category: "music-video",
    thumbnail: "assets/images/kitnayaansu.jpg",
    year: "2025",
    client: "KOYO",
    role: "Director - DP - PostProduction",
  },
  {
    title: "Letter to yourself, 2024",
    slug: "lettertoyourself24",
    vimeoId: "921550657",
    description: "A project of Master Group of Companies",
    category: "commercial",
    thumbnail: "assets/images/letter24.jpg",
    year: "2024",
    client: "Master Group of Companies",
    role: "Director - DP - PostProduction",
  },
  {
    title: "Amazing Valentine",
    slug: "amazingvalentine",
    vimeoId: "1180267953",
    description: "Special reel needed a special re-do. A director's version of @koyo.official__ 's collaboration reel with @sonarafiq for this valentine",
    category: "fashion",
    thumbnail: "assets/images/avelantine.jpg",
    year: "2025",
    client: "KOYO",
    role: "Director - DP - PostProduction",
  },
  {
    title: "Urban X Winter X SAPPHIRE 2019",
    slug: "last-orders",
    vimeoId: "395639413",
    description: "Sapphire's Western influencer campaign with @mamia.jsk @meheksaeed @merlettebymaryam",
    category: "fashion",
    thumbnail: "assets/images/sapphirewest.jpg",
    year: "2019",
    client: "Sapphire",
    role: "Director - DP - PostProduction",
  },
  {
    title: "Ahmed Seddiqi & Sons - 70 Year Anniversary",
    slug: "wide-open",
    vimeoId: "430675792",
    description: "A quick turnaround motion graphics project for a very prestigious client, Ahmed Seddiqi & Sons on there 70th anniversary.",
    category: "narrative",
    thumbnail: "assets/images/ahmedsanim.jpg",
    year: "2020",
    client: "Ahmed Seddiqi & Sons",
    role: "Animator",
  },
  {
    title: "Tu Mil Jaye Tou | Ahmad Taha Ghani",
    slug: "tmjt",
    vimeoId: "659107341",
    description: "Tu Mil Jaye Tou | Full Song | Ahmad Taha Ghani",
    category: "music-video",
    thumbnail: "assets/images/tmjt.jpg",
    year: "2021",
    role: "Director - PostProduction",
  },
  {
    title: "A Promise to Chishtiyan",
    slug: "almustafatrust",
    vimeoId: "1171377261",
    description: "The fundraiser film ‘A Promise to Chishtiyan’ ,we produced for @almustafatrust.official Chishtiyan Center.",
    category: "documentary",
    thumbnail: "assets/images/almustafa.jpg",
    year: "2025",
    client: "Al-Mustafa Trust",
    role: "Director - DP - PostProduction",
  },
];

// ============================================================
// Site Configuration
// ============================================================
const siteConfig = {
  brandName: "Fundomental Films",
  subtitle: "Film - Art",
  email: "hello@fundomentalfilms.com",
  phone: "",
  social: {
    instagram: "https://www.instagram.com/fun.do.mental.films/",
    vimeo: "https://vimeo.com/fundomentalfilms",
    linkedin: "https://www.linkedin.com/company/44738707",
  },
  aboutText: `Fundomental Films is a creative filmmaking studio specialising in cinematography, direction, and visual storytelling. With a passion for light, composition, and emotion, we bring stories to life across commercials, narrative films, documentaries, fashion, and music videos.

Our work has taken us across the world, collaborating with brands, independent artists, and fellow filmmakers to craft visuals that resonate. Every project is approached with a deep respect for the craft — combining technical precision with artistic instinct.

We believe in the power of images to move people. Whether it's a sweeping landscape or an intimate close-up, we find the frame that tells the story.`,
};
