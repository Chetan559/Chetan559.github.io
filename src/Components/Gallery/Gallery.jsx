import React, { useState } from "react";
import ImageCard from "./ImageCard/ImageCard";
import images from "./Images";

function Gallery() {
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleHover = (src) => {
    setHoveredImage(src);
  };

  const resetHover = () => {
    setHoveredImage(null);
  };
  return (
    <div className="container m-auto px-4 sm:pt-20 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white  gap-6 text-center sm:text-left">
      <h2 className="font-bold text-2xl mb-4 gradient-text">
        <span class=" transform transition-transform duration-300 hover:scale-110">
          Gallery
        </span>
      </h2>
      <div className="relative overflow-x-auto pb-6">
        <div className="flex gap-4">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onHover={handleHover}
              resetHover={resetHover}
            />
          ))}
        </div>

        {/* Displaying the large hovered image */}
        {hoveredImage && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <img
              src={hoveredImage}
              alt="Hovered preview"
              className="max-w-3xl max-h-96 object-contain"
            />
          </div>
        )}
      </div>
      <div>
        <h1 className="font-bold text-2xl mb-4 mt-4 gradient-text">
          &#128513;
        </h1>
        <div className="relative mt-8 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              "Tech",
              "Computer",
              "Gadgets",
              "Mechanical Keyboard",
              "Keyring",
              "Mouse",
              "Listening",
              "Music",
              "Drones",
              "Books",
              "Laptop",
              "Cats",
              "Coffee",
              "Simplicity",
              "Long Talk",
              "Idea Discussions",
              "Inspiring",
              "Motivational",
              "Integrity",
              "Patience",
              "Curiosity",
              "Mindfulness",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[#368d34] dark:bg-[#2a6228] px-3 py-1 text-xs text-gray-100 transform transition-transform duration-300 hover:scale-110"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1 className="mt-8 font-bold text-2xl mb-4 gradient-text">
          &#128530;
        </h1>
        <div className="relative mt-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              "Tea",
              "Crowd",
              "Notifications",
              "Dishonesty",
              "Hatred and Intolerance",
              "Greed",
              "Prejudice and Stereotyping",
              "Reality TV",
              "Manipulation",
              "Procrastination",
              "Politics",
              "Disbelief",
              "Watching Movies",
              "Etc",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[#852a2a] dark:bg-[#5c2a2a] px-3 py-1 text-xs text-gray-100 transform transition-transform duration-300 hover:scale-110"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
