import Image from "next/image";

const About = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black font-sans text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 z-0 bg-gradient-to-l from-black via-black/60 to-transparent" />
        <Image
          src="https://i.postimg.cc/pd3vC12b/unnamed.png"
          alt="Hero"
          className="h-full w-full object-cover opacity-15"
          fill
          priority
        />
      </div>
      <div className="fp-scrollable-content max-h-full overflow-y-auto px-4 py-10 sm:px-10 sm:py-20"></div>

      <div className="relative z-10 w-full px-4 pt-10 sm:px-10 sm:pt-20 lg:px-20">
        <div className="max-w-xl">
          <h1 className="text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
            <span>Welcome to </span>
            <span className="font-semibold text-blue-500">SAST&apos;s</span> own
            <span className="font-semibold">
              <span className="text-blue-500"> Open-Source</span> Contribution
              Challenge
            </span>
          </h1>

          <a
            href="https://github.com/SASTxNST/Website_SAST"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-fit rounded-full border border-white/5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 px-8 py-3 text-lg font-medium text-white shadow-[0_0_16px_rgba(99,102,241,0.2)] backdrop-blur-md transition-transform duration-200 hover:scale-105 sm:mt-10 sm:px-10"
          >
            Contribute
          </a>
        </div>
      </div>

      <div className="relative z-20 w-full bg-black/80 px-4 py-8 backdrop-blur-md sm:px-8 sm:py-6">
        <div className="grid grid-cols-1 gap-4 text-xs text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {[
            {
              id: "02/06/25",
              title: "Project Nebula: Launch & Orientation",
              desc: "Kickstart the journey! Get introduced to the Open Source Contribution Challenge and learn how to make your first impact.",
            },
            {
              id: "04/06/25",
              title: "First Flight: Your First Contribution",
              desc: "SAST x DevClub brings a hands-on workshop guiding you through your first ever open-source contribution — simple, friendly, and powerful.",
            },
            {
              id: "07/06/25",
              title: "Hacking Without Hacking",
              desc: "Dive into OSINT & Social Engineering with SAST x SOCS. Learn how ethical intelligence works in the real world.",
            },
            {
              id: "11/06/25",
              title: "Branch Out: Real Repos, Real Impact",
              desc: "Level up with SAST x DevClub. Go beyond the basics—learn to explore active repositories and make meaningful pull requests.",
            },
            {
              id: "18/06/25",
              title: "The Open Source Playground",
              desc: "Get your hands dirty! Experiment in a live HTML/CSS sandbox in this SAST X DevClub Workshop, then discover how open source is changing the world.",
            },
            {
              id: "23/06/25",
              title: "The Final Push",
              desc: "This is it! Wrap up your contributions, polish your work, and submit your final pull requests before the clock runs out.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-white/5 p-4 transition duration-300 hover:bg-white/10"
            >
              <h4 className="mb-1 text-sm font-bold text-white/90">
                {item.id} {item.title}
              </h4>
              {item.desc && (
                <p className="mt-1 text-xs text-gray-300">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;