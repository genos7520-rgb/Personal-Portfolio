"use client";

import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // ── Persist dark mode ──────────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", String(dark));
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  // ── Active section tracking ────────────────────────────────────────────────
  useEffect(() => {
    const sections = ["home", "about", "skills", "experience", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Scroll shadow for nav ──────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = ["about", "skills", "experience", "contact"];

  return (
    <>
      {/* ── Global Styles ─────────────────────────────────────────────────── */}
      <style>{`
        /* ── Reset & CSS Variables ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:       #f7f5f2;
          --bg2:      #edeae5;
          --bg3:      #e2dfd9;
          --fg:       #1a1714;
          --fg2:      #4a453f;
          --fg3:      #7a746c;
          --accent:   #c8602a;
          --accent2:  #e07a46;
          --border:   #d5d0c9;
          --card:     #ffffff;
          --shadow:   0 2px 20px rgba(0,0,0,0.06);
          --shadow2:  0 8px 40px rgba(0,0,0,0.10);
          --radius:   12px;
          --nav-h:    68px;
          --font-serif: 'DM Serif Display', Georgia, serif;
          --font-body:  'DM Sans', system-ui, sans-serif;
          --transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="dark"] {
          --bg:     #131110;
          --bg2:    #1c1916;
          --bg3:    #232018;
          --fg:     #f0ece6;
          --fg2:    #b8b0a6;
          --fg3:    #7a746c;
          --accent: #e07a46;
          --accent2:#f09060;
          --border: #2e2924;
          --card:   #1c1916;
          --shadow: 0 2px 20px rgba(0,0,0,0.30);
          --shadow2:0 8px 40px rgba(0,0,0,0.40);
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font-body);
          background: var(--bg);
          color: var(--fg);
          line-height: 1.6;
          transition: background var(--transition), color var(--transition);
          overflow-x: hidden;
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg2); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

        /* ── Navigation ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0;
          height: var(--nav-h);
          display: flex; align-items: center;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
          z-index: 100;
          transition: background var(--transition), box-shadow var(--transition);
        }
        nav.scrolled {
          background: color-mix(in srgb, var(--bg) 92%, transparent);
          backdrop-filter: blur(12px);
          box-shadow: var(--shadow);
        }
        .nav-inner {
          max-width: 1100px; margin: 0 auto;
          width: 100%; display: flex;
          align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-family: var(--font-serif);
          font-size: 1.3rem; font-weight: 400;
          color: var(--fg); cursor: pointer;
          letter-spacing: -0.02em;
        }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links button {
          background: none; border: none;
          font-family: var(--font-body);
          font-size: 0.875rem; font-weight: 500;
          color: var(--fg2); cursor: pointer;
          text-transform: capitalize; letter-spacing: 0.04em;
          transition: color 0.2s;
          position: relative; padding-bottom: 2px;
        }
        .nav-links button::after {
          content: ''; position: absolute;
          bottom: 0; left: 0; right: 100%;
          height: 1.5px; background: var(--accent);
          transition: right 0.3s;
        }
        .nav-links button:hover::after,
        .nav-links button.active::after { right: 0; }
        .nav-links button:hover,
        .nav-links button.active { color: var(--fg); }

        .nav-actions { display: flex; align-items: center; gap: 1rem; }
        .btn-icon {
          background: none; border: 1.5px solid var(--border);
          border-radius: 8px; width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--fg2);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          font-size: 1rem;
        }
        .btn-icon:hover {
          border-color: var(--accent); color: var(--accent);
          background: color-mix(in srgb, var(--accent) 8%, transparent);
        }

        .hamburger {
          display: none; flex-direction: column;
          gap: 5px; cursor: pointer;
          background: none; border: none; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--fg); border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile Menu ── */
        .mobile-menu {
          display: none; position: fixed;
          top: var(--nav-h); left: 0; right: 0;
          background: var(--bg); border-bottom: 1px solid var(--border);
          padding: 1.5rem clamp(1.5rem,5vw,4rem);
          z-index: 99; flex-direction: column; gap: 1rem;
          animation: slideDown 0.3s ease;
        }
        .mobile-menu.open { display: flex; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu button {
          background: none; border: none;
          font-family: var(--font-body); font-size: 1.1rem;
          color: var(--fg2); cursor: pointer; text-align: left;
          text-transform: capitalize; padding: 0.5rem 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s;
        }
        .mobile-menu button:hover { color: var(--accent); }

        /* ── Sections ── */
        section {
          min-height: 100vh;
          padding: calc(var(--nav-h) + 4rem) clamp(1.5rem,5vw,4rem) 6rem;
          max-width: 1100px; margin: 0 auto;
        }
        section#home {
          display: flex; align-items: center;
          padding-top: 0; min-height: 100vh;
        }
        section.alt-bg {
          max-width: 100%; background: var(--bg2);
          padding-left: clamp(1.5rem,5vw,4rem);
          padding-right: clamp(1.5rem,5vw,4rem);
        }
        section.alt-bg > .inner { max-width: 1100px; margin: 0 auto; }

        /* ── Section Label & Title ── */
        .section-label {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 0.75rem;
        }
        .section-label::before {
          content: ''; width: 28px; height: 1.5px; background: var(--accent);
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 400; line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--fg); margin-bottom: 1.5rem;
        }

        /* ── Hero ── */
        .hero-wrap {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center;
          width: 100%; padding: 6rem 0 4rem;
        }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--accent);
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
          border-radius: 100px; padding: 0.35rem 1rem;
          margin-bottom: 1.5rem;
          animation: fadeUp 0.8s ease both;
        }
        .hero-tag::before { content: '●'; font-size: 0.5rem; }
        .hero-name {
          font-family: var(--font-serif);
          font-size: clamp(2.8rem, 7vw, 5rem);
          font-weight: 400; line-height: 1.05;
          letter-spacing: -0.03em; color: var(--fg);
          animation: fadeUp 0.8s 0.1s ease both;
        }
        .hero-name em { font-style: normal; color: var(--accent); display: block; }
        .hero-role {
          margin-top: 1.25rem;
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: var(--fg2); line-height: 1.7;
          animation: fadeUp 0.8s 0.2s ease both;
          max-width: 480px;
        }
        .hero-btns {
          display: flex; flex-wrap: wrap; gap: 1rem;
          margin-top: 2.5rem;
          animation: fadeUp 0.8s 0.3s ease both;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--accent); color: #fff;
          border: none; border-radius: var(--radius);
          padding: 0.8rem 1.8rem; font-family: var(--font-body);
          font-size: 0.9rem; font-weight: 600; cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: var(--accent2); transform: translateY(-2px);
          box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 35%, transparent);
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: var(--fg);
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          padding: 0.8rem 1.8rem; font-family: var(--font-body);
          font-size: 0.9rem; font-weight: 500; cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .btn-secondary:hover {
          border-color: var(--accent); color: var(--accent);
          transform: translateY(-2px);
        }
        .hero-stats {
          display: flex; gap: 2.5rem; margin-top: 3rem;
          animation: fadeUp 0.8s 0.4s ease both;
        }
        .stat { display: flex; flex-direction: column; }
        .stat-n {
          font-family: var(--font-serif);
          font-size: 2rem; font-weight: 400; color: var(--accent); line-height: 1;
        }
        .stat-l { font-size: 0.8rem; color: var(--fg3); margin-top: 0.2rem; }
        .hero-visual { position: relative; animation: fadeIn 1s 0.3s ease both; }
        .hero-avatar-ring {
          width: clamp(260px, 38vw, 420px); aspect-ratio: 1;
          border-radius: 50% 40% 50% 40% / 40% 50% 40% 50%;
          background: linear-gradient(135deg,
            color-mix(in srgb, var(--accent) 20%, var(--bg2)) 0%,
            var(--bg3) 60%,
            color-mix(in srgb, var(--accent) 10%, var(--bg2)) 100%);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          box-shadow: var(--shadow2), inset 0 0 60px color-mix(in srgb, var(--accent) 8%, transparent);
          animation: morphBlob 8s ease-in-out infinite;
        }
        @keyframes morphBlob {
          0%,100% { border-radius: 50% 40% 50% 40% / 40% 50% 40% 50%; }
          33%      { border-radius: 60% 40% 60% 40% / 50% 60% 40% 50%; }
          66%      { border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%; }
        }
        .hero-initials {
          font-family: var(--font-serif);
          font-size: clamp(4rem, 10vw, 7rem);
          color: var(--accent); opacity: 0.18; user-select: none;
          letter-spacing: -0.04em;
        }
        .hero-badge {
          position: absolute; bottom: 10%; right: -5%;
          background: var(--card); border-radius: 14px;
          padding: 0.9rem 1.2rem;
          box-shadow: var(--shadow2); border: 1px solid var(--border);
          display: flex; align-items: center; gap: 0.75rem;
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .badge-icon  { font-size: 1.4rem; }
        .badge-text  { display: flex; flex-direction: column; }
        .badge-title { font-size: 0.8rem; font-weight: 600; color: var(--fg); }
        .badge-sub   { font-size: 0.72rem; color: var(--fg3); }
        .hero-badge2 {
          position: absolute; top: 8%; left: -8%;
          background: var(--card); border-radius: 14px;
          padding: 0.75rem 1rem;
          box-shadow: var(--shadow2); border: 1px solid var(--border);
          animation: float 5s 1s ease-in-out infinite;
        }
        .badge2-inner { display: flex; align-items: center; gap: 0.5rem; }
        .badge2-dot   { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }
        .badge2-text  { font-size: 0.78rem; font-weight: 500; color: var(--fg); }

        /* ── About ── */
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 5rem; align-items: start;
        }
        .about-lead {
          font-size: clamp(1.05rem, 2.2vw, 1.2rem);
          color: var(--fg2); line-height: 1.8; margin-bottom: 1.5rem;
        }
        .about-body {
          font-size: 0.95rem; color: var(--fg3);
          line-height: 1.85; margin-bottom: 1.5rem;
        }
        .about-values {
          list-style: none; display: flex; flex-direction: column;
          gap: 0.75rem; margin-top: 2rem;
        }
        .about-values li {
          display: flex; align-items: center; gap: 0.75rem;
          font-size: 0.9rem; color: var(--fg2);
        }
        .about-values li::before {
          content: ''; width: 6px; height: 6px;
          border-radius: 50%; background: var(--accent); flex-shrink: 0;
        }
        .about-aside { display: flex; flex-direction: column; gap: 1.5rem; }
        .about-card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 1.5rem;
          transition: box-shadow var(--transition), border-color var(--transition);
        }
        .about-card:hover { box-shadow: var(--shadow2); border-color: var(--accent); }
        .about-card-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
        .about-card h4 {
          font-family: var(--font-serif); font-size: 1.05rem;
          font-weight: 400; color: var(--fg); margin-bottom: 0.35rem;
        }
        .about-card p { font-size: 0.85rem; color: var(--fg3); line-height: 1.6; }

        /* ── Skills ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem; margin-top: 1rem;
        }
        .skill-item {
          background: var(--card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 1.25rem 1.5rem;
          transition: box-shadow var(--transition), border-color var(--transition),
                      opacity 0.6s ease, transform 0.6s ease;
        }
        .skill-item:hover { box-shadow: var(--shadow2); border-color: var(--accent); }
        .skill-header {
          display: flex; justify-content: space-between;
          align-items: baseline; margin-bottom: 0.75rem;
        }
        .skill-name  { font-size: 0.9rem; font-weight: 500; color: var(--fg); }
        .skill-pct   { font-size: 0.8rem; font-weight: 600; color: var(--accent); }
        .skill-track {
          height: 5px; background: var(--bg3);
          border-radius: 100px; overflow: hidden;
        }
        .skill-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          border-radius: 100px;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skill-cat {
          display: inline-block; margin-top: 0.6rem;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg3);
        }

        /* ── Experience ── */
        .exp-timeline {
          position: relative; padding-left: 2rem;
          display: flex; flex-direction: column; gap: 2.5rem;
          margin-top: 1.5rem;
        }
        .exp-timeline::before {
          content: ''; position: absolute;
          left: 0; top: 8px; bottom: 8px;
          width: 1.5px; background: var(--border);
        }
        .exp-card { position: relative; }
        .exp-dot {
          position: absolute; left: -2.45rem; top: 8px;
          width: 12px; height: 12px; border-radius: 50%;
          background: var(--accent);
          border: 3px solid var(--bg);
          box-shadow: 0 0 0 2px var(--accent);
        }
        .exp-content {
          background: var(--card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 1.75rem;
          transition: box-shadow var(--transition);
        }
        .exp-content:hover { box-shadow: var(--shadow2); }
        .exp-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 1rem;
          flex-wrap: wrap; margin-bottom: 1rem;
        }
        .exp-title {
          font-family: var(--font-serif); font-size: 1.2rem;
          font-weight: 400; color: var(--fg); margin-bottom: 0.2rem;
        }
        .exp-company { font-size: 0.88rem; font-weight: 600; color: var(--accent); }
        .exp-period {
          font-size: 0.8rem; color: var(--fg3);
          background: var(--bg2); border-radius: 100px;
          padding: 0.25rem 0.85rem; white-space: nowrap;
          flex-shrink: 0; border: 1px solid var(--border);
        }
        .exp-desc {
          font-size: 0.9rem; color: var(--fg2);
          line-height: 1.75; margin-bottom: 1rem;
        }
        .exp-achievements {
          list-style: none; display: flex; flex-direction: column; gap: 0.5rem;
        }
        .exp-achievements li {
          font-size: 0.875rem; color: var(--fg3);
          padding-left: 1rem; position: relative; line-height: 1.5;
        }
        .exp-achievements li::before {
          content: '→'; position: absolute; left: 0;
          color: var(--accent); font-size: 0.75rem;
        }

        /* ── Contact ── */
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: 4rem; align-items: start;
        }
        .contact-info { display: flex; flex-direction: column; gap: 1.5rem; }
        .contact-item {
          display: flex; align-items: flex-start; gap: 1rem;
          background: var(--card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 1.2rem 1.4rem;
        }
        .contact-item-icon {
          font-size: 1.3rem; flex-shrink: 0;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border-radius: 8px;
        }
        .contact-item-text label {
          display: block; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--fg3); margin-bottom: 0.2rem;
        }
        .contact-item-text span { font-size: 0.9rem; color: var(--fg2); }
        .contact-avail {
          background: color-mix(in srgb, #22c55e 10%, transparent);
          border: 1px solid color-mix(in srgb, #22c55e 30%, transparent);
          border-radius: var(--radius); padding: 1rem 1.4rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .avail-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(0.8); }
        }
        .avail-text { font-size: 0.88rem; font-weight: 500; color: var(--fg); }
        form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .field { display: flex; flex-direction: column; gap: 0.4rem; }
        .field label {
          font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg2);
        }
        .field input, .field textarea {
          background: var(--card); border: 1.5px solid var(--border);
          border-radius: 8px; padding: 0.75rem 1rem;
          font-family: var(--font-body); font-size: 0.9rem;
          color: var(--fg); outline: none;
          transition: border-color 0.2s, box-shadow 0.2s; resize: none;
        }
        .field input::placeholder, .field textarea::placeholder { color: var(--fg3); }
        .field input:focus, .field textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent);
        }
        .field textarea { min-height: 130px; }
        .btn-submit {
          display: inline-flex; align-items: center;
          justify-content: center; gap: 0.5rem;
          background: var(--accent); color: #fff;
          border: none; border-radius: var(--radius);
          padding: 0.9rem 2rem; font-family: var(--font-body);
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          align-self: flex-start;
        }
        .btn-submit:hover:not(:disabled) {
          background: var(--accent2); transform: translateY(-2px);
          box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 35%, transparent);
        }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .form-success {
          background: color-mix(in srgb, #22c55e 10%, transparent);
          border: 1px solid color-mix(in srgb, #22c55e 35%, transparent);
          border-radius: var(--radius); padding: 1rem 1.25rem;
          font-size: 0.9rem; color: #16a34a;
          display: flex; align-items: center; gap: 0.5rem;
        }

        /* ── Footer ── */
        footer {
          background: var(--bg2); border-top: 1px solid var(--border);
          padding: 2.5rem clamp(1.5rem,5vw,4rem);
        }
        .footer-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .footer-name {
          font-family: var(--font-serif); font-size: 1.1rem;
          font-weight: 400; color: var(--fg);
        }
        .footer-copy { font-size: 0.82rem; color: var(--fg3); }
        .footer-links { display: flex; gap: 1.5rem; }
        .footer-links button {
          background: none; border: none; cursor: pointer;
          font-size: 0.82rem; color: var(--fg3);
          text-transform: capitalize; font-family: var(--font-body);
          transition: color 0.2s;
        }
        .footer-links button:hover { color: var(--accent); }

        /* ── Keyframes ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-wrap    { grid-template-columns: 1fr; gap: 3rem; padding: 5rem 0 3rem; }
          .hero-visual  { display: flex; justify-content: center; order: -1; }
          .hero-avatar-ring { width: min(260px, 60vw); }
          .hero-badge2  { left: 0; }
          .about-grid   { grid-template-columns: 1fr; gap: 3rem; }
          .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 700px) {
          .nav-links    { display: none; }
          .hamburger    { display: flex; }
          section       { padding-left: 1.25rem; padding-right: 1.25rem; }
          .form-row     { grid-template-columns: 1fr; }
          .hero-stats   { flex-wrap: wrap; gap: 1.5rem; }
          .skills-grid  { grid-template-columns: 1fr; }
          .footer-inner { flex-direction: column; text-align: center; }
          .footer-links { justify-content: center; }
          .hero-badge   { right: 0; bottom: -5%; }
        }
        @media (max-width: 420px) {
          .hero-btns { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          .btn-submit  { width: 100%; }
        }
      `}</style>

      {/* ── Google Fonts ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── Navigation ── */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <span className="nav-logo" onClick={() => scrollTo("home")}>
            Alexandra<span>.</span>
          </span>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  className={activeSection === link ? "active" : ""}
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              className="btn-icon"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {dark ? "☀" : "☾"}
            </button>
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <button key={link} onClick={() => scrollTo(link)}>
            {link}
          </button>
        ))}
      </div>

      {/* ── Page Sections ── */}
      <Hero scrollTo={scrollTo} />
      <About />
      <Skills />
      <Experience />
      <Contact />

      {/* ── Footer ── */}
      <footer>
        <div className="footer-inner">
          <span className="footer-name">Alexandra Mitchell</span>
          <span className="footer-copy">
            © {new Date().getFullYear()} · Built with care
          </span>
          <div className="footer-links">
            {navLinks.map((link) => (
              <button key={link} onClick={() => scrollTo(link)}>
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
