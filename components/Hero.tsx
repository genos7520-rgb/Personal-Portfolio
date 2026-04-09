"use client";

interface HeroProps {
  scrollTo: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section id="home">
      <div className="hero-wrap">
        {/* ── Left Column ── */}
        <div>
          <div className="hero-tag">Available for new opportunities</div>
          <h1 className="hero-name">
            Alexandra
            <br />
            <em>Mitchell</em>
          </h1>
          <p className="hero-role">
            Senior Executive Assistant &amp; Administrative Professional with 9+
            years helping leaders focus on what matters most — by handling
            everything else with precision and care.
          </p>
          <div className="hero-btns">
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
            >
              ✉ Get in Touch
            </a>
            <a
              href="/resume-alexandra-mitchell.pdf"
              className="btn-secondary"
              download
            >
              ↓ Download CV
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-n">9+</span>
              <span className="stat-l">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-n">50+</span>
              <span className="stat-l">Executives Supported</span>
            </div>
            <div className="stat">
              <span className="stat-n">3</span>
              <span className="stat-l">Industries</span>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="hero-visual">
          <div className="hero-avatar-ring">
            <span className="hero-initials">AM</span>
          </div>
          <div className="hero-badge">
            <span className="badge-icon">🏆</span>
            <div className="badge-text">
              <span className="badge-title">Top Rated</span>
              <span className="badge-sub">Administrative Pro</span>
            </div>
          </div>
          <div className="hero-badge2">
            <div className="badge2-inner">
              <span className="badge2-dot" />
              <span className="badge2-text">Open to Work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
