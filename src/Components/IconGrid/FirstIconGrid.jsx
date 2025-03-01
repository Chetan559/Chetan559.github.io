import React from "react";
import { BiLogoVisualStudio, BiLogoWindows } from "react-icons/bi";
import { FaEdge, FaChrome, FaBrave } from "react-icons/fa6";

const FirstIconGrid = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-5">
      <a
        key="visualstudio"
        title="Visual Studio"
        href="https://visualstudio.microsoft.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        {/* Directly using the icon without dynamic mapping */}
        <BiLogoVisualStudio size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">
          Visual Studio
        </p>
      </a>

      <a
        key="windows"
        title="Windows"
        href="https://www.microsoft.com/windows"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <BiLogoWindows size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Windows</p>
      </a>

      <a
        key="chrome"
        title="Chrome"
        href="https://www.google.com/chrome/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <FaChrome size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Chrome</p>
      </a>
      <a
        key="brave"
        title="Brave"
        href="https://brave.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <FaBrave size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Brave</p>
      </a>
      <a
        key="edge"
        title="Edge"
        href="https://www.microsoft.com/edge"
        rel="noopener noreferrer"
        target="_blank"
        className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-gray-800 shadow dark:shadow-md p-[2.35rem] border border-transparent hover:border-gray-200 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:scale-125 active:scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-600 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      >
        <FaEdge size={32} className="h-8 w-8 text-2xl" />
        <p className="absolute bottom-3 text-[10px] select-none">Edge</p>
      </a>
    </div>
  );
};

export default FirstIconGrid;
