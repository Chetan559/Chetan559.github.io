import React from "react";

function ContactUs() {
  return (
    <div className="container m-auto px-4 pt-12  sm:pt-20 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white  gap-6 text-center sm:text-left">
      <div>
        <h2 className="font-bold text-4xl mb-4 gradient-text">
          <span class=" transform transition-transform duration-300 hover:scale-110">
            Contact Me ☎️
          </span>
        </h2>
      </div>
      <div class="mb-4 mt-5">
        <p class="transform transition-transform duration-300 hover:scale-105">
          Thank you for visiting my website. I'm always happy to hear from you
          and answer any questions you may have. Please fill out the form below
          with your name. You can also reach out to me personally at{" "}
          <a href="mailto:cschetan559@gmail.com">contact@chetansharma.co.</a>
        </p>
      </div>
    </div>
  );
}

export default ContactUs;
