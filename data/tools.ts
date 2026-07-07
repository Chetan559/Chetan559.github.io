import type { IconType } from "react-icons";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaBrave, FaChrome, FaEdge, FaWindows } from "react-icons/fa6";
import {
  SiAnaconda,
  SiDiscord,
  SiExcalidraw,
  SiGit,
  SiGithub,
  SiGooglecolab,
  SiGoogledrive,
  SiJupyter,
  SiNotion,
  SiNpm,
  SiPostman,
  SiPrettier,
  SiPython,
  SiPytorch,
  SiReact,
  SiTailwindcss,
  SiTelegram,
  SiTensorflow,
} from "react-icons/si";

export type Tool = {
  name: string;
  href: string;
  /** Falls back to a first-letter tile when no icon is available */
  icon?: IconType;
};

export type ToolGroup = {
  title: string;
  blurb: string;
  tools: Tool[];
};

export const toolGroups: ToolGroup[] = [
  {
    title: "System",
    blurb: "The OS and browsers everything runs in.",
    tools: [
      { name: "Windows", href: "https://www.microsoft.com/windows", icon: FaWindows },
      { name: "Visual Studio", href: "https://visualstudio.microsoft.com/", icon: BiLogoVisualStudio },
      { name: "Chrome", href: "https://www.google.com/chrome/", icon: FaChrome },
      { name: "Brave", href: "https://brave.com/", icon: FaBrave },
      { name: "Edge", href: "https://www.microsoft.com/edge", icon: FaEdge },
    ],
  },
  {
    title: "Coding Tools",
    blurb: "What I code, train, and debug with on a daily basis.",
    tools: [
      { name: "React.js", href: "https://reactjs.org/", icon: SiReact },
      { name: "Tailwind CSS", href: "https://tailwindcss.com/", icon: SiTailwindcss },
      { name: "Git", href: "https://git-scm.com/", icon: SiGit },
      { name: "NPM", href: "https://www.npmjs.com/", icon: SiNpm },
      { name: "Python", href: "https://www.python.org/", icon: SiPython },
      { name: "Anaconda", href: "https://www.anaconda.com/", icon: SiAnaconda },
      { name: "Jupyter", href: "https://jupyter.org/", icon: SiJupyter },
      { name: "Google Colab", href: "https://colab.research.google.com/", icon: SiGooglecolab },
      { name: "Postman", href: "https://www.postman.com/", icon: SiPostman },
      { name: "Notion", href: "https://www.notion.so/", icon: SiNotion },
      { name: "Prettier", href: "https://prettier.io/", icon: SiPrettier },
      { name: "TensorFlow", href: "https://www.tensorflow.org/", icon: SiTensorflow },
      { name: "PyTorch", href: "https://pytorch.org/", icon: SiPytorch },
    ],
  },
  {
    title: "Software & Applications",
    blurb: "Design, collaboration, and everything around the code.",
    tools: [
      { name: "GitHub", href: "https://github.com/", icon: SiGithub },
      { name: "Excalidraw", href: "https://excalidraw.com/", icon: SiExcalidraw },
      { name: "Canva", href: "https://www.canva.com/" },
      { name: "Google Drive", href: "https://www.google.com/drive/", icon: SiGoogledrive },
      { name: "Discord", href: "https://discord.com/", icon: SiDiscord },
      { name: "Telegram", href: "https://telegram.org/", icon: SiTelegram },
    ],
  },
];
