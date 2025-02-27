import React from "react";
import PhotoCard from "../PhotoCards/PhotoCard";

function AboutHero() {
  return (
    <div className="container m-auto px-4 pt-12  sm:pt-20 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white  gap-6 text-center sm:text-left">
      <div>
        <h2 className="font-bold text-4xl mb-4 gradient-text">
          <span class=" transform transition-transform duration-300 hover:scale-110">
            About
          </span>
        </h2>
      </div>
      <PhotoCard />
      <div class="mb-4 mt-5">
        <p class="transform transition-transform duration-300 hover:scale-105">
          Hey, I’m Chetan Sharma—a tech enthusiast originally from Ahmedabad,
          Gujarat. I’ve always been curious about how things work, and that
          curiosity led me to dive headfirst into the world of technology. From
          a young age, tinkering with computers and exploring new gadgets wasn’t
          just a hobby; it was a passion that continues to drive my journey
          today.
        </p>
        <br />
        <p class="transform transition-transform duration-300 hover:scale-105">
          I specialize in technologies like Python, javascript, Java, Machine
          Learning, and Deep Learning. I enjoy building projects that merge
          creativity with cutting-edge tech—whether it’s crafting intelligent
          models, developing dynamic applications, or diving into
          research-driven solutions. My journey is all about learning,
          experimenting, and making an impact through tech. Feel free to explore
          my portfolio and see what I’ve been up to!
        </p>
      </div>
    </div>
  );
}

export default AboutHero;
