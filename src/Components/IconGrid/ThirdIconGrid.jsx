import React from "react";
import {
  SiCanva,
  SiExcalidraw,
  SiTelegram,
  SiGoogledrive,
} from "react-icons/si";
import { FaDiscord, FaGithub } from "react-icons/fa";

function ThirdIconGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-5">
      {/* Canva */}
      <a
        key="canva"
        title="Canva"
        href="https://www.canva.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiCanva size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Canva</p>
      </a>

      {/* Google Drive */}
      <a
        key="googledrive"
        title="Google Drive"
        href="https://www.google.com/drive/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiGoogledrive size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">
          Google Drive
        </p>
      </a>

      {/* Discord */}
      <a
        key="discord"
        title="Discord"
        href="https://discord.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <FaDiscord size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Discord</p>
      </a>

      {/* Telegram */}
      <a
        key="telegram"
        title="Telegram"
        href="https://telegram.org/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiTelegram size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Telegram</p>
      </a>

      {/* Excalidraw */}
      <a
        key="excalidraw"
        title="Excalidraw"
        href="https://excalidraw.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <SiExcalidraw size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Excalidraw</p>
      </a>

      {/* GitHub */}
      <a
        key="github"
        title="GitHub"
        href="https://github.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <FaGithub size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">GitHub</p>
      </a>
    </div>
  );
}

export default ThirdIconGrid;
