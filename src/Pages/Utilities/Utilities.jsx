import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ArrowDown from "../../assets/arrow-down.svg";
import UtilitiesHero from "../../Components/UtilitesHero/UtilitesHero";

function Utilities() {
  const [scrolling, setScrolling] = useState(false);

  const onPageScroll = () => {
    if (window.pageYOffset > 200) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onPageScroll);
    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="max-w-4xl m-auto relative ">
      <Navbar />
      <main className="relative">
        <UtilitiesHero />
      </main>
      <Footer />
      {scrolling && (
        <button
          className="fixed block right-8 bottom-0 w-24"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img src={ArrowDown} />
        </button>
      )}
    </div>
  );
}

export default Utilities;
