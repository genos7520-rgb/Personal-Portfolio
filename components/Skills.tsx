"use client";

import { FadeIn, useInView } from "./FadeIn";
import type { Skill } from "./types";

const skills: Skill[] = [
  { name: "Calendar & Schedule Management", level: 95, category: "Organisation" },
  { name: "Email Correspondence",           level: 92, category: "Communication" },
  { name: "Microsoft Office Suite",         level: 90, category: "Software" },
  { name: "Document Preparation",           level: 88, category: "Organisation" },
  { name: "Project Coordination",           level: 85, category: "Management" },
  { name: "Data Entry & Reporting",         level: 87, category: "Software" },
  { name: "Travel Arrangements",            level: 80, category: "Organisation" },
  { name: "Client Relations",               level: 93, category: "Communication" },
  { name: "Google Workspace",               level: 89, category: "Software" },
  { name: "Meeting Facilitation",           level: 84, category: "Management" },
];

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="skill-item"
      style={{ animationDelay: `${delay}ms`, opacity: inView ? 1 : 0 }}
    >
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct">{skill.level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: inView ? `${skill.level}%` : "0%",
            transitionDelay: `${delay + 200}ms`,
          }}
        />
      </div>
      <span className="skill-cat">{skill.category}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <FadeIn>
        <span className="section-label">Skills</span>
        <h2 className="section-title">Where I add real value</h2>
      </FadeIn>
      <div className="skills-grid">
        {skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} delay={i * 60} />
        ))}
      </div>
    </section>
  );
}
