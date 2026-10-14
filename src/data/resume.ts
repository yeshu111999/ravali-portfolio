export const profile = {
  name: "Ravali Salakala",
  first: "Ravali",
  last: "Salakala",
  title: "Senior Frontend Engineer",
  stack: ["React", "Next.js", "TypeScript"],
  location: "Irving, TX",
  email: "ravalis607@gmail.com",
  phone: "940-843-8064",
  linkedin: "https://www.linkedin.com/in/ravali-s-071043196",
  linkedinLabel: "linkedin.com/in/ravali-s-071043196",
  resume: "/Ravali_Salakala_Resume.pdf",
  summary:
    "Senior Frontend Engineer with 7+ years of experience building scalable, high-performance web applications for enterprise B2B e-commerce using React, Next.js, TypeScript and Redux.",
  about: [
    "I build the parts of the web people actually touch: product pages, search, pricing, checkout, and the shared component libraries that let whole teams move faster.",
    "My work sits where architecture meets craft. That means Next.js server and client boundaries, SSR/SSG, code splitting and list virtualization for speed, and WCAG 2.1 AA accessibility so everyone can use what we ship.",
    "I work closely with product, design and backend teams (I'm comfortable in Java Spring Boot too) to turn complex business requirements into fast, reliable experiences.",
  ],
};

export const stats = [
  { value: "7+", label: "Years shipping production UI" },
  { value: "3", label: "Enterprise engineering teams" },
  { value: "AA", label: "WCAG 2.1 accessibility standard" },
  { value: "M.S.", label: "Computer Science, UNT" },
];

export const strengths = [
  {
    title: "Next.js Architecture",
    body: "Server and client component boundaries, data fetching and caching patterns, and folder conventions adopted as the team standard.",
    icon: "layers",
  },
  {
    title: "Web Performance",
    body: "SSR/SSG, code splitting, dynamic imports, memoization, list virtualization and image optimization for better Core Web Vitals.",
    icon: "bolt",
  },
  {
    title: "Design Systems",
    body: "Reusable, documented components with typed props and variants that other squads adopt in place of one-off builds.",
    icon: "grid",
  },
  {
    title: "Accessibility",
    body: "Semantic markup, ARIA, keyboard navigation and focus traps, verified with axe and screen reader testing.",
    icon: "heart",
  },
];

export type Role = {
  company: string;
  location: string;
  role: string;
  period: string;
  highlights: string[];
  more: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "HD Supply Solutions",
    location: "Remote · Atlanta, GA",
    role: "Senior Frontend Engineer",
    period: "Jan 2026 — Present",
    highlights: [
      "Developed the frontend for a B2B e-commerce platform built in Next.js, React and TypeScript with Optimizely headless CMS, building storefront UI shared by multiple squads.",
      "Defined the Next.js application architecture, including server and client component boundaries, data fetching and caching patterns, and folder conventions adopted as the team standard.",
      "Delivered customer-specific contract pricing and entitlements on product and quote screens by resolving pricing, availability and permissions for the signed-in account.",
      "Replaced multiple REST round trips per page with typed GraphQL queries and fragments against Spring Boot microservices, significantly reducing API calls and over-fetching.",
      "Improved Lighthouse scores and Core Web Vitals, including faster LCP, on catalog and PDP routes using SSR/SSG, code splitting, dynamic imports and image optimization.",
    ],
    more: [
      "Built product detail, product listing, inventory and quote request flows with faceted search, sorting, pagination and account-level personalization.",
      "Architected checkout and quoting state with Redux and middleware for async orchestration, optimistic updates, request cancellation and centralized error handling.",
      "Built typed Axios clients with interceptors for token refresh, error normalization and retry with backoff.",
      "Fixed critical virtualization, focus and scroll defects in the shared Motif component library and documented new components other squads adopted.",
      "Built to WCAG 2.1 AA with semantic markup, ARIA, keyboard navigation and focus traps in modals and mega menus.",
      "Integrated Optimizely headless content with content models, preview mode and cached delivery, letting marketing publish without a frontend release.",
      "Led code reviews and mentored developers on component design, state management and accessibility.",
    ],
    stack: ["Next.js", "React 19", "TypeScript", "Redux Saga", "GraphQL", "Optimizely", "Spring Boot", "Tailwind", "Cypress", "AWS"],
  },
  {
    company: "Siyanex Software Solutions",
    location: "Remote · OH, USA",
    role: "Frontend Engineer",
    period: "May 2025 — Dec 2025",
    highlights: [
      "Built React and Next.js features in TypeScript for a high-traffic commerce storefront, covering product, pricing and promotion-driven components.",
      "Implemented cart and checkout with promotion and discount rules, tax and shipping estimates, and payment handoff to backend services.",
      "Built search and listing pages with faceted filtering, sorting and infinite scroll, keeping filter state in the URL so results stay shareable and indexable.",
      "Split server and client state between React Query and Redux with caching, background refetch and cache invalidation, eliminating duplicate API requests.",
    ],
    more: [
      "Reduced initial bundle size with code splitting, React.lazy, Suspense, memoization and image optimization; used SSR/SSG on category pages for SEO.",
      "Built reusable components to design system standards with typed props and variants.",
      "Built address, payment and account preference forms with controlled inputs and schema-based validation.",
      "Wrote Python scripts to automate test data setup and validate API responses across environments.",
      "Wrote Jest and React Testing Library tests and contributed to Dockerized Jenkins CI/CD pipelines.",
    ],
    stack: ["React", "Next.js", "TypeScript", "React Query", "Redux", "GraphQL", "Python", "Jest", "Docker"],
  },
  {
    company: "HCL Technologies",
    location: "Delhi, India",
    role: "Frontend Developer",
    period: "Jan 2018 — Jun 2023",
    highlights: [
      "Built enterprise single-page applications in React, TypeScript and Redux Toolkit, using custom hooks to share business logic across modules.",
      "Designed a reusable component library on Material UI with typed props, variants and theming, reducing duplicate UI code across feature teams.",
      "Built data-heavy dashboards and grids with server-side pagination, sorting, filtering and debounced search over large datasets.",
      "Built Service Portal widgets and custom UI pages with AngularJS for global support teams, plus SLA and change-success dashboards used in leadership reviews.",
    ],
    more: [
      "Implemented role-based routing and protected views with React Router, JWT authentication and token refresh through Axios interceptors.",
      "Developed multi-step forms with React Hook Form and Yup, including conditional fields and dynamic field arrays.",
      "Improved dashboard load times with code splitting, React.lazy, memoization and list virtualization.",
      "Configured Webpack, Babel, ESLint and Prettier, and added Jest and React Testing Library tests to Jenkins CI pipelines.",
      "Built Change Management request forms and approval screens covering risk and impact assessment, blackout windows and CAB scheduling.",
      "Led code reviews and mentored junior developers in Agile sprints with design, backend and QA teams.",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "Material UI", "React Hook Form", "AngularJS", "Spring Boot", "Webpack"],
  },
];

