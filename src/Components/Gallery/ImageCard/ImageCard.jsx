import React from "react";

const ImageCard = ({ image, onHover, resetHover }) => {
  return (
    <div className="relative group min-w-28">
      <div style={{ visibility: "visible" }}>
        <img
          src={image.src}
          alt={image.alt}
          className="h-28 w-28 rounded-md ml-1 object-cover transform transition-transform duration-300 group-hover:scale-110"
          onMouseEnter={() => onHover(image.src)}
          onMouseLeave={resetHover}
        />
      </div>
    </div>
  );
};

export default ImageCard;
