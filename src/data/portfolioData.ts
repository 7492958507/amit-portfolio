import type { Project, Experience, Award, Certificate, Education, PersonalInfo } from '../types/portfolio';

export const INITIAL_PERSONAL_INFO: PersonalInfo = {
  name: "Amit Kumar",
  headlineRole: "Software Engineer",
  currentCompany: "Heloix Startup Minds",
  location: "Patna, Bihar, India",
  email: "krumar7890@gmail.com",
  phone: "+91-7492958507",
  linkedin: "https://www.linkedin.com/in/amit-kumar-b8ab6524a",
  github: "https://github.com/7492958507",
  leetcode: "https://leetcode.com/u/theamit",
  bio: "Building high-performance backend services, distributed systems, and secure scalable web infrastructure.",
  roleTaglines: [
    "Full Stack Developer",
    "Software Engineer",
    "Backend & Cloud Specialist",
    "AI/ML Systems Enthusiast"
  ]
};

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Software Development",
    company: "Heloix Startup Minds Pvt. Ltd.",
    location: "Remote",
    period: "Aug 2026 – Present",
    highlights: [
      "Engineered a full-stack intern lifecycle management platform using React 18, TypeScript, Node.js, and Express: 20+ REST APIs with JWT-based RBAC across 4 roles supporting 2,000+ users, cutting manual HR coordination effort by 40%.",
      "Architected a PostgreSQL schema with 21+ tables and sequential business-rule gates controlling onboarding from offer signing through document verification to workspace activation, cutting processing errors by 30%.",
      "Implemented async background jobs with Redis/BullMQ for notifications, cutting delivery delays by 50%; integrated PDFKit/QR verification for automated offer, warning, and certificate generation.",
      "Containerized the system with Docker Compose across frontend, backend, PostgreSQL, Redis, and MinIO S3, cutting new-developer environment setup time by 70%."
    ],
    skills: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "BullMQ", "MinIO S3", "Docker Compose", "JWT RBAC"]
  },
  {
    id: "exp-2",
    role: "Software Development Intern",
    company: "Code Clause",
    location: "Remote",
    period: "Sep 2025 – Feb 2026",
    highlights: [
      "Developed scalable full-stack web applications using React.js, Node.js, Express.js, and MongoDB with a modular, reusable client-server architecture, applying data structures and algorithms to improve system efficiency by 30%.",
      "Optimized backend REST APIs and MongoDB queries through indexing and payload reduction, cutting average response time by 25%.",
      "Built a full-stack weather forecasting application using React.js and Node.js/Express.js, integrating a third-party weather API to fetch and display real-time, location-based weather data with a responsive UI.",
      "Diagnosed and resolved production bugs, configuration issues, and integration failures by reproducing errors, analyzing logs, and writing clear bug reports for the engineering team.",
      "Collaborated in Agile sprints using Git, GitHub, and Docker for version control and containerized deployment, improving release reliability and team productivity by 30%."
    ],
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "OpenWeather API", "Docker", "Git", "Agile Sprints"]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-heloix",
    title: "Heloix InternFlow – Intern Lifecycle Platform",
    date: "Aug 2026",
    description: "Centralized hiring, onboarding, internship lifecycle, and task governance platform built for Heloix Startup Minds Pvt. Ltd., supporting 2,000+ users with JWT RBAC across 4 roles.",
    bullets: [
      "20+ REST APIs with 4-role JWT RBAC (Super Admin, HR, Mentor, Intern) for 2,000+ active users",
      "PostgreSQL schema with 21+ tables and sequential business logic gates",
      "BullMQ Redis async queue for notifications, PDFKit automated offers, and QR code verification",
      "Full-stack containerization with Docker Compose, MinIO S3, and PostgreSQL"
    ],
    tech: ["React 18", "Node.js", "TypeScript", "Express", "PostgreSQL", "Redis", "BullMQ", "Docker Compose", "MinIO S3"],
    githubUrl: "https://github.com/7492958507",
    liveUrl: "https://github.com/7492958507",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "proj-1",
    title: "Amit Portfolio",
    date: "March 2026",
    description: "This portfolio is a modern, single-page personal website showcasing my experience, projects, skills, and achievements, with smooth animations and a responsive UI. It also includes a secure contact/referral form with bot protection, validation, and rate limiting so recruiters or collaborators can reach out safely.",
    bullets: [
      "Cloudflare Turnstile verification in frontend and server-side token validation",
      "IP-based fixed-window rate limiting for spam defense",
      "Zod schema for name/email/message and referral mode checks",
      "Implemented Anti-spam honeypot method with multi-tier validation"
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Resend", "Upstash Redis", "Zod", "Cloudfair Turnstile", "Framer Motion", "Vercel"],
    githubUrl: "https://github.com/7492958507/amit-portfolio",
    liveUrl: "https://7492958507.github.io/amit-portfolio/",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "proj-2",
    title: "Support Ticket System – AI-Powered Ticket Platform",
    date: "Jan 2026 – Feb 2026",
    description: "Full-stack intelligent support ticket triage and analytics management platform with Claude 3.5 Sonnet auto-classification and real-time metric aggregations.",
    bullets: [
      "Built a full-stack support ticket management system with REST APIs supporting ticket creation, search, filtering, and status updates.",
      "Integrated Claude 3.5 Sonnet LLM via the Anthropic API to auto-classify ticket category and priority from free-text descriptions, with error handling and manual override.",
      "Implemented PostgreSQL schema constraints and aggregation queries for real-time ticket analytics; containerized and deployed the full stack using Docker Compose."
    ],
    tech: ["React.js", "Django REST Framework", "PostgreSQL", "Docker", "Anthropic Claude API"],
    githubUrl: "https://github.com/7492958507/support-ticket-system",
    liveUrl: "https://github.com/7492958507/support-ticket-system",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "proj-3",
    title: "HireSense AI – Smart Recruitment & Resume Intelligence",
    date: "Dec 2025 – Jan 2026",
    description: "Full-stack AI-powered recruitment intelligence platform automating resume parsing, skill extraction, and candidate shortlisting with semantic match scoring.",
    bullets: [
      "Built a full-stack AI-powered recruitment platform automating resume parsing, job description matching, and candidate shortlisting.",
      "Implemented NLP-based skill extraction and similarity scoring to generate 0-100 resume-to-JD match scores, improving screening accuracy.",
      "Designed secure REST APIs with JWT authentication and role-based access control, powering separate recruiter and candidate dashboards."
    ],
    tech: ["React.js", "Node.js", "Python (FastAPI)", "MongoDB", "NLP"],
    githubUrl: "https://github.com/7492958507/smart-hire-ai",
    liveUrl: "https://github.com/7492958507/smart-hire-ai",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "proj-4",
    title: "Weather Forecasting Application",
    date: "Sep 2025 – Oct 2025",
    description: "Dynamic weather forecasting platform delivering real-time meteorological metrics, multi-day forecasting, and responsive interactive weather cards.",
    bullets: [
      "Built a full-stack weather forecasting application using React.js and Node.js/Express.js.",
      "Integrated third-party OpenWeather API to fetch and display real-time, location-based weather data.",
      "Designed responsive UI with dynamic weather themes, metric caching, and intuitive search autocomplete."
    ],
    tech: ["React.js", "Node.js", "Express.js", "OpenWeather API", "CSS3"],
    githubUrl: "https://github.com/7492958507",
    liveUrl: "https://github.com/7492958507",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

export const INITIAL_AWARDS: Award[] = [
  {
    id: "award-1",
    title: "LeetCode 1800 Rating & 400+ DSA",
    issuer: "LeetCode & GeeksforGeeks · 2025",
    date: "Continuous 2025",
    description: "Solved 400+ Data Structures and Algorithms problems on LeetCode and GeeksforGeeks, achieving a competitive rating of 1800 on LeetCode.",
    iconType: "code",
    badge: "Rating: 1800"
  },
  {
    id: "award-2",
    title: "Runner-up, Flipkart Grid 6.0 Hackathon",
    issuer: "Flipkart · 2024",
    date: "2024",
    description: "Secured runner-up recognition in Flipkart's flagship engineering hackathon competing against premier engineering institutions across India.",
    iconType: "trophy",
    badge: "Runner-up"
  },
  {
    id: "award-3",
    title: "Runner-up, Hackathon Escaped",
    issuer: "National Level Hackathon · 2023",
    date: "2023",
    description: "Recognized for architecting robust distributed software solutions with swift delivery milestones and resilient system architecture.",
    iconType: "award",
    badge: "Runner-up"
  },
  {
    id: "award-4",
    title: "Model Context Protocol (MCP) Server",
    issuer: "AI Tools & Infrastructure · 2025",
    date: "2025",
    description: "Engineered a custom Model Context Protocol (MCP) server extending AI assistant capabilities with custom integrations, tool endpoints, and secure local IPC.",
    iconType: "star",
    badge: "AI Tooling"
  }
];

export const INITIAL_SKILL_CATEGORIES = [
  {
    id: "languages",
    name: "Programming Languages",
    skills: ["Java", "C++", "SQL", "Python", "JavaScript"]
  },
  {
    id: "backend",
    name: "API & Backend Architecture",
    skills: ["Node.js", "Express.js", "Django REST Framework", "RESTful APIs", "Client-Server Architecture", "Microservices"]
  },
  {
    id: "frontend",
    name: "Frontend & UI Design",
    skills: ["React.js", "Redux", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"]
  },
  {
    id: "databases",
    name: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis"]
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    skills: ["AWS", "Microsoft Azure", "Docker", "Git", "GitHub", "CI/CD", "Linux"]
  },
  {
    id: "core-cs",
    name: "Core CS & AI Fundamentals",
    skills: ["DSA", "Operating Systems", "Computer Networks", "DBMS", "OOP", "System Design Basics", "Generative AI", "Machine Learning", "Agile"]
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: "cert-hackerrank-python",
    title: "Python (Basic) Skill Certification",
    issuer: "HackerRank",
    credentialId: "A7CCDCC65916",
    issueDate: "07 Feb, 2025",
    verificationUrl: "https://www.hackerrank.com/certificates/iframe/a7ccdcc65916",
    skills: ["Python", "Data Structures", "Algorithms", "Problem Solving", "Object-Oriented Programming"],
    imageLogo: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
    certificateImage: "./certificates/hackerrank-python.png",
    description: "Passed the official HackerRank skill assessment verifying core Python competence, algorithmic complexity, data structures, and clean coding practices."
  },
  {
    id: "cert-cutshort-html-css",
    title: "HTML/CSS Advanced Skill Certification",
    issuer: "Cutshort",
    credentialId: "103148",
    issueDate: "01 Sep, 2024",
    verificationUrl: "https://cutshort.io/certificate/103148",
    skills: ["HTML5", "CSS3", "Advanced UI Design", "Responsive Layouts", "Web Standards", "Modern CSS Grid/Flexbox"],
    imageLogo: "https://cutshort.io/favicon.ico",
    certificateImage: "./certificates/cutshort-html-css.png",
    description: "Certified with Advanced proficiency level in HTML5 and CSS3 through Cutshort's comprehensive technical benchmark assessment."
  },
  {
    id: "cert-unstop-mastercase",
    title: "Master Case Competitions",
    issuer: "Unstop",
    credentialId: "dbfac4f5-4506-4d4f-9c5a-ee874c3774c1",
    issueDate: "25 Oct, 2023",
    verificationUrl: "https://unstop.com/certificate-preview/dbfac4f5-4506-4d4f-9c5a-ee874c3774c1",
    skills: ["Case Study Analysis", "Problem Solving", "Analytical Thinking", "System Strategy", "Team Collaboration"],
    imageLogo: "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/branding-guidelines/logos/blue/icon.svg",
    certificateImage: "./certificates/unstop-mastercase.png",
    description: "Certificate of Participation representing MCKV Institute of Engineering (Team kumaramit05201) in Master Case Competitions organized by Unstop."
  },
  {
    id: "cert-unstop-xiaomi",
    title: "Xiaomi Ode2Code 3.0",
    issuer: "Xiaomi India (via Unstop)",
    credentialId: "5596af89-6ff2-4359-b3e3-76057ec4bb52",
    issueDate: "01 Nov, 2023",
    verificationUrl: "https://unstop.com/certificate-preview/5596af89-6ff2-4359-b3e3-76057ec4bb52",
    skills: ["Competitive Programming", "Data Structures", "Algorithms", "Optimization", "Speed Coding"],
    imageLogo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg",
    certificateImage: "./certificates/unstop-xiaomi-ode2code.png",
    description: "National engineering coding competition by Xiaomi India assessing high-performance algorithmic problem solving under timed tournament constraints."
  },
  {
    id: "cert-unstop-techsurf",
    title: "Techsurf 2023",
    issuer: "Contentstack (via Unstop)",
    credentialId: "aec68274-3b38-47b6-a297-3c827919b88d",
    issueDate: "12 Sep, 2023",
    verificationUrl: "https://unstop.com/certificate-preview/aec68274-3b38-47b6-a297-3c827919b88d",
    skills: ["Modern Web Architecture", "Contentstack Headless CMS", "Cloud Workflows", "Full Stack Development"],
    imageLogo: "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/branding-guidelines/logos/blue/icon.svg",
    certificateImage: "./certificates/unstop-techsurf.png",
    description: "Certificate of Participation in Techsurf 2023 national technology championship organized by enterprise CMS leader Contentstack on Unstop."
  },
  {
    id: "cert-unstop-flipkart-grid",
    title: "Flipkart GRiD 5.0 – Software Development Track",
    issuer: "Flipkart (via Unstop)",
    credentialId: "a5a52c0e-0afc-4771-b487-ff12278b73a1",
    issueDate: "09 Aug, 2023",
    verificationUrl: "https://unstop.com/certificate-preview/a5a52c0e-0afc-4771-b487-ff12278b73a1",
    skills: ["E-Commerce Architecture", "Software Engineering", "System Design", "Distributed Systems", "Algorithms"],
    imageLogo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg",
    certificateImage: "./certificates/unstop-flipkart-grid.png",
    description: "Represented MCKV Institute of Engineering as Team BIHAR TIGER in Level 1.1: E-Commerce & Tech Quiz of Flipkart GRiD 5.0 - Software Development Track organised by Flipkart."
  },
  {
    id: "cert-udemy-react",
    title: "React - Complete Developer Course with Hands-On Projects",
    issuer: "Udemy (YouAccel Training)",
    credentialId: "UC-d06fbf27-d95a-4225-b8ef-853139dd6102",
    issueDate: "25 Jun, 2025",
    verificationUrl: "https://udemy-certificate.s3.amazonaws.com/image/UC-d06fbf27-d95a-4225-b8ef-853139dd6102.jpg",
    skills: ["React.js", "React Hooks", "Redux", "Component Lifecycle", "State Management", "SPA Architecture"],
    imageLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    certificateImage: "./certificates/udemy-d06fbf27.jpg",
    description: "10.5 hours comprehensive training covering modern React development, hooks, state architecture, component styling, and hands-on production web applications."
  },
  {
    id: "cert-udemy-flask",
    title: "Python And Flask Framework Complete Course For Beginners",
    issuer: "Udemy (Horizon Tech)",
    credentialId: "UC-9754acad-2c12-45fd-9aef-98f642d5f1ec",
    issueDate: "25 Jun, 2025",
    verificationUrl: "https://udemy-certificate.s3.amazonaws.com/image/UC-9754acad-2c12-45fd-9aef-98f642d5f1ec.jpg",
    skills: ["Python", "Flask Framework", "RESTful APIs", "Routing & Templates", "Backend Architecture", "SQLite"],
    imageLogo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    certificateImage: "./certificates/udemy-9754acad.jpg",
    description: "12.5 hours in-depth course on Python backend development using the Flask micro-framework, database integration, REST APIs, and authentication."
  },
  {
    id: "cert-udemy-sentiment",
    title: "Flipkart Review Sentiment Analysis & Spam Comments Detection",
    issuer: "Udemy (Arunnachalam Shanmugaraajan)",
    credentialId: "UC-b61514ee-c726-4e68-b5c5-dc7ee00128e0",
    issueDate: "16 Jun, 2024",
    verificationUrl: "https://udemy-certificate.s3.amazonaws.com/image/UC-b61514ee-c726-4e68-b5c5-dc7ee00128e0.jpg",
    skills: ["Sentiment Analysis", "NLP", "Machine Learning", "Python", "Spam Detection", "Text Preprocessing"],
    imageLogo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg",
    certificateImage: "./certificates/udemy-b61514ee.jpg",
    description: "Hands-on machine learning implementation analyzing customer review sentiment, text feature extraction (TF-IDF), and spam classification models."
  },
  {
    id: "cert-udemy-chatgpt-circuit",
    title: "How to use AI ChatGPT to design an electronic circuit",
    issuer: "Udemy (Educational Engineering Team)",
    credentialId: "UC-9647575b-f49d-44ea-97b8-2cff1710a240",
    issueDate: "16 Jun, 2024",
    verificationUrl: "https://udemy-certificate.s3.amazonaws.com/image/UC-9647575b-f49d-44ea-97b8-2cff1710a240.jpg",
    skills: ["Generative AI", "ChatGPT", "Prompt Engineering", "Circuit Design", "Electronic Simulation", "Hardware Modeling"],
    imageLogo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    certificateImage: "./certificates/udemy-9647575b.jpg",
    description: "Specialized credential on leveraging generative AI and prompt workflows to model schematic circuit designs, component selection, and simulation."
  },
  {
    id: "cert-givemycert",
    title: "Technical Excellence Certificate",
    issuer: "GiveMyCertificate",
    credentialId: "3fa233af-6bfa-4344-945c-0ebe45cd85e7",
    issueDate: "2024",
    verificationUrl: "https://certificate.givemycertificate.com/c/3fa233af-6bfa-4344-945c-0ebe45cd85e7",
    skills: ["Software Engineering", "Technical Problem Solving", "System Development"],
    imageLogo: "https://certificate.givemycertificate.com/favicon.ico",
    certificateImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    description: "Verifiable professional certificate issued through GiveMyCertificate recognizing software engineering skills and development proficiency."
  },
  {
    id: "cert-internshala",
    title: "Artificial Intelligence (AI) Internship Selection",
    issuer: "Internshala (She Can Foundation)",
    credentialId: "51715kmvBqt",
    issueDate: "13 Aug, 2026",
    verificationUrl: "https://internshala.com/student/certificate/335472265/d1e7wepxygx",
    skills: ["Artificial Intelligence (AI)", "Machine Learning", "Python", "Data Analysis", "Model Evaluation"],
    imageLogo: "https://internshala.com/favicon.ico",
    certificateImage: "./certificates/internshala-ai-selection.png",
    description: "Certificate of Selection awarded to Amit Kumar (MCKV Institute of Engineering) for securing an Artificial Intelligence (AI) internship at She Can Foundation through Internshala."
  },
  {
    id: "cert-hcl-rf-antenna",
    title: "Emerging Trends in RF and Antenna Technologies",
    issuer: "HCL Technologies Ltd. & Adamas University (IETE)",
    credentialId: "HCL-IETE-2024-RF",
    issueDate: "20 Jun, 2024",
    verificationUrl: "https://www.hcltech.com/",
    skills: ["RF & Antenna Technologies", "Wireless Communication", "Telecommunications", "Hardware & Embedded Systems"],
    imageLogo: "https://upload.wikimedia.org/wikipedia/commons/9/95/HCL_Technologies_logo.svg",
    certificateImage: "./certificates/hcl-rf-antenna.png",
    description: "Industrial Guest Lecture & training by Sri. Debojyoti Choudhuri (DGM, Head-Wireless, RF & Antenna COE, HCL Technologies Ltd.) appreciating active technical participation."
  },
  {
    id: "cert-pvg-dsa-c",
    title: "Data Structure using C Certification",
    issuer: "PVG's College of Engineering, Nashik (SPPU)",
    credentialId: "CPIZG8-CE019899",
    issueDate: "27 Feb, 2022",
    verificationUrl: "https://pvgcoenashik.org/",
    skills: ["Data Structures", "C Programming", "Algorithms", "Memory Management", "Problem Solving"],
    imageLogo: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
    certificateImage: "./certificates/pvg-dsa-c.png",
    description: "Completed technical certification quiz on Data Structure using C organized by the Department of Electronics and Telecommunication Engineering with verified valid score."
  }
];

export const INITIAL_EDUCATION: Education = {
  institution: "MCKV Institute of Engineering, Kolkata, India",
  degree: "B.Tech, Electronics and Communication Engineering",
  period: "Aug 2021 – Jun 2025",
  cgpa: "8.0 / 10",
  location: "Kolkata, West Bengal, India",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Computer Networks",
    "Operating Systems",
    "Object Oriented Programming"
  ]
};

export const RAW_LATEX_RESUME = `%-------------------------
% Resume in Latex - ATS Optimized One Page Version
%------------------------
\\documentclass[letterpaper,10pt]{article}

\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[colorlinks=true, urlcolor=blue, linkcolor=blue]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-0.9in}
\\addtolength{\\textheight}{1.8in}

\\setlist[itemize]{itemsep=0pt, topsep=2pt, parsep=0pt}
\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-8pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-6pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & \\textbf{\\small #2} \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-1pt}
}

\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-7pt}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

\\begin{document}

%----------HEADING----------
\\begin{center}
    {\\Huge \\scshape Amit Kumar} \\\\[2pt]
    \\small
    Patna, Bihar, India \\ $|$ \\
    +91-7492958507 \\ $|$ \\
    \\href{mailto:krumar7890@gmail.com}{krumar7890@gmail.com} \\ $|$ \\
    \\href{https://www.linkedin.com/in/amit-kumar-b8ab6524a}{LinkedIn} \\ $|$ \\
    \\href{https://github.com/7492958507}{GitHub} \\ $|$ \\
    \\href{https://leetcode.com/u/theamit}{LeetCode}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
\\resumeSubHeadingListStart
  \\resumeSubheading
    {MCKV Institute of Engineering, Kolkata, India}{Aug 2021 -- Jun 2025}
    {B.Tech, Electronics and Communication Engineering}{CGPA: 8.0/10}
\\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\\section{Experience}
\\resumeSubHeadingListStart
  \\resumeSubheading
    {Heloix Startup Minds Pvt. Ltd.}{Aug 2026 -- Present}
    {Software Development}{Remote}
    \\resumeItemListStart
      \\resumeItem{Engineered a full-stack \\textbf{intern lifecycle management platform} using \\textbf{React 18}, \\textbf{TypeScript}, \\textbf{Node.js}, and \\textbf{Express}: \\textbf{20+ REST APIs} with \\textbf{JWT-based RBAC} across 4 roles supporting \\textbf{2,000+ users}, cutting manual HR coordination effort by \\textbf{40\\%}.}
      \\resumeItem{Architected a \\textbf{PostgreSQL} schema with \\textbf{21+ tables} and \\textbf{sequential business-rule gates} controlling onboarding from offer signing through document verification to workspace activation, cutting processing errors by \\textbf{30\\%}.}
      \\resumeItem{Implemented async background jobs with \\textbf{Redis}/\\textbf{BullMQ} for notifications, cutting delivery delays by \\textbf{50\\%}; integrated \\textbf{PDFKit}/\\textbf{QR} verification for automated offer, warning, and certificate generation.}
      \\resumeItem{Containerized the system with \\textbf{Docker Compose} across frontend, backend, PostgreSQL, Redis, and \\textbf{MinIO S3}, cutting new-developer environment setup time by \\textbf{70\\%}.}
    \\resumeItemListEnd

  \\vspace{6pt}
  \\resumeSubheading
    {Code Clause}{Sep 2025 -- Feb 2026}
    {Software Development Intern}{Remote}
    \\resumeItemListStart
      \\resumeItem{Developed scalable full-stack web applications using \\textbf{React.js}, \\textbf{Node.js}, \\textbf{Express.js}, and \\textbf{MongoDB} with a modular, reusable \\textbf{client-server architecture}, applying \\textbf{data structures and algorithms} to improve system efficiency by \\textbf{30\\%}.}
      \\resumeItem{Optimized backend \\textbf{REST APIs} and \\textbf{MongoDB} queries through indexing and payload reduction, cutting average response time by \\textbf{25\\%}.}
      \\resumeItem{Built a full-stack weather forecasting application using \\textbf{React.js} and \\textbf{Node.js/Express.js}, integrating a third-party weather \\textbf{API} to fetch and display real-time, location-based weather data with a responsive UI.}
      \\resumeItem{Diagnosed and resolved production bugs, configuration issues, and integration failures by reproducing errors, analyzing logs, and writing clear bug reports for the engineering team.}
      \\resumeItem{Collaborated in \\textbf{Agile} sprints using \\textbf{Git}, \\textbf{GitHub}, and \\textbf{Docker} for version control and containerized deployment, improving release reliability and team productivity by \\textbf{30\\%}.}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd

%-----------SKILLS-----------
\\section{Technical Skills}
\\textbf{Languages:} Java, JavaScript, Python, SQL, C++ \\\\
\\textbf{Frontend:} React.js, Redux, HTML5, CSS3, Responsive Design \\\\
\\textbf{Backend:} Node.js, Express.js, Django REST Framework, RESTful APIs, Client-Server Architecture, Microservices \\\\
\\textbf{Databases:} MongoDB, PostgreSQL \\\\
\\textbf{Cloud \\& DevOps:} AWS, Microsoft Azure, Docker, Git, GitHub, CI/CD, Linux \\\\
\\textbf{Core Concepts:} DSA, Operating Systems, Computer Networks, DBMS, OOP, System Design Basics, Debugging, Machine Learning, Generative AI, Data Analytics, Agile

%-----------PROJECTS-----------
\\section{Projects}
\\resumeSubHeadingListStart
  \\resumeSubheading
      {Support Ticket System -- AI-Powered Ticket Management Platform}{Jan 2026 -- Feb 2026}
      {GitHub: https://github.com/7492958507/support-ticket-system}{}
      \\resumeItemListStart
        \\resumeItem{Built a full-stack \\textbf{support ticket management system} with REST APIs supporting ticket creation, search, filtering, and status updates.}
        \\resumeItem{Integrated \\textbf{Claude 3.5 Sonnet LLM via the Anthropic API} to auto-classify ticket category and priority from free-text descriptions, with error handling and manual override.}
        \\resumeItem{Implemented \\textbf{PostgreSQL schema constraints and aggregation queries} for real-time ticket analytics; containerized and deployed the full stack using \\textbf{Docker Compose}.}
        \\resumeItem{\\textbf{Tech Stack:} React.js, Django REST Framework, PostgreSQL, Docker, Anthropic Claude API}
      \\resumeItemListEnd

  \\vspace{6pt}
  \\resumeSubheading
      {HireSense AI -- Smart Recruitment \\& Resume Intelligence Platform}{Dec 2025 -- Jan 2026}
      {GitHub: https://github.com/7492958507/smart-hire-ai}{}
      \\resumeItemListStart
        \\resumeItem{Built a full-stack \\textbf{AI-powered recruitment platform} automating resume parsing, job description matching, and candidate shortlisting.}
        \\resumeItem{Implemented \\textbf{NLP-based skill extraction and similarity scoring} to generate \\textbf{0-100 resume-to-JD match scores}, improving screening accuracy.}
        \\resumeItem{Designed secure REST APIs with \\textbf{JWT authentication and role-based access control}, powering separate recruiter and candidate dashboards.}
        \\resumeItem{\\textbf{Tech Stack:} React.js, Node.js, Python (FastAPI), MongoDB, NLP}
      \\resumeItemListEnd
\\resumeSubHeadingListEnd

%-----------ACHIEVEMENTS-----------
\\section{Achievements}
\\resumeItemListStart
  \\resumeItem{Solved \\textbf{400+ Data Structures and Algorithms problems} on LeetCode and GeeksforGeeks, achieving a rating of \\textbf{1800} on LeetCode.}
  \\resumeItem{Runner-up, \\textbf{Flipkart Grid 6.0 Hackathon (2024)}; Runner-up, \\textbf{Hackathon Escaped (2023)}.}
  \\resumeItem{Completed 10+ competitive programming contests on CodeChef; participated in HackerEarth hackathons.}
  \\resumeItem{Built an \\textbf{MCP (Model Context Protocol) server/tool} to extend AI assistant capabilities with custom integrations.}
\\resumeItemListEnd

%-----------CERTIFICATIONS-----------
\\section{Certifications}
\\resumeItemListStart
  \\resumeItem{\\textbf{Foundations: Data, Data, Everywhere} -- Google Data Analytics Certificate, Coursera -- Completed August 2026}
  \\resumeItem{\\textbf{AWS Cloud Practitioner Essentials} (Udemy Course) -- Certificate (2024)}
  \\resumeItem{\\textbf{100 Days of Code: Python Pro Bootcamp} -- Certificate (2024)}
  \\resumeItem{\\textbf{JavaScript, jQuery \\& React Bootcamp} -- Certificate (2024)}
\\resumeItemListEnd

\\end{document}`;
