import React, { useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import './styles/global.css';

import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import { Marquee, Work, Process, Team, Footer } from './components/Sections';
import Services from './components/Services';
import Contact  from './components/Contact';

export default function App() {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Noise overlay */}
      <div className="noise" aria-hidden="true" />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg3)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            fontSize: '14px',
          },
        }}
      />

      {/* Fixed navbar */}
      <Navbar />

      {/* Page content */}
      <main>
        <Hero onCtaClick={scrollToContact} />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <Team />
        <Contact ref={contactRef} />
      </main>

      <Footer />
    </>
  );
}
