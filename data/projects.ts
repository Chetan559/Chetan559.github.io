export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  mark: "smartsharma" | "documind" | "deepfake" | "mosdac";
  accent: "blue" | "amber";
};

export const projects: Project[] = [
  {
    slug: "smartsharma",
    title: "SmartSharma",
    tagline: "AI Web IDE",
    description:
      "An AI-powered web IDE that turns natural-language prompts into working applications — describe what you want, watch it get scaffolded, edited, and previewed live.",
    tech: ["React", "Flask", "GPT-4"],
    github: "https://github.com/Chetan559/SmartSharma",
    live: "https://smart-sharma.vercel.app",
    mark: "smartsharma",
    accent: "blue",
  },
  {
    slug: "documind",
    title: "DocuMind",
    tagline: "Document Intelligence Platform",
    description:
      "A document intelligence platform that ingests messy real-world files, builds a retrieval layer over them, and answers questions with citations — including cited sources in generated PDF reports.",
    tech: ["Python", "RAG", "Vector Search", "LLMs"],
    github: "https://github.com/Chetan559", // TODO: repo link
    mark: "documind",
    accent: "amber",
  },
  {
    slug: "deepfake",
    title: "DeepFake Detection",
    tagline: "Media Forensics System",
    description:
      "A deepfake detection system built on an Xception-based CNN that flags manipulated video and image content with frame-level analysis.",
    tech: ["Python", "TensorFlow", "Xception"],
    github: "https://github.com/Chetan559/Deepfake-Detection",
    mark: "deepfake",
    accent: "blue",
  },
  {
    slug: "mosdac",
    title: "MOSDAC Assist",
    tagline: "Satellite Data Assistant",
    description:
      "An AI help-bot for ISRO's MOSDAC portal that guides researchers through satellite and meteorological data products using conversational retrieval.",
    tech: ["Python", "RAG", "NLP"],
    github: "https://github.com/Chetan559", // TODO: repo link
    mark: "mosdac",
    accent: "amber",
  },
];
