export const SERVICES = [
  {
    slug: "web-development",
    title: "Web Development",
    short: "Fast, responsive websites built to convert visitors into customers.",
    description:
      "We design and build custom websites — from marketing sites to complex web apps — using modern frameworks like Next.js and React. Every site is built for speed, mobile responsiveness, and search visibility from day one.",
    process: [
      "Discovery call to understand your business and goals",
      "Wireframes and visual design for your approval",
      "Development in weekly sprints with progress previews",
      "Testing across devices and browsers",
      "Launch, plus 30 days of post-launch support",
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    short: "Native and cross-platform mobile apps for iOS and Android.",
    description:
      "From concept to app store, we build mobile applications that are fast, reliable, and easy to maintain. We work in React Native for most projects, so you get one codebase that runs well on both major platforms.",
    process: [
      "Product scoping and feature prioritization",
      "UI/UX design in Figma",
      "Cross-platform development and API integration",
      "QA testing on real devices",
      "App Store and Play Store submission support",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "SEO, paid ads, and content strategy that brings in real customers.",
    description:
      "We run digital marketing campaigns focused on measurable outcomes — leads, sales, and traffic that converts. Our work spans SEO, social media marketing, paid search, and content strategy tailored to your industry.",
    process: [
      "Audit of your current online presence",
      "Strategy built around your specific goals and budget",
      "Campaign setup across the right channels",
      "Monthly reporting with clear metrics",
      "Ongoing optimization based on real performance data",
    ],
  },
  {
    slug: "ecommerce-website",
    title: "E-commerce Websites",
    short: "Online stores that make it easy for customers to buy from you.",
    description:
      "We build e-commerce stores on the platform that fits your business, whether that's a custom-built cart or a headless setup on top of Shopify. Every store we build is optimized for checkout conversion and mobile shopping.",
    process: [
      "Product catalog and platform planning",
      "Store design matched to your brand",
      "Payment gateway and shipping integration",
      "Pre-launch checkout and load testing",
      "Launch support and post-launch optimization",
    ],
  },
];

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
