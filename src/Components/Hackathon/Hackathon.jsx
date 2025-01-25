import React, { useEffect, useState } from "react";
import HackathonCard from "../../Ui/hackathon-Card/HackathonCard";

function Hackathon() {
  const [hackathons, sethackathons] = useState([]);

  useEffect(() => {
    // Fetch the JSON data from GitHub
    fetch("https://chetansharma.co/365Days/JsonData/hackathon.json")
      .then((response) => response.json())
      .then((data) => sethackathons(data))
      .catch((error) => console.error("Error fetching tech stack:", error));
  }, []);

  return (
    <div className="container    bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col sm:flex-row gap-6 text-center sm:text-left">
      <div className="container m-auto">
        <h2 className="text-2xl font-semibold pb-4">Hackathons</h2>
        <h3 className="text-xl font-bold tracking-tighter pb-4">
          I like building things
        </h3>
        <p className="text-muted-foreground md:text-xl/relaxed pb-4 lg:text-base/relaxed xl:text-xl/relaxed">
          During my time in university, I attended + hackathons. People from
          around the country would come together and build incredible things in
          2-3 days. It was eye-opening to see the endless possibilities brought
          to life by a group of motivated and passionate individuals.
        </p>
        <ul className="flex ml-4 flex-col gap-4">
          {hackathons.map((hackathon, idx) => (
            <HackathonCard {...hackathon} key={idx} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Hackathon;
