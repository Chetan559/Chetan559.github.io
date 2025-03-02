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
    <footer className="flex flex-col justify-center items-center sm:items-start max-w-[45rem] mx-auto w-full  bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
      {/* Top Section */}

      {/* Divider */}
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />

      {/* Footer Links */}
      <div className="w-full max-w-[45rem] grid grid-cols-1 sm:grid-cols-4 gap-4 pb-16 text-center sm:text-left">
        {/* Column 1 */}
        <div className="flex flex-col space-y-4">
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/404"
          >
            Reviews
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
            to="/404"
          >
            Projects
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/404"
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
            to="404"
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
            to="/404"
          >
            Dashboard
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-500 transition"
            to="/utilities"
          >
            Utilities
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
          <button data-feedback-fish="true">
            <Link
              to={
                "https://docs.google.com/forms/d/e/1FAIpQLScjIlZpBf_03OCwa8VVmzDnmGJZ7v7qJyNHHnmq1GPsW1E6uQ/viewform?usp=dialog"
              }
            >
              Got any feedback?
            </Link>
          </button>
          <div className="flex items-center gap-1 mt-2 text-center sm:text-left">
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
            <span className="text-xs text-gray-500 dark:text-gray-400 ">
              Last visit from IN
            </span>
          </div>
          <div className="relative group">
            <button className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-200 transition-colors duration-300">
              {temp}°C
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="w-full text-center   text-gray-400 hover:text-gray-500 transition">
        © 2022 Chetan Sharma.
      </p>
    </footer>
  );
};

export default Footer;
