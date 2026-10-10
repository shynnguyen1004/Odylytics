export type NavItem = { label: string; href: string }

export type Solution = {
  id: string
  name: string
  logo: string | null
  oneLiner: string
  category: string
  flagship: boolean
}

export type Feature = { title: string; text: string }
export type Metric = { value: string; label: string }

export type FeaturedSolution = {
  id: string
  name: string
  logo: string
  badge: string
  tagline: string
  problem: string
  features: Feature[]
  metrics: Metric[]
  cta: string
}

export type RecognitionType = 'AWARD' | 'CERTIFICATION' | 'ACCELERATOR'

export type Recognition = {
  type: RecognitionType
  title: string
  issuer: string
  year: string
  context: string
  issuerLogo: string | null
}

export type RecognitionGroup = {
  solutionId: string
  solutionName: string
  items: Recognition[]
}

export type Partner = {
  name: string
  type: string
  description: string
  logo: string | null
}

export type Testimonial = {
  quote: string
  name: string
  role: string
  avatar: string | null
  solution: string
}

export type TeamMember = {
  name: string
  role: string
  bio: string
  photo: string | null
  linkedin: string | null
}

export const BRAND = {
  wordmark: '/assets/brand/odylytics-wordmark.svg',
  wordmarkDark: '/assets/brand/odylytics-wordmark-dark.svg',
  symbol: '/assets/brand/odylytics-symbol.svg',
  symbolDark: '/assets/brand/odylytics-symbol-dark.svg',
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'Partners', href: '#partners' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

// ─── 1. Hero ────────────────────────────────────────────────────────────────

export const HERO = {
  eyebrow: 'AI-powered digital solutions',
  // Option A (selected). Alternatives from CONTENT_OUTLINE.md §1:
  //   B. Intelligent solutions for safer, smarter communities.
  //   C. We build AI that works when it matters most.
  headlineTop: 'AI that turns data',
  headlineBottom: 'into decisions that',
  rotatingWords: ['predict', 'protect', 'respond', 'recover'],
  srHeadline: 'AI that turns data into decisions that predict, protect, respond and recover.',
  // TODO(content): confirm what Odylytics provides and to whom.
  subheadline:
    'Odylytics is an AI startup delivering real-time monitoring, predictive analytics and decision-support platforms for governments, enterprises and communities.',
  primaryCta: { label: 'Explore solutions', href: '#solutions' },
  secondaryCta: { label: 'Partner with us', href: '#contact' },
  // TODO(content): confirm marquee keywords.
  marquee: ['AI analytics', 'IoT monitoring', 'Early warning', 'Data platforms', 'Decision support', 'Inclusive design'],
}

// ─── 2. Core Digital Solutions ──────────────────────────────────────────────

export const SOLUTIONS_HEADING = {
  eyebrow: 'Core digital solutions',
  lead: 'Six solutions.',
  main: 'One intelligence layer.',
  // TODO(content): confirm intro sentence.
  intro: 'Each Odylytics solution shares the same AI core — built once, adapted to every domain we serve.',
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'aquaguard',
    name: 'AquaGuard',
    logo: '/assets/solutions/aquaguard.png',
    oneLiner: 'Real-time flood intelligence and coordinated rescue support.',
    category: 'Disaster response',
    flagship: true,
  },
  {
    id: 'airguard',
    name: 'AirGuard',
    logo: '/assets/solutions/airguard.png',
    oneLiner: 'Accessible air-quality monitoring for healthier cities.',
    category: 'Environment',
    flagship: true,
  },
  {
    id: 'includio',
    name: 'Includio',
    logo: '/assets/solutions/includio.png',
    oneLiner: 'One-line description coming soon.', // TODO(content)
    category: 'Category', // TODO(content)
    flagship: false,
  },
  {
    id: 'roomie',
    name: 'RooMie',
    logo: '/assets/solutions/roomie.png',
    oneLiner: 'One-line description coming soon.', // TODO(content)
    category: 'Category', // TODO(content)
    flagship: false,
  },
  {
    id: 'hearwork',
    name: 'HearWork',
    logo: '/assets/solutions/hearwork.png',
    oneLiner: 'One-line description coming soon.', // TODO(content)
    category: 'Category', // TODO(content)
    flagship: false,
  },
  {
    id: 'enablecode',
    name: 'EnableCode',
    logo: '/assets/solutions/enablecode.png',
    oneLiner: 'One-line description coming soon.', // TODO(content)
    category: 'Category', // TODO(content)
    flagship: false,
  },
]

