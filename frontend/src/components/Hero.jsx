import React, { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero({ onCtaClick }) {
  const badgeRef = useRef(null);

  useEffect(() => {
    // Staggered entrance animations via CSS custom properties
    const els = document.querySelectorAll('.hero-animate');
    els.forEach((el, i) => {
      el.style.animationDelay = `${0.15 + i * 0.15}s`;
    });
  }, []);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Background grid */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow1" aria-hidden="true" />
      <div className="hero-glow2" aria-hidden="true" />

      <div className="container hero-content">
        {/* Badge */}
        <div className="hero-badge hero-animate" ref={badgeRef}>
          <div className="badge-line" aria-hidden="true" />
          Digital-first Agency — Est. 2020
        </div>

        {/* Headline */}
        <h1 className="hero-heading hero-animate">
          We build<br />
          <span className="heading-grad">digital</span>
          <br />
          <span className="heading-outline">futures.</span>
        </h1>

        {/* Sub */}
        <p className="hero-sub hero-animate">
          Strategy, design, and engineering for companies that refuse to blend in.
          From startups to enterprises — we ship products that matter.
        </p>

        {/* CTAs */}
        <div className="hero-btns hero-animate">
          <button className="btn-fill" onClick={scrollToWork}>
            See our work <span aria-hidden="true">→</span>
          </button>
          <button className="btn-outline" onClick={onCtaClick}>
            Start a project
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats hero-animate">
          <div className="stat">
            <div className="stat-num">200+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-num">94%</div>
            <div className="stat-label">Retention</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-num">5 yrs</div>
            <div className="stat-label">Experience</div>
          </div>
        </div>

        {/* Client logos */}
        <div className="hero-clients hero-animate">
          <span className="clients-label">Trusted by</span>
          <div className="clients-logos">
            {['ORBITAL','STRATUM','VAULTX','PRISM CO','MERIDIAN'].map(name => (
              <span key={name} className="client-logo">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button className="scroll-down hero-animate" onClick={scrollToWork} aria-label="Scroll to work">
        <div className="scroll-line" aria-hidden="true" />
        <span>Scroll</span>
      </button>
    </section>
  );
}
