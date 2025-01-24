import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Footer = () => {
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.weatherapi.com/v1/current.json",
          {
            params: {
              key: "5f577970c4f346129ef175025252401",
              q: "Ahmedabad",
              aqi: "no",
            },
          }
        );

        // Extract the temperature in Celsius (temp_c)
        setTemp(response.data.current.temp_c);
      } catch (err) {
        setError("Error fetching data");
      }
    };

    fetchWeather();
  }, []);

  return (
    <footer className="flex flex-col justify-center items-start max-w-[45rem] mx-auto w-full mb-8 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
      {/* Top Section */}
      <div className="w-full flex justify-between items-center mb-8">
        {/* Spotify Widget */}
        <div className="relative flex flex-row-reverse items-center sm:flex-row mb-8 space-x-0 sm:space-x-2 w-full transform transition-transform duration-300 hover:scale-105 group">
          <svg className="h-5 w-5 ml-auto mt-[-2px]" viewBox="0 0 168 168">
            <path
              fill="#1ED760"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
          <div className="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
            <p className="capsize text-gray-800 dark:text-gray-200 font-medium">
              Not Playing
            </p>
            <span className="capsize mx-2 text-gray-500 dark:text-gray-300 hidden sm:block">
              {" "}
              –{" "}
            </span>
            <p className="capsize text-gray-500 dark:text-gray-300 max-w-max truncate">
              Spotify
            </p>
          </div>
        </div>

        {/* Temperature Button */}
        <div className="relative group">
          <button className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-200 transition-colors duration-300">
            {temp}°C
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />

      {/* Footer Links */}
      <div className="w-full max-w-[45rem] grid grid-cols-1 sm:grid-cols-4 gap-4 pb-16">
        {/* Column 1 */}
        <div className="flex flex-col space-y-4">
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/guestbook"
          >
            Guestbook
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/about"
          >
            About
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/contact"
          >
            Contact
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/projects"
          >
            Projects
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/support"
          >
            Support
          </Link>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-4">
          <Link
            className="text-gray-400 hover:text-gray-500 transition cursor-newtab"
            target="_blank"
            rel="noopener noreferrer nofollow"
            to="https://newlink6.com"
          >
            Analytics
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/blog"
          >
            Blogs
          </Link>
          <Link
            className="text-gray-500 hover:text-gray-600 transition"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/utilities"
          >
            Utilities
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/colophon"
          >
            Colophon
          </Link>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col space-y-4">
          <Link
            className="text-gray-400 hover:text-gray-500 transition cursor-newtab"
            target="_blank"
            rel="noopener noreferrer nofollow"
            to="https://github.com/Chetan559"
          >
            GitHub
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition cursor-newtab"
            target="_blank"
            rel="noopener noreferrer nofollow"
            to="https://www.linkedin.com/in/sharma-chetan-k/"
          >
            LinkedIn
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition cursor-newtab"
            target="_blank"
            rel="noopener noreferrer nofollow"
            to="https://x.com/ChetanSharma974"
          >
            Twitter
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition cursor-newtab"
            target="_blank"
            rel="noopener noreferrer nofollow"
            to="https://www.instagram.com/https.sharmaji"
          >
            Instagram
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition cursor-newtab"
            target="_blank"
            rel="noopener noreferrer nofollow"
            to="https://www.snapchat.com/add/real.sharmajii?share_id=afARwsoneDI&locale=en-US"
          >
            Snapchat
          </Link>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col space-y-4">
          <button className="btn primary">🎉</button>
          <button data-feedback-fish="true">Got any feedback?</button>
          <div className="flex items-center gap-1 mt-2">
            <img
              alt="IN flag"
              loading="lazy"
              width="16"
              height="14"
              decoding="async"
              data-nimg="1"
              src="https://flagcdn.com/h240/in.png"
              style={{ color: "transparent" }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Last visit from IN
            </span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="w-full text-center text-gray-400 hover:text-gray-500 transition">
        © 2022 Chetan Sharma.
      </p>
    </footer>
  );
};

export default Footer;
