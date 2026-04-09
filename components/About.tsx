"use client";

import { FadeIn } from "./FadeIn";


export default function About() {
  return (
    <section className="alt-bg" id="about">
      <div className="inner">
        <FadeIn>
          <span className="section-label">About Me</span>
          <h2 className="section-title">The person behind the calendar</h2>
        </FadeIn>

        <div className="about-grid">
          {/* ── Left: Bio ── */}
          <FadeIn delay={100}>
            <p className="about-lead">
              I thrive in the background — anticipating needs, eliminating
              friction, and keeping complex operations running smoothly.
            </p>
            <p className="about-body">
              Based in New York, I&apos;ve spent nearly a decade partnering with
              executives across consulting, finance, and marketing. My approach
              is proactive, not reactive: I build systems, not just workflows,
              so that nothing slips through the cracks.
            </p>
            <p className="about-body">
              Outside the office, I&apos;m a certified project management
              enthusiast, an avid reader of organisational behaviour research,
              and a firm believer that clear communication is the greatest
              professional skill.
            </p>
            <ul className="about-values">
              <li>Discreet and trustworthy with sensitive information</li>
              <li>Adaptable to fast-paced, high-pressure environments</li>
              <li>Systems thinker with a strong attention to detail</li>
              <li>Warm communicator who builds genuine relationships</li>
            </ul>
          </FadeIn>

          {/* ── Right: Info Cards ── */}
          <FadeIn delay={200}>
            <div className="about-aside">
              <div className="about-card">
                <div className="about-card-icon">🎓</div>
                <h4>Education</h4>
                <p>
                  B.A. Communications, New York University (2015)
                  <br />
                  Certified Administrative Professional (CAP)
                </p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">🌐</div>
                <h4>Languages</h4>
                <p>
                  English (Native) · Spanish (Conversational) · French (Basic)
                </p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">🛠</div>
                <h4>Core Tools</h4>
                <p>
                  Microsoft 365 · Google Workspace · Slack · Asana · Notion ·
                  Salesforce
                </p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">📍</div>
                <h4>Location &amp; Availability</h4>
                <p>
                  New York, NY · Open to in-person, hybrid, or fully remote
                  roles
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
