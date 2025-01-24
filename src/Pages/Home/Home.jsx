import Hackathon from "@/Components/Hackathon/Hackathon";
import Hero from "@/Components/Hero/Hero";
import Navbar from "@/Components/Navbar/Navbar";
import Project from "@/Components/Project/Project";
import Review from "@/Components/Review/Review";
import "./Home.css";
import { useEffect, useState } from "react";
import ArrowDown from "../../assets/arrow-down.svg";
import ThinkCodeDeploy from "../../Components/ThinkCodeDeploy/ThinkCodeDeploy";
import Footer from "../../Components/Footer/Footer";

function Home() {
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
        <Hero />
        <Project />
        <Review />
        <Hackathon />
        <ThinkCodeDeploy />
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

export default Home;
