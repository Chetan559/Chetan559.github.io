export type Resume = {
  label: string;
  file: string;
  accent: "blue" | "amber";
  blurb: string;
  highlights: { label: string; featured?: boolean }[];
};

export const resumes: Resume[] = [
  {
    label: "General Resume",
    file: "/Chetan_Sharma_Resume.pdf",
    accent: "blue",
    blurb: "Full-stack + AI engineering, leadership, and hackathon wins.",
    highlights: [
      { label: "Citations in PDF generation", featured: true },
      { label: "RAG pipelines" },
      { label: "Tech leadership" },
    ],
  },
  {
    label: "Data Science Resume",
    file: "/Resume_ChetanSharma_DataScience.pdf",
    accent: "amber",
    blurb: "ML systems, model evaluation, and data engineering focus.",
    highlights: [
      { label: "Citations in PDF generation", featured: true },
      { label: "Deep learning" },
      { label: "Retrieval evaluation" },
    ],
  },
];
