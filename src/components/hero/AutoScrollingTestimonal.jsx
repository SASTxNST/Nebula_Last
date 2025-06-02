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
    text: "I started with zero knowledge of GitHub, and by the end, I was confidently reviewing PRs and mentoring juniors. Nebula didn’t just teach tech—it built confidence.",
    name: "Rudraksh Sharma",
    title: "Website Team, SAST",
  },
  {
    id: 2,
    text: "Being a part of the SAST Club has been a rewarding experience. I’ve contributed to building platforms that support our space tech initiatives and helped bring visibility to our projects.",
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
    text: "From debugging components to improving responsiveness, every task on Project Nebula was a learning curve. It felt great to build something that represents our community’s passion for space and technology.",
    name: "Abhinav Bajpai",
    title: "Website Team",
  },
  {
    id: 5,
    text: "Working on the club’s open-source competition platform was a rewarding journey where I experienced the blend of design and development firsthand, enhancing my skills while bringing a dynamic project to life",
    name: "Prataya Silla",
    title: "UI/UX Lead, SAST",
  },
  {
    id: 6,
    text: "“Launching Project Nebula in just one week was intense. From building the website to planning outreach and late-night UI/UX reviews, our team gave it everything. Those sleepless nights showed what real collaboration looks like.”.",
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
    <div className="mx-4 flex-shrink-0 rounded-xl border border-slate-700/50 bg-slate-800/40 p-6 backdrop-blur-sm md:w-80">
      <p className="mb-6 min-h-[4rem] text-sm leading-relaxed text-slate-300">
        {testimonial.text}
      </p>
      <div>
        <h4 className="mb-1 text-sm font-medium text-white">
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
    let scrollSpeed = direction === "left" ? 0.3 : -0.3;

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
      className="mb-6 flex overflow-x-hidden"
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
    <div className="flex h-screen w-full flex-col overflow-hidden bg-black pt-[72px]">
      <div className="mb-6 shrink-0 text-center md:mb-8">
        <h2 className="text-2xl font-semibold text-white md:text-4xl">
          What the team has to say
        </h2>
        <p className="mt-1 text-sm text-slate-400 md:mt-2 md:text-base">
          Hear from our team members who built it first-hand
        </p>
      </div>

      <div className="relative flex flex-1 flex-col justify-center">
        <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-96 bg-gradient-to-r from-black via-black/90 via-black/70 via-black/40 to-transparent md:block"></div>
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-96 bg-gradient-to-l from-black via-black/90 via-black/70 via-black/40 to-transparent md:block"></div>

        <div className="space-y-0">
          <ScrollingRow testimonials={testimonialsRow1} direction="left" />
          <ScrollingRow testimonials={testimonialsRow2} direction="right" />
        </div>
      </div>
    </div>
  );
};

export default AutoScrollingTestimonials;