// ─── 3. Featured Solutions ──────────────────────────────────────────────────

export const FEATURED_HEADING = {
  eyebrow: 'Featured solutions',
  lead: 'Two platforms.',
  main: 'Proven in the field.',
}

export const FEATURED: FeaturedSolution[] = [
  {
    id: 'aquaguard',
    name: 'AquaGuard',
    logo: '/assets/solutions/aquaguard.png',
    badge: 'Flagship',
    tagline: 'Real-time flood intelligence and coordinated rescue support.',
    // TODO(content): problem statement, features and verified metrics.
    problem:
      'When floods rise, residents, responders and local authorities often work from different, outdated pictures of the situation. Every minute spent reconciling them delays help.',
    features: [
      { title: 'Live water-level monitoring', text: 'Sensor and report data combined into one current view.' },
      { title: 'Early flood alerts', text: 'Timely warnings sent to the people and areas at risk.' },
      { title: 'Rescue request mapping', text: 'Requests for help located, prioritised and tracked.' },
      { title: 'Responder coordination', text: 'One shared picture for teams working in the field.' },
    ],
    metrics: [
      { value: 'XX', label: 'Metric label' },
      { value: 'XX', label: 'Metric label' },
      { value: 'XX', label: 'Metric label' },
    ],
    cta: 'Learn more',
  },
  {
    id: 'airguard',
    name: 'AirGuard',
    logo: '/assets/solutions/airguard.png',
    badge: 'Flagship',
    tagline: 'Accessible air-quality monitoring for healthier cities.',
    // TODO(content): problem statement, features and verified metrics.
    problem:
      'Air quality changes street by street, but most people only see a single city-wide number — too coarse to guide everyday decisions about health.',
    features: [
      { title: 'Affordable sensor network', text: 'Dense, low-cost monitoring across neighbourhoods.' },
      { title: 'Live air-quality map', text: 'Readings shown clearly, block by block.' },
      { title: 'Health advisories', text: 'Plain-language guidance when conditions change.' },
      { title: 'Open data access', text: 'Datasets shared with researchers and city planners.' },
    ],
    metrics: [
      { value: 'XX', label: 'Metric label' },
      { value: 'XX', label: 'Metric label' },
    ],
    cta: 'Learn more',
  },
]

// ─── 4. Awards & Certifications ─────────────────────────────────────────────

export const RECOGNITION_HEADING = {
  eyebrow: 'Recognition',
  lead: 'Independent proof.',
  main: 'Recognised for impact.',
}

// TODO(content): replace every recognition entry with verified titles, issuers, years and logos.
export const RECOGNITION: RecognitionGroup[] = [
  {
    solutionId: 'aquaguard',
    solutionName: 'AquaGuard',
    items: [
      {
        type: 'AWARD',
        title: 'Award Title — 2025',
        issuer: 'Issuing Organisation',
        year: '2025',
        context: 'One line of context, such as ranking or cohort size.',
        issuerLogo: null,
      },
      {
        type: 'ACCELERATOR',
        title: 'Programme Title — 2025',
        issuer: 'Organiser Name',
        year: '2025',
        context: 'One line of context, such as ranking or cohort size.',
        issuerLogo: null,
      },
    ],
  },
  {
    solutionId: 'airguard',
    solutionName: 'AirGuard',
    items: [
      {
        type: 'AWARD',
        title: 'Award Title — 2025',
        issuer: 'Issuing Organisation',
        year: '2025',
        context: 'One line of context, such as ranking or cohort size.',
        issuerLogo: null,
      },
      {
        type: 'CERTIFICATION',
        title: 'Certification Title — 2025',
        issuer: 'Certifying Body',
        year: '2025',
        context: 'One line on what the certification covers.',
        issuerLogo: null,
      },
    ],
  },
]

// ─── 5. Partnerships ────────────────────────────────────────────────────────

export const PARTNERS_HEADING = {
  eyebrow: 'Partnerships',
  lead: 'Trusted by institutions.',
  main: 'Built with communities.',
  // TODO(content): partnership intro sentence.
  intro: 'We work with public bodies, researchers and companies to turn reliable data into everyday safety.',
}

