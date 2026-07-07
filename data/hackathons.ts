export type Hackathon = {
  title: string;
  description: string;
  dates: string;
  location: string;
  link?: string;
  highlight?: string;
};

export const hackathonsIntro =
  "During my time in university I've attended hackathon after hackathon — people from around the country coming together to build incredible things in 2–3 days. It's eye-opening to see what a group of motivated, passionate people can bring to life over a weekend.";

export const hackathons: Hackathon[] = [
  {
    title: "Smart India Hackathon 2024",
    description:
      "The Government of India's nationwide innovation challenge — solving real-world problem statements with technology.",
    dates: "Aug – Sept 2024",
    location: "Gujarat Technological University, Ahmedabad",
    link: "https://sih.gov.in/",
  },
  {
    title: "Hack the Mountain 5.0",
    description:
      "A hybrid hackathon bringing global innovators together to compete on tech challenges, with prizes worth ₹30 lakhs.",
    dates: "Sept 14 – 15, 2024",
    location: "Marwadi University, Rajkot",
    link: "https://hackthemountain.tech/",
  },
  {
    title: "HackOut'24",
    description:
      "DA-IICT's flagship hackathon — a weekend of building with teams from across the country.",
    dates: "Aug 9 – 11, 2024",
    location: "DA-IICT, Gandhinagar",
    link: "https://unstop.com/hackathons/hackout24-dhirubhai-ambani-institute-of-information-and-communication-technology-da-iict-gandhinagar-1095336",
  },
  {
    title: "Hack the Tank 2.0",
    description:
      "SVNIT Surat's build-and-pitch hackathon spanning a full weekend of shipping.",
    dates: "Mar 23 – 24, 2024",
    location: "SVNIT, Surat",
    link: "https://hack-the-tank-2.devfolio.co/",
  },
  {
    title: "Hack the Spring 2024",
    description:
      "A multi-day hackathon at Government Engineering College Gandhinagar.",
    dates: "Mar 1 – 4, 2024",
    location: "GECG, Gandhinagar",
    link: "https://hackthespring.tech/",
  },
  {
    title: "New India Vibrant Hackathon 2023 — Finale",
    description:
      "SSIP Gujarat's state-level hackathon finale, where Rule Mitra earned a ₹50,000 SSIP grant.", // TODO: confirm exact result wording
    dates: "Nov 25, 2023",
    location: "PDEU, Gandhinagar",
    link: "https://ssipgujarat.in/hackathon2023/",
    highlight: "₹50,000 SSIP grant",
  },
  {
    title: "New India Vibrant Hackathon 2023 — Regional Round",
    description:
      "The regional qualifying round that sent the team through to the state finale.",
    dates: "Nov 4, 2023",
    location: "Anant National University, Ahmedabad",
    link: "https://ssipgujarat.in/hackathon2023/",
  },
  {
    title: "TechXIt 2022",
    description: "My first hackathon — where the building-things habit started.",
    dates: "Oct 1, 2022",
    location: "VGEC, Chandkheda",
  },
];
