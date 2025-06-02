"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const faqs = [
    {
      question: "What is Project Nebula?",
      answer:
        "Project Nebula is the flagship open-source initiative of the Society for Astrophysics and Space Technology (SAST). It's a collaborative platform that blends innovation, learning, and real-world development.",
    },
    {
      question: "How can I contribute to Project Nebula?",
      answer:
        "You can contribute by visiting our GitHub repositories, picking up open issues, submitting pull requests, or suggesting new features. We welcome contributors of all skill levels!",
    },
    {
      question: "Do I need prior experience to join?",
      answer:
        "No! Project Nebula is designed to be accessible to beginners. We provide workshops, technical lectures, and mentorship to help you get started with open-source contribution.",
    },
    {
      question: "What technologies does Project Nebula use?",
      answer:
        "We primarily use web technologies like HTML, CSS, JavaScript, React, Next.js, and Node.js. We also work with databases and other tools depending on the specific module.",
    },
    {
      question: "Is there a roadmap for Project Nebula?",
      answer:
        "Yes! Project Nebula begins with the development of the SAST website and gradually evolves into an ecosystem of interconnected modules including backend systems, interactive robotics dashboards, and project-specific tools.",
    },
    {
      question: "Are there learning resources available?",
      answer:
        "Absolutely! We provide workshops, technical lectures, and guided learning sessions focused on open-source development, Git/GitHub best practices, and web technologies.",
    },
    {
      question: "How can I join SAST?",
      answer:
        "To join SAST, please reach out to us through any of our contact channels. We're always looking for passionate individuals interested in astrophysics and space technology!",
    },
    {
      question: "Can I suggest new features or projects?",
      answer:
        "Yes! We encourage community input. You can suggest new features or projects through our GitHub repositories or by contacting us directly.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-black text-white" >
      <section
        id="faq"
        className="relative z-10 flex flex-col items-center min-h-screen py-16 px-4 mt-16 text-white"
      >
        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 md:mb-10 text-center tracking-wide bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Frequently Asked Questions
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg max-w-2xl text-gray-400 mb-12 text-center"
        >
          Everything you need to know about Project Nebula and how to get
          involved.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 w-full max-w-4xl"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <div
                onClick={() => toggleFaq(index)}
                className="p-4 sm:p-5 flex justify-between items-center cursor-pointer font-semibold text-white"
              >
                <span>{faq.question}</span>
                <span
                  className={`text-2xl text-blue-400 transition-transform duration-300 ${
                    openFaqIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openFaqIndex === index
                    ? "max-h-screen opacity-100 p-4 sm:p-5 pt-0" // Adjust padding as needed
                    : "max-h-0 opacity-0 p-0"
                }`}
              >
                <p className="m-0 text-left text-gray-300 text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default FAQ;