import React from "react";

function Education() {
  return (
    <div className="container m-auto px-4  pb-12 sm:pt-20 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white  gap-6 text-center sm:text-left">
      <h2 className="font-bold text-2xl mb-4 gradient-text">
        <span class=" transform transition-transform duration-300 hover:scale-110">
          Education
        </span>
      </h2>
      <div className="mt-12 relative before:absolute before:top-0 before:left-16 before:rounded-full before:bottom-10 sm:before:bottom-2 before:w-1 before:bg-orange-100">
        <div className="pl-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
          <h3 className="absolute left-0 text-lg font-semibold">2026</h3>
          <p>
            UnderGrad Student at VGEC (Vishwakarma Government Engineering
            College), where I'm pursuing my passion for computer programming.
          </p>
        </div>
        <div className="pl-24 mt-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
          <h3 className="absolute left-0 text-lg font-semibold">2022</h3>
          <p>
            XII – (HSC) | Sabarmati Higher Secondary School <br />
            Persentile Rank : 94.79
          </p>
        </div>
        <div className="pl-24 mt-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
          <h3 className="absolute left-0 text-lg font-semibold">2020</h3>
          <p>
            X – (SSC) | St. Ann's High School <br />
            Persentile Rank : 96.90
          </p>
        </div>
      </div>
    </div>
  );
}

export default Education;
