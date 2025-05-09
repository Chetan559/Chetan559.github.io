import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Marquee } from "../magicui/marquee";

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 h-40 cursor-pointer overflow-hidden rounded-xl border p-4",
        // Light styles
        "border-gray-200 bg-gray-50 hover:bg-gray-100",
        // Dark styles
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        {body}
      </blockquote>
    </figure>
  );
};

function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://chetansharma.co/365Days/JsonData/reviews.json")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (!reviews.length) {
    return <div>No reviews available.</div>;
  }

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div className="relative flex h-[500px] w-full flex-col items-start justify-center overflow-hidden  bg-gray-50 dark:bg-gray-800 ">
      <h3 className="font-bold text-2xl md:text-4xl  tracking-tight text-black dark:text-white transform transition-transform duration-300 hover:scale-105">
        Reviews
      </h3>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <a
        className="flex text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
        href="guestbook.html"
      >
        See all Guestbook Reviews.
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewbox="0 0 24 24"
          className="h-6 w-6 ml-1"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
          ></path>
        </svg>
      </a>
      <span className="h-10"></span>
    </div>
  );
}

export default Review;
