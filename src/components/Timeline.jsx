"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import '@fontsource/orbitron/400.css';

const Timeline = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const timelineEvents = [
    {
      step: '0.00',
      title: 'Hello World!',
      date: '27 March, 2025',
      description:
        'The event begins with an official announcement, introducing participants to DCoins, how they can be earned, and teaser posts about the Reverse Bug Hunt.',
    },
    {
      step: '0.01',
      title: 'Open Source Traversal',
      date: '28 March, 2025',
      description:
        'Participants engage in an open-source challenge, solving riddles, exploring repositories, and taking part in a fun quiz to earn DCoins.',
    },
    {
      step: '0.02',
      title: 'Bug Smash Arena',
      date: '30 March, 2025',
      description:
        'A real-time bug hunt where participants fix issues across selected repositories and compete to top the contributor chart.',
    },
    {
      step: '0.03',
      title: 'Mentorship AMA',
      date: '1 April, 2025',
      description:
        'Top open-source mentors share experiences and answer participant questions in a relaxed fireside AMA session.',
    },
    {
      step: '0.04',
      title: 'Final Showcase & Rewards',
      date: '5 April, 2025',
      description:
        'Final presentations, leaderboard highlights, rewards ceremony, and a sneak peek into future open-source roadmaps.',
    },
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full px-6 py-24 sm:px-12">
      <div className="relative z-10 mx-auto max-w-5xl">
        <h2 className="mb-20 text-center font-orbitron text-4xl font-bold text-white sm:text-5xl">
          Event Timeline
        </h2>

        <div className="relative ml-4 pl-6 border-l-2 border-gray-600">
          {timelineEvents.map((event, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
              variants={fadeInVariants}
              className="relative mb-16"
            >
              <div className="absolute -left-[10px] h-3 w-3 rounded-full bg-blue-500" />

              <div>
                <div className="mb-2 text-sm text-gray-400">{event.step}</div>
                <h3 className="mb-1 font-orbitron text-2xl font-semibold text-white">
                  {event.title}
                </h3>
                <p className="mb-2 text-sm text-gray-400">{event.date}</p>
                <p className="max-w-2xl text-base text-gray-300">{event.description}</p>
              </div>

              <div className="pointer-events-none absolute right-[-80px] top-0 hidden whitespace-pre font-mono text-xs leading-none text-white opacity-20 select-none sm:block">
                {`    .--.
        |o_o |
        |:_/ |
        //   \\ \\
        (|     | )
        /'\\_   _/\\'
        \\___)=(___/`}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;