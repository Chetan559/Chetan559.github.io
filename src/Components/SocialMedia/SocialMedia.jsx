import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function SocialMedia() {
  return (
    <div className="container m-auto px-4 pt-12  sm:pt-20 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white  gap-6 text-center sm:text-left">
      <h2 className="font-bold text-2xl mb-4 gradient-text">
        <span class=" transform transition-transform duration-300 hover:scale-110">
          Find me on social media
        </span>
      </h2>
      <div className="flex space-x-8">
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <div className="mx-auto w-max mt-3 h-[58px] p-2 flex items-end gap-2 rounded-2xl border dark:border-[#707070]">
            <div
              className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-400/40"
              style={{ width: "40px" }}
            >
              <a
                href="https://www.instagram.com/https.sharmaji"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
              </a>
            </div>
            <div
              className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-400/40"
              style={{ width: "40px" }}
            >
              <a
                href="https://x.com/ChetanSharma974"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
              </a>
            </div>
            <div
              className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-400/40"
              style={{ width: "40px" }}
            >
              <a
                href="https://github.com/Chetan559"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
              </a>
            </div>
            <div
              className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-400/40"
              style={{ width: "40px" }}
            >
              <a
                href="https://www.linkedin.com/in/sharma-chetan-k/"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;