// TODO(content): one-line description of each partnership.
export const PARTNERS: Partner[] = [
  { name: 'Arizona State University', type: 'Academic', description: 'Short description of what we build together and the outcome it supports.', logo: '/assets/partners/asu.png' },
  { name: 'RMIT University', type: 'Academic', description: 'Short description of what we build together and the outcome it supports.', logo: '/assets/partners/rmit.png' },
  { name: 'Sorbonne Université', type: 'Academic', description: 'Short description of what we build together and the outcome it supports.', logo: '/assets/partners/sorbonne.png' },
  { name: 'University of Technology Sydney', type: 'Academic', description: 'Short description of what we build together and the outcome it supports.', logo: '/assets/partners/uts.png' },
  { name: 'Université Laval', type: 'Academic', description: 'Short description of what we build together and the outcome it supports.', logo: '/assets/partners/laval.png' },
  { name: 'Dow', type: 'Corporate', description: 'Short description of what we build together and the outcome it supports.', logo: '/assets/partners/dow.png' },
]

// ─── 6. Testimonials ────────────────────────────────────────────────────────

export const TESTIMONIALS_HEADING = {
  eyebrow: 'Testimonials',
  lead: 'In their words.',
  main: 'What our partners and users say.',
}

// TODO(content): 4 approved quotes with name, role, photo and consent.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Placeholder testimonial from a government or institutional partner. This space holds a 40–80 word quote describing a specific, verifiable outcome they saw after working with Odylytics — for example, how a team made faster decisions with shared, reliable data. Replace it with the approved wording and confirm consent before publishing. Longer quotes like this one open in a dialog so the card stays compact.',
    name: 'Name Surname',
    role: 'Role, Government agency',
    avatar: null,
    solution: 'AquaGuard',
  },
  {
    quote:
      'Placeholder testimonial from a delivery partner. Replace with a 40–80 word quote about what you built together and the result it produced.',
    name: 'Name Surname',
    role: 'Role, Partner organisation',
    avatar: null,
    solution: 'AirGuard',
  },
  {
    quote:
      'Placeholder testimonial from an end user or community member. Replace with a 40–80 word quote about how the solution helped them in daily life.',
    name: 'Name Surname',
    role: 'Community member, Location',
    avatar: null,
    solution: 'AquaGuard',
  },
  {
    quote:
      'Placeholder testimonial from an expert or mentor. Replace with a 40–80 word quote on the team, the approach and the potential impact.',
    name: 'Name Surname',
    role: 'Mentor, Organisation',
    avatar: null,
    solution: 'Odylytics',
  },
]

// ─── 7. Core Team ───────────────────────────────────────────────────────────

export const TEAM_HEADING = {
  eyebrow: 'Core team',
  lead: 'Five builders.',
  main: 'The people behind Odylytics.',
  intro: 'Five builders working across AI, engineering, design and community impact.',
}

// TODO(content): full names and LinkedIn URLs for all 5 members; confirm bios.
export const TEAM: TeamMember[] = [
  {
    name: 'Quân',
    role: 'Product Lead',
    bio: 'Sets product direction across all six solutions, turning field needs from communities and partners into clear roadmaps.',
    photo: '/assets/team/quan-a.png',
    linkedin: null,
  },
  {
    
    name: 'Sơn',
    role: 'Product & UX Lead',
    bio: 'Designs accessible, human-centred experiences so every solution stays simple to use, even in a crisis.',
    photo: '/assets/team/son.png',
    linkedin: null,
  },
  {
    name: 'Nghĩa',
    role: 'AI Lead',
    bio: 'Leads our shared AI core, designing the models that turn sensor and community data into timely predictions.',
    photo: '/assets/team/nghia.png',
    linkedin: null,
  },
  {
    name: 'Quân',
    role: 'Head of Marketing',
    bio: 'Shapes how Odylytics reaches governments, partners and communities, and tells the stories behind our impact.',
    photo: '/assets/team/quan-b.png',
    linkedin: null,
  },
  {
    name: 'Khang',
    role: 'Software Engineer',
    bio: 'Builds the platforms behind our solutions, from real-time data pipelines to the dashboards responders rely on.',
    photo: '/assets/team/khang.png',
    linkedin: null,
  },
]

// ─── 8. Contact + Footer ────────────────────────────────────────────────────

export const CONTACT = {
  eyebrow: 'Contact',
  lead: "Let's build what matters.",
  main: 'Together.',
  subcopy: "Partnerships, pilots or press — we'd love to hear from you.",
  // TODO(content): confirm address, phone and email.
  address: 'Street address, City, Country',
  phone: '+00 000 000 000',
  email: 'hello@odylytics.com',
}

// TODO(content): real social profile URLs.
export const SOCIALS: NavItem[] = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'YouTube', href: '#' },
]

export const COMPANY_LINKS: NavItem[] = [
  { label: 'About', href: '#home' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'Partners', href: '#partners' },
  { label: 'Team', href: '#team' },
]
