export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "video";
      /** YouTube video id, e.g. "dQw4w9WgXcQ" — rendered as an embed */
      youtubeId?: string;
      /** Self-hosted video path under /public, e.g. "/videos/demo.mp4" */
      src?: string;
      caption?: string;
    }
  | { type: "quote"; text: string; by?: string };

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  /** Header background image for the post and its listing card */
  cover: string;
  date: string; // ISO yyyy-mm-dd
  readTime: string;
  tags: string[];
  accent: "blue" | "amber";
  blocks: BlogBlock[];
};

// TODO(chetan): sample posts — replace copy, covers, and media with real content.
export const blogs: Blog[] = [
  {
    slug: "rag-pipelines-that-dont-hallucinate",
    title: "Building RAG Pipelines That Don't Hallucinate",
    excerpt:
      "Chunking, retrieval evaluation, and guardrails — what I learned shipping retrieval-augmented generation to real users.",
    cover: "/images/gallery/photo3.jpg", // TODO: real cover image
    date: "2026-06-20",
    readTime: "7 min read",
    tags: ["AI/ML", "RAG", "LLMs"],
    accent: "blue",
    blocks: [
      {
        type: "paragraph",
        text: "Everyone's first RAG demo works. You embed a PDF, ask a question, get a decent answer, and ship a screenshot to the team chat. Then real users show up with real documents, and the same pipeline starts answering questions with confident nonsense. This post is about the gap between the demo and production.",
      },
      { type: "heading", text: "Chunking is a product decision" },
      {
        type: "paragraph",
        text: "The single biggest lever I've found isn't the model — it's how you split documents. Fixed-size chunks are easy but they cut tables in half and orphan section headers from their content. Structure-aware chunking (split on headings, keep tables atomic, carry the section title into every chunk as context) fixed more bad answers for us than any prompt tweak.",
      },
      {
        type: "image",
        src: "/images/gallery/photo5.jpg", // TODO: real diagram
        alt: "Whiteboard sketch of a chunking strategy",
        caption: "Structure-aware chunking: headings travel with their content.",
      },
      { type: "heading", text: "Measure retrieval before you blame the model" },
      {
        type: "paragraph",
        text: "When an answer is wrong, the retrieval layer is guilty until proven innocent. We built a small eval set — fifty real questions with hand-labelled source passages — and tracked recall@k on every pipeline change. Half of our 'hallucinations' were really retrieval misses: the model never saw the right passage, so it improvised.",
      },
      {
        type: "quote",
        text: "A model that never sees the right context isn't hallucinating — it's doing exactly what you asked, with the wrong ingredients.",
      },
      { type: "heading", text: "Guardrails that actually hold" },
      {
        type: "paragraph",
        text: "Three things that survived contact with users: force the model to cite chunk ids and reject answers whose citations don't exist; add an 'I don't know' path with an explicit confidence check; and log every question-answer-context triple so bad answers become tomorrow's eval cases. Citations even carry through to our generated PDF reports, so a claim is traceable end to end.",
      },
    ],
  },
  {
    slug: "from-prompt-to-product",
    title: "From Prompt to Product: NL-to-Web-App Converters",
    excerpt:
      "What it takes to turn a plain-English sentence into a running web app — scaffolding, constraints, and the demo I keep coming back to.",
    cover: "/images/gallery/photo9.jpg", // TODO: real cover image
    date: "2026-05-11",
    readTime: "5 min read",
    tags: ["Product", "LLMs", "SmartSharma"],
    accent: "amber",
    blocks: [
      {
        type: "paragraph",
        text: "SmartSharma started as a hackathon dare: type 'a habit tracker with streaks' and watch a working app appear. Getting from that party trick to something dependable taught me that the hard part isn't generation — it's constraint.",
      },
      { type: "heading", text: "Constrain the output space" },
      {
        type: "paragraph",
        text: "Free-form code generation fails in creative ways. What worked was giving the model a fixed skeleton — a component library, a routing convention, a state pattern — and asking it to fill in the blanks. The model writes less code, and the code it writes has fewer places to be wrong.",
      },
      {
        type: "video",
        youtubeId: "dQw4w9WgXcQ", // TODO: replace with a real demo video id
        caption: "Demo: from a one-line prompt to a deployed app.",
      },
      { type: "heading", text: "Preview loops beat perfect generation" },
      {
        type: "paragraph",
        text: "Users forgive a wrong first draft if the fix loop is fast. Live preview plus 'change the button to amber'-style follow-ups turned out to matter far more than nailing the app on the first prompt. Product guy lesson: optimize the loop, not the shot.",
      },
    ],
  },
  {
    slug: "what-origami-taught-me-about-debugging",
    title: "What Origami Taught Me About Debugging",
    excerpt:
      "Folding paper and fixing code are the same hobby: both punish force and reward finding the crease that's already there.",
    cover: "/images/gallery/photo14.jpg", // TODO: real cover image
    date: "2026-04-02",
    readTime: "4 min read",
    tags: ["Off Topic", "Origami"],
    accent: "blue",
    blocks: [
      {
        type: "paragraph",
        text: "I picked up origami as a way to stop doomscrolling between builds. A few hundred cranes later, it's changed how I debug.",
      },
      { type: "heading", text: "The crease pattern is the stack trace" },
      {
        type: "paragraph",
        text: "A finished model hides its structure, but unfold it and the crease pattern tells you the exact order things happened. Good logs are the same: you don't debug the finished behavior, you unfold it and read the folds.",
      },
      {
        type: "image",
        src: "/images/gallery/photo20.jpg", // TODO: real photo of a fold
        alt: "An origami model mid-fold",
        caption: "Every fold constrains the next one — like every commit.",
      },
      {
        type: "paragraph",
        text: "The other lesson: force never works. If a fold won't close, some earlier fold is wrong, and pressing harder just tears the paper. I've stopped 'pressing harder' on bugs at 1 a.m. — I unfold instead.",
      },
    ],
  },
];

export function getBlog(slug: string) {
  return blogs.find((b) => b.slug === slug);
}
