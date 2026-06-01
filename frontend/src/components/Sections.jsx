import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './Sections.css';

/* ══════════════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════════════ */
const MQ_ITEMS = ['UI/UX Design','Web Development','Brand Strategy','Motion Design','Product Strategy','Growth Marketing'];

export function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {[...MQ_ITEMS, ...MQ_ITEMS].map((item, i) => (
          <div key={i} className="mq-item">
            {item} <span className="mq-dot">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   WORK
══════════════════════════════════════════════════════ */
const WORK_ITEMS = [
  { cat: 'design brand', tag: 'Design System · SaaS',  name: 'Orbital — Enterprise\nDesign Platform', bg: 'bg1' },
  { cat: 'dev',          tag: 'Web App · Fintech',      name: 'VaultX Dashboard',                      bg: 'bg2' },
  { cat: 'brand',        tag: 'Brand Identity',          name: 'Meridian Rebrand',                      bg: 'bg3' },
  { cat: 'design dev',   tag: 'Product · E-commerce',   name: 'Prism Shop',                             bg: 'bg4' },
];

export function Work() {
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="work" className="work-section section-pad">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`reveal${inView ? ' visible' : ''}`}>
            <div className="eyebrow">Portfolio</div>
            <h2 className="section-title">Selected <span className="hi2">work</span></h2>
          </div>
          <div className={`work-filter reveal${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            {['all','design','dev','brand'].map(f => (
              <button
                key={f}
                className={`wf-btn${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="work-grid">
          {WORK_ITEMS.map((item, i) => {
            const filtered = filter !== 'all' && !item.cat.includes(filter);
            return (
              <div key={i} className={`wk-card${filtered ? ' filtered' : ''}`}>
                <div className="wk-inner">
                  <div className={`wk-bg ${item.bg}`} />
                  <div className="wk-overlay" />
                  <div className="wk-arrow" aria-hidden="true">↗</div>
                  <div className="wk-info">
                    <div className="wk-tag">{item.tag}</div>
                    <div className="wk-name">{item.name.replace('\\n', '\n')}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROCESS
══════════════════════════════════════════════════════ */
const STEPS = [
  { num: '01', title: 'Discovery',            body: 'We dig deep into your business, audience, and goals. Workshops, audits, competitive analysis — we learn what makes you tick.' },
  { num: '02', title: 'Strategy & Definition', body: 'From insights to direction. We define scope, set KPIs, and create a roadmap that aligns your team.' },
  { num: '03', title: 'Design & Build',        body: 'Iterative, collaborative, and fast. We design in sprints and build in parallel — no big reveals.' },
  { num: '04', title: 'Launch & Grow',         body: 'Ongoing support, performance tracking, and iteration cycles keep your product improving after launch.' },
];
const METRICS = [
  { label: 'Average delivery', val: '6', unit: 'wks' },
  { label: 'Client retention',  val: '94', unit: '%' },
  { label: 'Projects shipped',  val: '200', unit: '+' },
  { label: 'Years in business', val: '5',  unit: 'yrs' },
];

export function Process() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="process" className="process-section section-pad">
      <div className="container">
        <div ref={ref} className={`reveal${inView ? ' visible' : ''}`}>
          <div className="eyebrow">How it works</div>
          <h2 className="section-title">Our proven <span className="hi">process</span></h2>
        </div>

        <div className="proc-grid">
          <div className={`reveal${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            {STEPS.map(s => (
              <div key={s.num} className="proc-step">
                <div className="ps-num">{s.num}</div>
                <div>
                  <div className="ps-title">{s.title}</div>
                  <p className="ps-body">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`proc-metrics reveal${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            {METRICS.map(m => (
              <div key={m.label} className="pm-row">
                <div className="pm-label">{m.label}</div>
                <div className="pm-val">{m.val}<span>{m.unit}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   TEAM
══════════════════════════════════════════════════════ */
const TEAM = [
  { initials: 'KL', name: 'Kai Lorenz',  role: 'Founder & Creative Director', cls: 'ava1', skills: ['Branding','Strategy','UX'] },
  { initials: 'MO', name: 'Maya Osei',   role: 'Lead Engineer',               cls: 'ava2', skills: ['React','Node','DevOps'] },
  { initials: 'RN', name: 'Ravi Nair',   role: 'Design Lead',                 cls: 'ava3', skills: ['Figma','Motion','Systems'] },
  { initials: 'ZA', name: 'Zara Ahmed',  role: 'Growth Strategist',           cls: 'ava4', skills: ['SEO','Ads','Analytics'] },
];

export function Team() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="team" className="team-section section-pad">
      <div className="container">
        <div ref={ref} className={`reveal${inView ? ' visible' : ''}`}>
          <div className="eyebrow">The people</div>
          <h2 className="section-title">Meet the <span className="hi2">team</span></h2>
        </div>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={`tm-card reveal${inView ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={`tm-ava ${m.cls}`}>{m.initials}</div>
              <div className="tm-name">{m.name}</div>
              <div className="tm-role">{m.role}</div>
              <div className="tm-skills">
                {m.skills.map(s => <span key={s} className="tm-skill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════ */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="ft-top">
          <div>
            <div className="ft-brand">
              <div className="ft-brand-dot" />
              Nexus
            </div>
            <p className="ft-about">A digital-first agency building exceptional brands and products for companies that want to lead.</p>
            <div className="ft-socials">
              {['𝕏','in','Dr','gh'].map(s => (
                <a key={s} href="#!" className="ft-soc">{s}</a>
              ))}
            </div>
          </div>
          <div className="ft-col">
            <h4>Studio</h4>
            <ul>
              {['Services','Work','Process','Team','Contact'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="ft-col">
            <h4>Services</h4>
            <ul>
              {['Design Systems','Web Development','Brand Strategy','Growth'].map(l => (
                <li key={l}><a href="#services">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="ft-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@nexus.studio">hello@nexus.studio</a></li>
              <li><a href="#contact">Start a project</a></li>
              <li><a href="#!">Careers</a></li>
              <li><a href="#!">Press</a></li>
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <div className="ft-copy">© {new Date().getFullYear()} Nexus Studio. All rights reserved.</div>
          <div className="ft-legal">
            <a href="#!">Privacy</a>
            <a href="#!">Terms</a>
            <a href="#!">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
