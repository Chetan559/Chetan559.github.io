import React from "react";
import { FaMailBulk, FaLinkedin, FaGlobe } from "react-icons/fa"; // Import icons from react-icons

const Resume = () => {
  return (
    <div className="max-w-[800px] mx-auto p-8 bg-white text-gray-800 font-sans">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Chetan Kanaiyalal</h1>
          <p className="text-gray-600">Data Engineer, Software Developer</p>
        </div>
        <div className="text-right text-sm">
          <div className="flex items-center justify-end gap-2 mb-1">
            <span>contacts@chetansharma.co</span>
            <FaMailBulk size={14} />
          </div>
          <div className="flex items-center justify-end gap-2 mb-1">
            <span>linkedin.com/in/sharma-chetan</span>
            <FaLinkedin size={14} />
          </div>
          <div className="flex items-center justify-end gap-2">
            <span>chetansharma.co</span>
            <FaGlobe size={14} />
          </div>
        </div>
      </header>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
        <div className="h-[1px] bg-border mb-3"></div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">Team Leader, Hackathons</h3>
            <span className="text-sm">Present</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Various Competitors</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>
              Led a team in SSIP Hackathon 2023 and HackTheSrping Hackathon,
              resulting in first-place victories.
            </li>
            <li>
              Managed project development, team coordination, and presentation
              of technical solutions under tight deadlines.
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">Event Organizer</h3>
            <span className="text-sm">Present</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">E-Cell, VGEC</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>
              Successfully organized Founders Week, a 5-day event with 8
              speakers and 200+ daily attendees.
            </li>
            <li>
              Handled logistics, communication, and execution of events,
              ensuring a smooth experience for all participants.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        <div className="h-[1px] bg-border mb-3"></div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">Deepfake Detection Model</h3>
            <span className="text-sm">Present</span>
          </div>
          <p className="text-sm mb-1">
            Developed a deepfake detection model using TensorFlow and Xception
            for feature extraction.
          </p>
          <p className="text-sm mb-1">
            Implemented a hybrid AI/ML approach combining audio-visual
            inconsistencies for better detection accuracy.
          </p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">
              Medical Ally - AI-Powered Medical Platform
            </h3>
            <span className="text-sm">Present</span>
          </div>
          <p className="text-sm mb-1">
            Developed a comprehensive healthcare platform enabling illness
            diagnosis, doctor recommendations, medicine ordering, and pathology
            test booking.
          </p>
          <p className="text-sm mb-1">
            Integrated a chatbot to explain medical reports and prescriptions in
            the user's native language.
          </p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">
              Rule Mitra – Rule-Based Chatbot System
            </h3>
            <span className="text-sm">Present</span>
          </div>
          <p className="text-sm mb-1">
            Developed a rule-based chatbot system designed to assist government
            officials by resolving queries efficiently.
          </p>
          <p className="text-sm mb-1">
            Automated structured responses for improved accessibility and
            streamlined communication.
          </p>
          <p className="text-sm mb-1">
            Won ₹50,000 from SSIP for its innovative approach to government
            query resolution.
          </p>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Core Skills</h2>
        <div className="h-[1px] bg-border mb-3"></div>

        <p className="text-sm mb-2">
          Data Modeling, Data Processing, Extract Transform and Load, Data
          Import, Information Engineering, Data Coding
        </p>
        <p className="text-sm mb-2">
          Data Storage Optimization, Data Cleaning, Data Transformation,
          MongoDB, PyQuery, Data Pipelines
        </p>
        <p className="text-sm">
          Software Defined Networking (SDN), React, Flask, Python, MySQL,
          PostgreSQL, Git, GCP
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        <div className="h-[1px] bg-border mb-3"></div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">
              Vishwakarma Government Engineering College, Chandkheda
            </h3>
            <span className="text-sm">Sep 2022 - Present</span>
          </div>
          <p className="text-sm mb-1">
            Bachelor of Engineering, Computer Engineering
          </p>
          <p className="text-sm">GPA: 8.61</p>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Languages</h2>
        <div className="h-[1px] bg-border mb-3"></div>

        <p className="text-sm">
          English{" "}
          <span className="italic">(Professional working proficiency)</span>,
          Gujarati{" "}
          <span className="italic">(Professional working proficiency)</span>,
          Hindi <span className="italic">(Native)</span>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Interests</h2>
        <div className="h-[1px] bg-border mb-3"></div>

        <p className="text-sm">
          Hackathons & Competitions, Artificial Intelligence & Machine Learning,
          Event Management & Leadership, Books & Reading, Internet of Things
          (IoT)
        </p>
      </section>
    </div>
  );
};

export default Resume;
