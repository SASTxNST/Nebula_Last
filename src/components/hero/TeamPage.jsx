"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FaUsers, FaHandshake, FaRocket, FaStar } from "react-icons/fa";

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Neelanshu Karn",
      role: "Project Lead - Nebula",
      bio: "Leads the Nebula project with vision and technical insight, driving the team toward impactful innovation in space-tech.",
      photo:
        "https://avatars.githubusercontent.com/u/67745953?s=400&u=cc8f4cb6d463c2ee4c1cc756522e79929dc65ee2&v=4",
    },
    {
      name: "Pratiti Paul",
      role: "Project Co-Lead - Nebula",
      bio: "Supports project leadership with coordination, planning, and creative contributions to team direction.",
      photo:
        "https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/b1707d706f294124ab883d476518f6b4.jpeg",
    },
    {
      name: "Kavya Katal",
      role: "MERN Developer",
      bio: "Dedicated to full-stack development with MERN, solving problems through code and creativity.",
      photo: "https://avatars.githubusercontent.com/u/178926947?v=4",
    },
    // ... [other members as before]
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-20">
      {/* Background gradients and icons */}
      <div className="absolute left-[-5rem] top-[-5rem] h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-900 via-blue-900 to-cyan-800 blur-[120px] opacity-20" />
      <div className="absolute bottom-[-5rem] right-[-5rem] h-96 w-96 rounded-full bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 blur-[120px] opacity-20" />
      <FaUsers className="pointer-events-none absolute left-16 top-20 text-indigo-700 blur-sm opacity-10" size={140} />
      <FaHandshake className="pointer-events-none absolute bottom-28 right-20 text-pink-700 blur-sm opacity-10" size={130} />
      <FaRocket className="pointer-events-none absolute right-24 top-40 text-cyan-600 blur-sm opacity-10" size={150} />
      <FaStar className="pointer-events-none absolute bottom-36 left-24 text-purple-600 blur-sm opacity-10" size={120} />

      {/* Title */}
      <h2 className="z-10 mb-16 text-center text-5xl font-bold tracking-wide text-white">Meet The Team</h2>

      {/* Carousel */}
      <div className="z-10 w-full max-w-6xl">
        <Slider {...settings}>
          {teamMembers.map((member, idx) => (
            <div key={idx} className="px-4">
              <div className="relative flex flex-col items-center rounded-2xl bg-white/5 p-6 text-center shadow-xl backdrop-blur-md h-full">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="mb-6 rounded-full border-2 border-white/20 object-cover"
                />
                <h3 className="mb-1 text-xl font-semibold text-white">{member.name}</h3>
                <p className="mb-3 italic text-purple-300 text-sm">{member.role}</p>
                <p className="leading-relaxed text-white/80 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TeamPage;
