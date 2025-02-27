import React from "react";
import "./PhotoCard.css"; // Import the CSS file
import Photo1 from "../../assets/Photocard1.jpg";
import Photo2 from "../../assets/Photocard4.jpg";
import Photo3 from "../../assets/Photocard3.jpg";

const PhotoCard = () => {
  return (
    <div className="container1 mb-5">
      <div className="glass" style={{ "--r": -15 }}>
        <img src={Photo1} alt="Image 1" className="glass-image" />
      </div>

      <div className="glass" style={{ "--r": 5 }}>
        <img src={Photo3} alt="Image 2" className="glass-image" />
      </div>

      <div className="glass" style={{ "--r": 25 }}>
        <img src={Photo2} alt="Image 3" className="glass-image" />
      </div>
    </div>
  );
};

export default PhotoCard;
