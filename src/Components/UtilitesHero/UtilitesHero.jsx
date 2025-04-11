import React, { useEffect, useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import FirstIconGrid from "../IconGrid/FirstIconGrid";
import SecondIconGrid from "../IconGrid/SecondIconGrid";
import ThirdIconGrid from "../IconGrid/ThirdIconGrid";

function UtilitesHero() {
  return (
    <div className="container m-auto px-4 pt-12  sm:pt-20 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white  gap-6 text-center sm:text-left">
      <div>
        <h2 className="font-bold text-4xl mb-4 gradient-text">
          <span className=" transform transition-transform duration-300 hover:scale-110">
            Utilites
          </span>
        </h2>
      </div>
      <div className="mb-4 mt-5">
        <p className="transform transition-transform duration-300 hover:scale-105">
          In case you are wondering what tech I use, here's the list of what
          tech I'm currently using for coding on a daily basis. This list is
          always evolving.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-2xl mb-4 gradient-text">
          <span className=" transform transition-transform duration-300 hover:scale-110">
            Everyday
          </span>
        </h3>
      </div>
      <ProductGrid />
      <div>
        <h3 className="font-bold text-2xl mb-4 gradient-text">
          <span className=" transform transition-transform duration-300 hover:scale-110">
            System
          </span>
        </h3>
      </div>
      <FirstIconGrid />
      <div>
        <h3 className="font-bold text-2xl mb-4 gradient-text">
          <span className=" transform transition-transform duration-300 hover:scale-110">
            Coding Tools
          </span>
        </h3>
      </div>
      <SecondIconGrid />
      <div>
        <h3 className="font-bold text-2xl mb-4 gradient-text">
          <span className=" transform transition-transform duration-300 hover:scale-110">
            Software & Applictions
          </span>
        </h3>
      </div>
      <ThirdIconGrid />
      <br />
      <p className="text-sm">
        Last Uppdate on <b>Apr 11, 2025</b>
      </p>
    </div>
  );
}

export default UtilitesHero;
