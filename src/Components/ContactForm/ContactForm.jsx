import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "../../assets/contact-note.webp";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_z4q9s7l",
        "template_awl7mrt",
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        "nxDHnxfVFa0MKYmuM"
      )
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => {
        alert("Error sending message. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="mt-4 grid items-center lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="flex flex-col border border-blue-200 shadow-3xl rounded-xl p-6 lg:p-8 bg-white dark:border-gray-800 dark:bg-black-charcoal">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 dark:bg-black-ebony dark:border-gray-700 dark:text-gray-400"
                placeholder="Full Name*"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 dark:bg-black-ebony dark:border-gray-700 dark:text-gray-400"
                placeholder="Email*"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 dark:bg-black-ebony dark:border-gray-700 dark:text-gray-400"
                placeholder="Phone Number*"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 dark:bg-black-ebony dark:border-gray-700 dark:text-gray-400"
                placeholder="Messages*"
                required
              />
            </div>
          </div>
          <div className="mt-4 grid">
            <button
              type="submit"
              className="inline-flex justify-center gap-1 items-center px-4 py-3 bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-500">
              I'll get back to you in 1-2 business days.
            </p>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <img
          alt="a snippet of meme about computer programming."
          loading="lazy"
          width="500"
          height="500"
          decoding="async"
          className="rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-110"
          src={Image}
        />
      </div>
    </div>
  );
};

export default ContactForm;