export const projects = [
  {
    kind: "storefront",
    title: "Enterprise B2B Storefront",
    org: "HD Supply Solutions",
    blurb:
      "Next.js storefront for enterprise buyers with contract pricing, entitlements, faceted search across a large catalog, and quote request flows. Content is driven by Optimizely headless CMS.",
    tags: ["Next.js", "GraphQL", "Optimizely", "WCAG 2.1 AA"],
    accent: "rose",
  },
  {
    kind: "checkout",
    title: "High-Traffic Commerce Checkout",
    org: "Siyanex Software Solutions",
    blurb:
      "Cart and checkout with promotion and discount rules, tax and shipping estimates, and URL-synced faceted filters so search results stay shareable and indexable.",
    tags: ["React Query", "Redux", "SSR/SSG", "Infinite scroll"],
    accent: "lilac",
  },
  {
    kind: "dashboard",
    title: "Enterprise Dashboards & UI Library",
    org: "HCL Technologies",
    blurb:
      "A themed Material UI component library and data-heavy dashboards with server-side pagination, debounced search and virtualized lists over large datasets.",
    tags: ["Redux Toolkit", "Material UI", "Virtualization", "Custom hooks"],
    accent: "peach",
  },
  {
    kind: "portal",
    title: "Global Service Portal",
    org: "HCL Technologies",
    blurb:
      "AngularJS portal widgets, dynamic forms with cascading lookups, Change Management approval flows, and SLA dashboards used in leadership reviews.",
    tags: ["AngularJS", "Dynamic forms", "REST", "Dashboards"],
    accent: "mint",
  },
] as const;

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SASS/SCSS", "Java", "Python", "SQL"] },
  { group: "Frameworks & State", items: ["React 18/19", "Next.js (App & Pages Router)", "Redux Toolkit", "Redux Saga", "React Query", "Context API", "React Hook Form", "Yup"] },
  { group: "UI & Accessibility", items: ["Tailwind CSS", "CSS Modules", "Styled Components", "Material UI", "Storybook", "WCAG 2.1 AA", "ARIA", "Responsive design"] },
  { group: "Performance", items: ["SSR / SSG", "Server Components", "Code splitting", "Lazy loading", "Memoization", "List virtualization", "Core Web Vitals"] },
  { group: "APIs & Backend", items: ["GraphQL", "REST", "Axios interceptors", "Spring Boot", "OpenAPI / Swagger", "Optimizely CMS", "PostgreSQL"] },
  { group: "Testing & DevOps", items: ["Jest", "React Testing Library", "Cypress", "axe", "Jenkins", "Docker", "AWS (S3, CloudFront, ECS)", "Vercel"] },
];

export const marquee = [
  "React", "Next.js", "TypeScript", "Redux Toolkit", "GraphQL", "React Query", "Tailwind CSS",
  "Storybook", "Jest", "Cypress", "WCAG 2.1 AA", "Spring Boot", "AWS", "Optimizely", "Figma",
];

export const education = [
  { degree: "Master of Science in Computer Science", school: "University of North Texas, Denton, TX", period: "Aug 2023 — May 2025" },
  { degree: "B.Tech in Electronics & Communication Engineering", school: "Sreenidhi University, India", period: "" },
];
