import React from "react";
import profile from "../../assets/Photo.png";
import profi from "../../assets/project1.png";
import "./Hero.css";

const techStacks = [
  {
    name: "React",
    color: "#61DBFB",
    svgPath:
      "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346...",
    // Add more SVG path data as needed
  },
  {
    name: "TypeScript",
    color: "#007acc",
    svgPath: "M1.125...",
    // Add more SVG path data as needed
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    svgPath: "M0...",
    // Add more SVG path data as needed
  },
  {
    name: "NextJS",
    color: "#000000",
    svgPath: "M11.5725...",
    // Add more SVG path data as needed
  },
  {
    name: "Tailwindcss",
    color: "#20c8e9",
    svgPath: "M12...",
    // Add more SVG path data as needed
  },
  {
    name: "Sanity",
    color: "#ea4a36",
    svgPath: "M7...",
    // Add more SVG path data as needed
  },
];

function Hero() {
  return (
    <div className="container m-auto px-4 pt-12 pb-12 sm:pt-20 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col sm:flex-row gap-6 text-center sm:text-left">
      <div className="flex-1">
        <h2 className="font-bold text-4xl mt-1 gradient-text">
          I'm Chetan Sharma,
        </h2>
        <h2 className="text-gray-700 dark:text-gray-200 mb-2">
          <span className="relative inline-block group overflow-hidden">
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-green-500 after:bg-gradient-to-r block transform transition-transform duration-500 group-hover:translate-y-full">
              Web developer{" "}
            </span>
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-green-500 after:bg-gradient-to-r absolute inset-0 block transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
              And a Student
            </span>
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-3 transform transition-transform duration-300 hover:scale-105 w-full sm:w-auto">
          I'm a third-year student at VGEC who loves coding and data science.
          {/* Change this text as needed */}
        </p>

        <div className="mb-4 mt-6">
          <div>My favorite tech stacks &nbsp;</div>
          <div className="mt-2">
            {techStacks.map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center space-x-2 mr-2 transform transition-transform duration-300 hover:scale-110"
              >
                <svg
                  stroke="currentColor"
                  fill={tech.color}
                  strokeWidth="0"
                  role="img"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={tech.svgPath}></path>
                </svg>
                <p>{tech.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Article Section */}
        <article className="rounded-xl border-2 border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 mt-6">
          <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
            <div>
              <h3 className="font-medium sm:text-lg text-gray-900 dark:text-gray-100">
                <a href="https://jokeapi.dev/" className="hover:underline">
                  Random Programming Joke
                </a>
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Loading joke...
              </p>
              <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                <p className="hidden sm:block sm:text-xs text-gray-500 dark:text-gray400">
                  Joke API
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Buttons Section */}
        <div className="flex gap-2 mt-10 ">
          <button className="flex-grow text-sm py-3 bg-gradient-to-t from-blue500 rounded-full to-cyan500 hover:from-blue700 hover:to-cyan700">
            Resume
          </button>
          <button className="flex-grow text-sm py3 bg-gradient-to-t from-blue500 rounded-full to-cyan500 hover:from-blue700 hover:to-cyan700">
            Contact
          </button>
        </div>
      </div>

      {/* Flip Card Section - Positioned on the right for larger screens */}
      <div className="flex justify-center  flex-shrink mt-6 mb6 sm:w-auto">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={profile} alt="Avatar" />
            </div>
            <div className="flip-card-back">
              <img src={profi} alt="Avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
