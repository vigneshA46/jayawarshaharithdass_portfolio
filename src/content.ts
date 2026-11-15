// All copy comes from "Jeyawarsharith Dass: Final Executive Portfolio" (client PDF). Nothing is invented.
export const person = {
  name: "Jeyawarsharith Dass",
  first: "JEYAWARSHARITH",
  last: "DASS",
  role: "Chairman & CEO",
  roles: "Entrepreneur | Strategist | Business Leader",
  lines: ["Building Businesses.", "Connecting Markets.", "Creating a Legacy."],
  ventures: "Three ventures. One vision.",
  motto: "Time and Word Build Empire.",
  // Sample portraits for now; swap the files in /public/people (or set a path to null to fall back to the silhouette).
  photos: {
    standing: "/people/standing-cut.webp" as string | null,
    close: "/people/close-cut.webp" as string | null,
    profile: "/people/profile.webp" as string | null,
    seated: "/people/seated.webp" as string | null,
  },
  photoSrc: null as string | null,
  mainSite: "https://www.jdcosmopolitan.com",
  emails: [
    ["JD COSMOPOLITAN", "ceo@jdcosmopolitan.com"],
    ["VENTURE KARTS", "ceo@venturekarts.com"],
    ["Personal", "jeyawarshaharithdass@gmail.com"],
  ] as [string, string][],
  phones: [
    ["9345350699", "tel:9345350699"],
    ["+91 93458 24728", "tel:+919345824728"],
  ] as [string, string][],
  links: [
    ["LinkedIn", "https://www.linkedin.com/in/jeyawarsha-harith-dass-jd-b6401a377"],
    ["WhatsApp", "https://wa.me/message/LOVDTRYQNEYGA1"],
    ["Instagram", "https://www.instagram.com/jeyawarshaharith_dass"],
    ["Instagram · JD COSMOPOLITAN", "https://www.instagram.com/jd_cosmopolitan"],
  ] as [string, string][],
};

export const about = [
  "I am Jeyawarsharith Dass, an entrepreneur driven by vision, ambition and the determination to build businesses that create lasting impact.",
  "I believe business is not simply about generating revenue; it is about creating opportunities, building trust, developing strong relationships and establishing something that can stand beyond generations.",
  "As Chairman & CEO, I lead the vision and strategic direction of three business ventures: JD COSMOPOLITAN, VENTURE KARTS and JD SOVEREIGN. My focus is on developing business ecosystems, exploring international opportunities, connecting markets and transforming ambitious ideas into structured business operations.",
  "My ambition is not limited to building companies. It is to build an enduring business legacy.",
];
export const principles = ["Vision", "Discipline", "Execution"];

export const ventures = {
  parent: {
    no: "01",
    name: "JD COSMOPOLITAN Pvt. Ltd.",
    kind: "Core Business Venture | International Trade & Business Operations",
    tag: "Parent company",
    text: "Focused on international trade, sourcing and end-to-end supply-chain opportunities.",
    items: ["Export & Import", "Global sourcing", "Customs clearance", "Sea and air cargo", "International trade and supply-chain solutions"],
    logoSrc: "/brand/jd-logo-hero.webp" as string | null,
  },
  karts: {
    no: "02",
    name: "VENTURE KARTS",
    kind: "Global Platform Venture | Digital Marketplace",
    tag: "Global platform venture",
    text: "A vision to connect people, businesses, products and markets through one global platform.",
    items: ["Global B2B marketplace", "Product sourcing", "Logistics connectivity", "AI-powered trade intelligence", "International business network"],
    logoSrc: "/brand/venture-karts.webp" as string | null,
  },
  sovereign: {
    no: "03",
    name: "JD SOVEREIGN",
    kind: "Subsidiary Venture | Diversified Business Services",
    tag: "Subsidiary of JD COSMOPOLITAN",
    text: "A subsidiary of JD COSMOPOLITAN, focused on event, property and digital service opportunities.",
    items: ["Event Management", "Real Estate", "Digital Marketing", "NRA Bridge Property"],
    logoSrc: "/brand/jd-sovereign.webp" as string | null,
  },
};

export const vision = [
  "To build a global business presence that connects people, opportunities, industries and international markets.",
  "I envision creating enterprises that are recognised not only for their achievements but also for their reliability, leadership, innovation and long-term contribution.",
  "My ultimate ambition is to establish a name and business legacy that continues to inspire generations.",
];

export const philosophy: [string, string][] = [
  ["Time", "Time gives value to every opportunity and every effort."],
  ["Word", "A person's word builds trust and relationships."],
  ["Discipline", "Consistency turns ambition into achievement."],
  ["Trust", "Strong partnerships are built through integrity."],
  ["Vision", "Think beyond today and build for generations."],
];

export const focus = [
  "Entrepreneurship and business development",
  "International trade and global markets",
  "Strategic partnerships",
  "Global business expansion",
  "Digital marketplace development",
  "Leadership and enterprise building",
];

export const mission = {
  title: "Beyond Business. Beyond Generations.",
  text: [
    "I do not measure success only by what I build today. I measure it by what continues to exist tomorrow.",
    "My mission is to create something meaningful, establish a respected identity and build a legacy that carries my vision beyond my lifetime.",
  ],
  closing: "A name may begin with one person. A legacy is built by generations.",
};

export const closing = ["Build with vision.", "Lead with discipline.", "Create a legacy."];

export const rail = ["Cover", "About", "JD COSMOPOLITAN", "VENTURE KARTS", "JD SOVEREIGN", "Vision", "Philosophy", "Focus", "Mission", "Contact"];

export const ceoPhilosophy = {
  eyebrow: "CEO Philosophy",
  quote: "Leadership is not just about holding a position. It is about taking responsibility, creating direction and turning vision into reality.",
  highlight: ["responsibility,", "direction", "vision", "reality."],
};

export const ceoWorks = {
  eyebrow: "04 — CEO Works & Responsibilities",
  headline: ["Executive Leadership.", "Strategic Decisions.", "Business Growth."],
  text: "As Chairman & CEO, my role is to establish the direction of the business, lead strategic decisions, build professional relationships and guide the organisation towards sustainable growth.",
  sub: "Core CEO Responsibilities",
  // headings only, as requested (no definitions)
  items: [
    "Strategic Planning",
    "Corporate Leadership",
    "Business Development",
    "Strategic Partnerships",
    "Operations Oversight",
    "Financial Oversight",
    "Decision Making",
    "Team Building",
    "Risk & Compliance Oversight",
    "Expansion & Innovation",
  ],
};
