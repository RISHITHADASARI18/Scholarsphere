"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Search, GraduationCap, Landmark, Building2, HeartHandshake, BookOpen, ShieldCheck, Sparkles, Menu, X, CheckCircle2 } from "lucide-react";

const levels = [
  { name: "School", detail: "Classes 1–10", icon: BookOpen },
  { name: "Intermediate", detail: "Classes 11–12", icon: GraduationCap },
  { name: "Diploma", detail: "Technical & vocational", icon: Building2 },
  { name: "Undergraduate", detail: "Bachelor’s degrees", icon: GraduationCap },
  { name: "Postgraduate", detail: "Master’s degrees", icon: BookOpen },
  { name: "Research", detail: "PhD & fellowships", icon: Sparkles },
];
const providers = [
  { name: "Government", detail: "Central, state & public institutions", icon: Landmark, tag: "PUBLIC SUPPORT" },
  { name: "Corporate", detail: "Company-led education initiatives", icon: Building2, tag: "PRIVATE SECTOR" },
  { name: "Foundations & NGOs", detail: "Non-profits creating opportunities", icon: HeartHandshake, tag: "COMMUNITY" },
  { name: "Universities", detail: "Institutional aid & fellowships", icon: GraduationCap, tag: "CAMPUS" },
];
const steps = [
  { number: "01", title: "Tell us what you’re looking for", text: "Search by course, education level, state, provider or a phrase that describes your goals." },
  { number: "02", title: "Explore the details", text: "Understand the benefits, eligibility rules, documents, selection process and important dates." },
  { number: "03", title: "Apply at the source", text: "When you find a fit, continue to the official scholarship provider’s website to apply." },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/scholarships?q=${encodeURIComponent(query.trim())}`;
  };

  return (
    <main>
      <nav className="nav-wrap">
        <div className="nav container">
          <a className="brand" href="#" aria-label="ScholarSphere home"><span className="brand-mark"><GraduationCap size={22}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
          <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#explore" onClick={() => setMenuOpen(false)}>Explore</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a className="nav-cta" href="#search" onClick={() => setMenuOpen(false)}>Find scholarships <ArrowUpRight size={16}/></a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span> SCHOLARSHIP DISCOVERY, REIMAGINED</div>
            <h1>Your ambition<br/>deserves <span>backing.</span></h1>
            <p className="hero-lede">Good opportunities shouldn’t be hard to find. Discover scholarships from across India, understand what fits, and take your next step with confidence.</p>
            <form id="search" className="search-box" onSubmit={submitSearch}>
              <Search size={21} className="search-icon"/>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Try “B.Tech scholarships in Telangana”" aria-label="Search scholarships"/>
              <button type="submit">Search <ArrowRight size={17}/></button>
            </form>
            <div className="hero-hint"><Sparkles size={15}/> Search by course, state, education level or provider</div>
            <a href="#explore" className="text-link">Explore opportunities <ArrowDown size={15}/></a>
          </div>
          <div className="hero-art" aria-label="Illustration of scholarship discovery">
            <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
            <div className="art-glow"></div>
            <div className="floating-chip chip-top"><span className="chip-icon"><CheckCircle2 size={17}/></span><span><b>Find your fit</b><small>Opportunities that match</small></span></div>
            <div className="visual-card">
              <div className="visual-top"><span>YOUR NEXT CHAPTER</span><span className="live-dot"></span></div>
              <div className="visual-symbol"><GraduationCap size={46} strokeWidth={1.35}/></div>
              <div className="visual-title">Make room<br/>for what’s next.</div>
              <div className="visual-line"></div>
              <div className="visual-bottom"><span>DISCOVER · COMPARE · GROW</span><ArrowUpRight size={18}/></div>
            </div>
            <div className="floating-chip chip-bottom"><span className="mini-stars">✳</span><span><b>Across India</b><small>One place to start</small></span></div>
            <div className="art-caption">A little support can take you a long way.</div>
          </div>
        </div>
        <div className="hero-bottom container"><span>MADE FOR EVERY LEARNING JOURNEY</span><span className="bottom-line"></span><span>INDIA · ALL LEVELS · MORE POSSIBILITIES</span></div>
      </section>

      <section className="trust-strip"><div className="container trust-inner"><div><ShieldCheck size={20}/><span>Information-first, student-focused</span></div><div><Landmark size={20}/><span>Government & private opportunities</span></div><div><ArrowUpRight size={20}/><span>Apply directly with official providers</span></div></div></section>

      <section className="section container" id="explore">
        <div className="section-heading">
          <div><div className="eyebrow dark-eyebrow">START WITH WHAT YOU KNOW</div><h2>Explore what’s<br/><em>possible.</em></h2></div>
          <p>Scholarships come in many forms. Start with your stage of education or explore the organisations that make learning more accessible.</p>
        </div>
        <div className="level-grid">
          {levels.map((item, i) => { const Icon = item.icon; return <a href={`/scholarships?level=${encodeURIComponent(item.name)}`} className="level-card" key={item.name}><span className="level-number">0{i+1}</span><span className="level-icon"><Icon size={22}/></span><span className="level-name">{item.name}</span><span className="level-detail">{item.detail}</span><ArrowUpRight className="level-arrow" size={18}/></a>; })}
        </div>
      </section>

      <section className="provider-section">
        <div className="container">
          <div className="section-heading provider-heading"><div><div className="eyebrow">OPPORTUNITIES COME FROM EVERYWHERE</div><h2>Explore by<br/><em>provider.</em></h2></div><p>From public programmes to private foundations, discover the different sources of education support.</p></div>
          <div className="provider-grid">{providers.map((item) => { const Icon = item.icon; return <a href={`/scholarships?provider=${encodeURIComponent(item.name)}`} className="provider-card" key={item.name}><span className="provider-tag">{item.tag}</span><span className="provider-icon"><Icon size={24}/></span><h3>{item.name}</h3><p>{item.detail}</p><span className="provider-link">Explore scholarships <ArrowUpRight size={16}/></span></a>; })}</div>
        </div>
      </section>

      <section className="how-section container" id="how-it-works">
        <div className="how-intro"><div className="eyebrow dark-eyebrow">NO GUESSWORK. JUST A CLEARER START.</div><h2>Three steps.<br/><em>A world of options.</em></h2><p>ScholarSphere makes scholarship discovery easier, so you can spend less time hunting for information and more time moving forward.</p><a href="#search" className="dark-button">Start exploring <ArrowUpRight size={17}/></a></div>
        <div className="steps">{steps.map((step) => <div className="step" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><ArrowUpRight className="step-arrow" size={19}/></div>)}</div>
      </section>

      <section className="closing-section" id="about"><div className="container closing-inner"><div className="closing-orb">✳</div><div className="eyebrow">YOUR NEXT STEP STARTS HERE</div><h2>Find the support.<br/><span>Make it count.</span></h2><p>Explore scholarship information, check the details, and connect with the official provider.</p><a className="closing-button" href="#search">Find scholarships <ArrowUpRight size={17}/></a></div></section>

      <footer className="footer"><div className="container footer-main"><a className="brand footer-brand" href="#"><span className="brand-mark"><GraduationCap size={22}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></a><p>Better access to opportunity<br/>starts with better information.</p><div className="footer-links"><a href="#how-it-works">How it works</a><a href="#explore">Explore</a><a href="#about">About</a></div></div><div className="container footer-bottom"><span>© 2026 ScholarSphere</span><span>Scholarship discovery, not application processing.</span><span>Built for possibilities <span className="footer-star">✳</span></span></div></footer>
    </main>
  );
}
