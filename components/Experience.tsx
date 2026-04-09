"use client";

import { FadeIn, useInView } from "./FadeIn";
import type { Experience } from "./types";

const experiences: Experience[] = [
  {
    title: "Senior Executive Assistant",
    company: "Pinnacle Consulting Group",
    period: "2021 – Present",
    description:
      "Provide high-level administrative support to C-suite executives at a 200-person consulting firm, managing complex scheduling, communications, and strategic projects.",
    achievements: [
      "Reduced executive scheduling conflicts by 40% by implementing a new calendar management system",
      "Coordinated 30+ international travel itineraries annually with zero logistical errors",
      "Onboarded and mentored 3 junior administrative assistants",
    ],
  },
  {
    title: "Administrative Coordinator",
    company: "Horizon Financial Services",
    period: "2018 – 2021",
    description:
      "Supported a team of 12 financial advisors with day-to-day operations, client communications, and compliance documentation.",
    achievements: [
      "Managed a client database of 500+ contacts with 99.8% accuracy",
      "Streamlined document filing processes, cutting retrieval time by 55%",
      "Organised quarterly team retreats for up to 80 attendees",
    ],
  },
  {
    title: "Office Administrator",
    company: "Brightside Marketing Agency",
    period: "2015 – 2018",
    description:
      "Handled front-of-house operations, vendor management, and internal communications for a fast-paced creative agency.",
    achievements: [
      "Negotiated vendor contracts saving the company $15,000 annually",
      "Built and maintained an internal resource wiki adopted company-wide",
      "Supported new-hire onboarding for 25+ employees",
    ],
  },
];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="exp-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${index * 150}ms`,
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div className="exp-dot" />
      <div className="exp-content">
        <div className="exp-top">
          <div>
            <h3 className="exp-title">{exp.title}</h3>
            <p className="exp-company">{exp.company}</p>
          </div>
          <span className="exp-period">{exp.period}</span>
        </div>
        <p className="exp-desc">{exp.description}</p>
        <ul className="exp-achievements">
          {exp.achievements.map((achievement, i) => (
            <li key={i}>{achievement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="alt-bg" id="experience">
      <div className="inner">
        <FadeIn>
          <span className="section-label">Experience</span>
          <h2 className="section-title">A track record of impact</h2>
        </FadeIn>
        <div className="exp-timeline">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
