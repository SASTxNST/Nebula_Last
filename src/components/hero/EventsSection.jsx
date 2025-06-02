"use client";

import { FaRocket, FaStar, FaGithub, FaCode } from "react-icons/fa";

const EventsSection = () => {
  const events = [
    {
      title: "NASA Space Apps Challenge",
      date: "Dates to be announced",
      description:
        "The world’s largest space and science hackathon is coming to our campus! Collaborate with global problem-solvers and build innovative solutions using NASA's open data.",
    },
    {
      title: "Embedded C Workshop",
      date: "Dates to be announced",
      description:
        "A week-long hands-on workshop diving deep into Embedded C programming—ideal for aspiring system-level programmers and space hardware enthusiasts.",
    },
    {
      title: "RC Plane Competition",
      date: "Dates to be announced",
      description:
        "Design, build, and fly your own remote-controlled aircraft. Compete in real-world flight challenges that test your engineering and aerodynamics skills.",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-20">
      <div className="absolute left-[-5rem] top-[-5rem] h-96 w-96 rounded-full bg-gradient-to-tr from-[#2a0000] via-purple-700 to-blue-700 blur-[120px] opacity-20" />
      <div className="absolute bottom-[-5rem] right-[-5rem] h-96 w-96 rounded-full bg-gradient-to-br from-red-800 via-pink-600 to-purple-700 blur-[120px] opacity-20" />

      <FaRocket
        className="pointer-events-none absolute left-10 top-20 text-purple-700 opacity-10 blur-sm"
        size={150}
      />
      <FaStar
        className="pointer-events-none absolute right-20 top-40 text-yellow-400 opacity-10 blur-sm"
        size={120}
      />
      <FaGithub
        className="pointer-events-none absolute bottom-32 left-16 text-gray-500 opacity-10 blur-sm"
        size={140}
      />
      <FaCode
        className="pointer-events-none absolute bottom-20 right-24 text-blue-600 opacity-10 blur-sm"
        size={130}
      />

      <h2 className="z-10 mb-16 text-center text-5xl font-bold tracking-wide text-white md:text-5xl">
        Upcoming Events
      </h2>

      <div className="z-10 grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl bg-white/3 p-6 shadow-xl backdrop-blur-md"
          >
            <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rotate-45 rounded-3xl bg-gradient-to-br from-red-500 to-purple-700 blur-md opacity-30" />
            <h3 className="mb-2 text-xl font-semibold text-white">
              {event.title}
            </h3>
            <p className="mb-3 text-sm text-gray-300">{event.date}</p>
            <p className="text-sm leading-relaxed text-white/80">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;