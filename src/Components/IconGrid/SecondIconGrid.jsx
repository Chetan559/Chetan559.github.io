import React from "react";
import { FaReact } from "react-icons/fa6"; // React
import {
  SiTailwindcss,
  SiJupyter,
  SiAnaconda,
  SiNotion,
  SiTensorflow,
  SiPrettier,
  SiPytorch,
  SiPostman,
} from "react-icons/si"; // Tailwind CSS
import { FaGitSquare, FaPython, FaGoogle } from "react-icons/fa"; // Git
import { DiNpm } from "react-icons/di";

function SecondIconGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-5">
      {/* React */}
      <a
        key="react"
        title="React.js"
        href="https://reactjs.org/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <FaReact size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">React</p>
      </a>

      {/* Tailwind CSS */}
      <a
        key="tailwindcss"
        title="Tailwind CSS"
        href="https://tailwindcss.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiTailwindcss size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">
          Tailwind CSS
        </p>
      </a>

      {/* Git */}
      <a
        key="git"
        title="Git"
        href="https://git-scm.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <FaGitSquare size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Git</p>
      </a>

      {/* NPM */}
      <a
        key="npm"
        title="NPM"
        href="https://www.npmjs.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <DiNpm size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">NPM</p>
      </a>

      {/* Python */}
      <a
        key="python"
        title="Python"
        href="https://www.python.org/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <FaPython size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Python</p>
      </a>

      {/* Anaconda */}
      <a
        key="anaconda"
        title="Anaconda"
        href="https://www.anaconda.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiAnaconda size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Anaconda</p>
      </a>

      {/* Jupyter */}
      <a
        key="jupyter"
        title="Jupyter"
        href="https://jupyter.org/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiJupyter size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Jupyter</p>
      </a>

      {/* Google Colab */}
      <a
        key="colab"
        title="Google Colab"
        href="https://colab.research.google.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <FaGoogle size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Colab</p>
      </a>

      {/* Postman */}
      <a
        key="postman"
        title="Postman"
        href="https://www.postman.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiPostman size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Postman</p>
      </a>

      {/* Notion */}
      <a
        key="notion"
        title="Notion"
        href="https://www.notion.so/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiNotion size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Notion</p>
      </a>

      {/* Prettier */}
      <a
        key="prettier"
        title="Prettier"
        href="https://prettier.io/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiPrettier size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Prettier</p>
      </a>

      {/* TensorFlow */}
      <a
        key="tensorflow"
        title="TensorFlow"
        href="https://www.tensorflow.org/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiTensorflow size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">TensorFlow</p>
      </a>

      {/* PyTorch */}
      <a
        key="pytorch"
        title="PyTorch"
        href="https://pytorch.org/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiPytorch size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">PyTorch</p>
      </a>
    </div>
  );
}

export default SecondIconGrid;
