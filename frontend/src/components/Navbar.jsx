import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Navbar.css';

const NAV_ITEMS = [
  { label: 'Services',     section: 'services' },
  { label: 'Work',         section: 'work' },
  { label: 'Process',      section: 'process' },
  { label: 'Team',         section: 'team' },
  { label: 'Contact',      section: 'contact' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [activeSection, setActive]    = useState('');
  const [menuOpen,    setMenuOpen]    = useState(false);

  /* ── Scroll handler ── */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 60);

    // progress bar
    const total = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(total > 0 ? (scrollY / total) * 100 : 0);

    // active section
    const sections = NAV_ITEMS.map(i => i.section);
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - 120) current = id;
    });
    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Lock body scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Scroll to section ── */
  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Main navbar ── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
          <div className="logo-dot" aria-hidden="true" />
          Nexus
        </a>

        {/* Desktop links */}
        <div className="nav-links" role="menubar">
          {NAV_ITEMS.map(({ label, section }) => (
            <button
              key={section}
              className={`nav-link${activeSection === section ? ' active' : ''}`}
              onClick={() => scrollTo(section)}
              role="menuitem"
              aria-current={activeSection === section ? 'true' : undefined}
            >
              {label}
            </button>
          ))}
          <button className="nav-cta" onClick={() => scrollTo('contact')} aria-label="Start project">
            Start project
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        {/* Scroll progress */}
        <div
          className="nav-progress"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />
      </nav>

      {/* ── Mobile overlay menu ── */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map(({ label, section }) => (
          <button
            key={section}
            className="mob-link"
            onClick={() => scrollTo(section)}
          >
            {label}
          </button>
        ))}
        <button className="mob-cta" onClick={() => scrollTo('contact')}>
          Start project →
        </button>
      </div>
    </>
  );
}
