import React, { useEffect, useRef } from "react";

const testimonialsRow1 = [
  {
    id: 0,
    text: "Organizing the Nebula Competition with SAST was incredible. Days of coding, debugging, and designing paid off when we saw everyone learning and pushing limits together.",
    name: "Kavya Katal",
    title: "Vice President, SAST",
  },
  {
    id: 1,
    text: "I started with zero knowledge of GitHub, and by the end, I was confidently reviewing PRs and mentoring juniors. Nebula didn't just teach tech—it built confidence.",
    name: "Rudraksh Sharma",
    title: "Website Team, SAST",
  },
  {
    id: 2,
    text: "Being a part of the SAST Club has been a rewarding experience. I've contributed to building platforms that support our space tech initiatives and helped bring visibility to our projects.",
    name: "Ankit Kumar Pandey",
    title: "Website Team, SAST",
  },
  {
    id: 3,
    text: "Working on Project Nebula was a deep dive into teamwork and real-world development. It pushed me to refine my frontend skills, collaborate under pressure, and deliver something that truly mattered to our club.",
    name: "Pratyush Parida",
    title: "Website Team",
  },
];

const testimonialsRow2 = [
  {
    id: 4,
    text: "From debugging components to improving responsiveness, every task on Project Nebula was a learning curve. It felt great to build something that represents our community's passion for space and technology.",
    name: "Abhinav Bajpai",
    title: "Website Team",
  },
  {
    id: 5,
    text: "Working on the club's open-source competition platform was a rewarding journey where I experienced the blend of design and development firsthand, enhancing my skills while bringing a dynamic project to life",
    name: "Prataya Silla",
    title: "UI/UX Lead, SAST",
  },
  {
    id: 6,
    text: "Launching Project Nebula in just one week was intense.From building the website to planning outreach and late- night UI / UX reviews, our team gave it everything.Those sleepless nights showed what real collaboration looks like.",
    name: "Neelanshu Karn",
    title: "President, SAST",
  },
  {
    id: 7,
    text: "Being Secretary of SAST has been a rewarding journey. From coordinating events to managing last-minute chaos, it taught me adaptability, teamwork, and leadership.",
    name: "Rashmi Anand",
    title: "Secretary, SAST",
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="mx-2 w-72 flex-shrink-0 rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur-sm sm:mx-4 sm:w-80 sm:p-6">
      <p className="mb-4 min-h-[3rem] text-xs leading-relaxed text-slate-300 sm:mb-6 sm:min-h-[4rem] sm:text-sm">
        {testimonial.text}
      </p>
      <div>
        <h4 className="mb-1 text-xs font-medium text-white sm:text-sm">
          {testimonial.name}
        </h4>
        <p className="text-xs text-slate-400">{testimonial.title}</p>
      </div>
    </div>
  );
};

const ScrollingRow = ({ testimonials, direction }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollSpeed = direction === "left" ? 1 : -1;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        const maxScroll = scrollContainer.scrollWidth / 3;
        if (direction === "left" && scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        } else if (direction === "right" && scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = maxScroll;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [direction]);

  const duplicated = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div
      ref={scrollRef}
      className="mb-4 flex overflow-x-hidden sm:mb-6"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex min-w-max">
        {duplicated.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
};

const AutoScrollingTestimonials = () => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-black pt-[72px]">
      {/* Vignette effect - only visible on desktop */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {/* Left vignette */}
        <div className="absolute left-0 top-0 h-full w-80 bg-gradient-to-r from-black/90 via-black/70 via-black/40 to-transparent"></div>
        {/* Right vignette */}
        <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-l from-black/90 via-black/70 via-black/40 to-transparent"></div>
        {/* Top vignette */}
        <div className="absolute left-0 top-0 h-48 w-full bg-gradient-to-b from-black/80 to-transparent"></div>
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 mb-8 shrink-0 px-4 text-center sm:mb-6 md:mb-8">
        <h2 className="text-xl font-semibold text-white sm:text-2xl md:text-4xl">
          What the team has to say
        </h2>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm md:mt-2 md:text-base">
          Hear from our team members who built it first-hand
        </p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-start pt-4 sm:justify-center sm:pt-0">
        {/* Horizontal gradient overlays for testimonial cards - desktop only */}
        <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-16 bg-gradient-to-r from-black via-black/70 to-transparent sm:w-24 md:block md:w-32 z-20"></div>
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-16 bg-gradient-to-l from-black via-black/70 to-transparent sm:w-24 md:block md:w-32 z-20"></div>

        <div className="space-y-0">
          <ScrollingRow testimonials={testimonialsRow1} direction="left" />
          <ScrollingRow testimonials={testimonialsRow2} direction="right" />
        </div>
      </div>
    </div>
  );
};

export default AutoScrollingTestimonials;