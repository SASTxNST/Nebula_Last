import React from 'react';
import Image from 'next/image';
import '@fontsource/orbitron/400.css';

const About = () => {
  const teamSections = [
    {
      role: "President & Vice President",
      members: [
        { name: "Neelanshu Karn", image: "/members/neelanshu.jpeg" },
        { name: "Kavya Katal", image: "/members/kavya.jpeg" },
      ]
    },
    {
      role: "UI/UX",
      members: [
        { name: "Pratya Silla", image: "" },
      ]
    },
    {
      role: "Community Manager & Documentation",
      members: [
        { name: "Rashmi Anand", image: "/members/rashmi.jpeg" },
        { name: "Pratiti Paul", image: "/members/pratiti.jpeg" },
      ]
    },
    {
      role: "Social Media/Outreach",
      members: [
        { name: "Rashmi Anand", image: "/members/rashmi.jpeg" },
        { name: "Shaurya Sharma", image: "" },
      ]
    },
    {
      role: "Code Review/PR",
      members: [
        { name: "Kavya Katal", image:"/members/kavya.jpeg" },
        { name: "Abhinav Bajpai", image: "/members/abhinav.jpeg" },
        { name: "Rudraksh Sharma", image: "/members/rudraksh.jpeg" },
      ]
    },
    {
      role: "Workshops/Lectures",
      members: [
        { name: "Abhinav Bajpai", image: "/members/abhinav.jpeg" },
        { name: "Rudraksh Sharma", image: "/members/rudraksh.jpeg"},
        { name: "Kavya Katal", image: "/members/kavya.jpeg" },
        { name: "Param Khodiyar", image: "/members/param.jpeg" },
      ]
    },
    {
      role: "Website (Nebula)",
      members: [
        { name: "Ankit Pandey", image: "/members/ankit.jpeg" },
        { name: "Kunal Vats", image: "/members/kunal.jpeg" },
        { name: "Abhinav Bajpai", image:"/members/abhinav.jpeg" },
        { name: "Kavya Katal", image: "/members/kavya.jpeg" },
        { name: "Param Khodiyar", image: "/members/param.jpeg" },
        { name: "Rudraksh Sharma", image: "/members/rudraksh.jpeg" },
        { name: "Pratyush Parida", image: "/members/pratyush.jpeg" },
      ]
    }
  ];

  return (
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 bg-black text-white lg:px-8 md:py-20 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 text-center">
          <h1 className="mb-8 text-4xl font-bold tracking-wider text-blue-600 sm:text-5xl md:text-6xl lg:text-8xl">
            ABOUT NEBULA
          </h1>
          <p className="mx-auto max-w-5xl px-4 text-lg leading-relaxed text-gray-300 sm:text-xl md:text-2xl">
            Project Nebula is SAST&apos;s open-source development initiative where students collaboratively build full-stack
            tools, gain GitHub experience, and participate in a structured contribution challenge.
          </p>
        </header>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {teamSections.map((section, index) => (
            <article key={index} className="text-center">
              <h2 className="mb-6 px-4 text-2xl font-bold tracking-wide text-blue-400 sm:mb-8 sm:text-3xl md:text-4xl">
                {section.role}
              </h2>
              <div className="flex flex-wrap justify-center gap-6 px-4 sm:gap-8">
                {section.members.map((member, memberIndex) => (
                  <div key={memberIndex} className="w-full max-w-xs text-center group sm:w-1/2 md:w-auto">
                    <div className="relative mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border-4 border-gray-600 bg-gray-800 transition-colors duration-300 group-hover:border-blue-600 sm:mb-4 sm:h-28 sm:w-28 md:h-32 md:w-32">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-white text-xs sm:text-sm">
                          No Image
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-white sm:text-base md:text-lg">{member.name}</h3>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-12 text-center sm:mt-14 md:mt-16">
          <button className="border-2 border-gray-600 bg-transparent px-6 py-2 text-base font-semibold tracking-wider text-white transition-colors duration-300 hover:border-blue-400 hover:bg-blue-700 sm:px-8 sm:py-3 md:text-lg">
            Guidelines
          </button>
        </footer>
      </div>
    </section>
  );
};

export default About;