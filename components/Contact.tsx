"use client";

import { useState } from "react";
import { FadeIn } from "./FadeIn";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setFormStatus("sent");
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setFormStatus("idle"), 4000);
  };

  return (
    <section id="contact">
      <FadeIn>
        <span className="section-label">Contact</span>
        <h2 className="section-title">Let&apos;s work together</h2>
      </FadeIn>

      <div className="contact-grid">
        {/* ── Left: Contact Info ── */}
        <FadeIn delay={100}>
          <div className="contact-info">
            <div className="contact-avail">
              <span className="avail-dot" />
              <span className="avail-text">
                Currently available for new roles
              </span>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📧</div>
              <div className="contact-item-text">
                <label>Email</label>
                <span>alexandra.mitchell@email.com</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📞</div>
              <div className="contact-item-text">
                <label>Phone</label>
                <span>+1 (212) 555-0193</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">🔗</div>
              <div className="contact-item-text">
                <label>LinkedIn</label>
                <span>linkedin.com/in/alexandramitchell</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div className="contact-item-text">
                <label>Location</label>
                <span>New York, NY · Remote OK</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Right: Contact Form ── */}
        <FadeIn delay={200}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Tell me about the role or opportunity…"
                required
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
              />
            </div>

            {formStatus === "sent" && (
              <div className="form-success">
                ✓ Message sent! I&apos;ll get back to you within 24 hours.
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending…" : "Send Message →"}
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
