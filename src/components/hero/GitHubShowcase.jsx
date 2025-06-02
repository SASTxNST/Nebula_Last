"use client";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { SiOpenproject } from "react-icons/si";
import { BsRocketTakeoff } from "react-icons/bs";

const GitHubShowcase = () => {
  const repos = [
    {
      name: "SAST",
      moto: "Exploring the cosmos through code and collaboration.",
      description:
        "Welcome to the official repository of the SAST website — a collaborative space to build a vibrant platform showcasing our club's spirit, achievements, and events.",
      logo: "https://i.postimg.cc/g2G97j2c/society-for-aerospace-and-space-technology-logo.jpg",
      link: "https://github.com/SASTxNST/Website_SAST",
    },
    {
      name: "Nebula",
      moto: "The flagship open-source initiative of the Society for Astrophysics and Space Technology (SAST)",
      description:
        "Project Nebula is envisioned to be a collaborative platform that blends innovation, learning, and real-world development. At its core, Nebula aims to empower SAST members—especially juniors—by immersing them in the world of open-source contribution and full-stack development.",
      logo: "https://i.postimg.cc/8C7fbZ8L/Nebula-Logo.png",
      link: "https://github.com/SASTxNST/Nebula",
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black px-4 py-16">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
        {repos.map((repo, index) => (
          <div
            key={index}
            className="relative rounded-3xl bg-gradient-to-br from-[#2a0000] via-[#0a0a0a] to-[#001d3d] p-[2px] shadow-lg"
          >
            <div className="relative flex h-[20rem] flex-col justify-between overflow-hidden rounded-[22px] bg-black/60 p-8 text-white backdrop-blur-lg">
              <BsRocketTakeoff className="pointer-events-none absolute left-10 top-10 rotate-12 text-[5rem] text-white/10 blur-sm" />
              <SiOpenproject className="pointer-events-none absolute bottom-20 right-10 text-[4rem] text-blue-900/20 blur-[1px]" />
              <FaGithub className="pointer-events-none absolute bottom-4 left-4 text-[3.5rem] text-white/10 blur-sm" />

              <div>
                <div className="relative z-10 mb-5 flex items-center gap-4">
                  <div className="relative h-14 w-14">
                    <Image
                      src={repo.logo}
                      alt={repo.name}
                      width={56}
                      height={56}
                      className="rounded-lg bg-white/10 p-1 object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{repo.name}</h2>
                    <p className="text-sm text-white/60">{repo.moto}</p>
                  </div>
                </div>

                <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/80">
                  {repo.description}
                </p>
              </div>

              <div className="relative z-10 mt-6">
                <a
                  href={repo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 underline transition"
                >
                  <FaGithub /> View on GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubShowcase;