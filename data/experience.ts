export type Experience = {
  role: string;
  company: string;
  type: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
  accent: "blue" | "amber";
};

// TODO(chetan): dates and some bullets below are drafted placeholders — review and correct.
export const experience: Experience[] = [
  {
    role: "AI/ML Engineer Intern",
    company: "Bacancy Services",
    type: "Internship",
    start: "Jan 2026", // TODO: confirm start month
    end: "Present",
    bullets: [
      "Building production RAG pipelines end-to-end: document chunking, embedding strategies, retrieval evaluation, and hallucination guardrails.",
      "Developing a natural-language-to-web-app converter that turns plain-English prompts into deployable, working UIs.",
      "Integrating LLM services with existing product APIs and shipping features behind real user traffic.",
    ],
    tech: ["Python", "LangChain", "Vector DBs", "GPT-4", "React"],
    accent: "blue",
  },
  {
    role: "Software Engineer Intern",
    company: "SoHo Dragon Solutions",
    type: "Internship",
    start: "2025", // TODO: confirm role title, dates, and scope
    end: "2025",
    bullets: [
      "Worked on client-facing solutions with a focus on data-driven features and automation.", // TODO: replace with real scope
      "Collaborated with a distributed team across time zones with async-first communication.",
    ],
    tech: ["Python", "SQL", "JavaScript"],
    accent: "amber",
  },
  {
    role: "Tech Lead",
    company: "VGEC · Hackathon & Project Teams", // TODO: confirm org name
    type: "Leadership",
    start: "2023",
    end: "Present",
    bullets: [
      "Led multi-member dev teams through hackathons and shipped award-winning builds, including a ₹50,000 SSIP win.",
      "Owned code reviews, architecture decisions, and scope cuts to hit demo deadlines.",
      "Mentored juniors on Git workflows, API design, and shipping over polishing.",
    ],
    tech: ["Team Leadership", "Code Review", "System Design"],
    accent: "blue",
  },
];
