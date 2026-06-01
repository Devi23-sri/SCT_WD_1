import React from 'react';
import { useInView } from 'react-intersection-observer';
import './Sections.css';

const SERVICES = [
  { num: '01', icon: '🎨', title: 'Design Systems',     body: 'From brand foundations to full component libraries. Systems that empower your team and delight your users.' },
  { num: '02', icon: '⚡', title: 'Web & App Dev',      body: 'Performant, accessible, beautifully engineered. We build with modern stacks — React, Next.js, and beyond.' },
  { num: '03', icon: '📡', title: 'Growth & Strategy',  body: 'Data-driven thinking, human-led execution. We help you find your market and grow with intent.' },
];

function ServiceCard({ num, icon, title, body, delay }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  return (
    <div
      ref={ref}
      className={`srv-card reveal${inView ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="srv-num">{num}</div>
      <span className="srv-icon" aria-hidden="true">{icon}</span>
      <div className="srv-title">{title}</div>
      <p className="srv-body">{body}</p>
      <span className="srv-link">Learn more →</span>
    </div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="services" className="services-section section-pad">
      <div className="container">
        <div className="section-header">
          <div ref={ref} className={`reveal${inView ? ' visible' : ''}`}>
            <div className="eyebrow">What we do</div>
            <h2 className="section-title">Our <span className="hi">core</span><br />capabilities</h2>
          </div>
        </div>
        <div className="srv-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
