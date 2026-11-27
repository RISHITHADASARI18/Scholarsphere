import Link from "next/link";
import LevelScholarshipListings from "@/components/level-scholarship-listings";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, Landmark, HeartHandshake, Search, ShieldCheck, Microscope, Award, Globe2 } from "lucide-react";

const supportTypes = [
  { icon: Microscope, title: "Research fellowships", text: "Some programmes provide financial support for doctoral research, projects or approved research activities." },
  { icon: Award, title: "Merit & achievement awards", text: "Funding may recognise academic excellence, research potential, publications or prior achievements." },
  { icon: Globe2, title: "Research mobility", text: "Selected opportunities support conferences, academic exchanges, visiting research or study in another location." },
  { icon: HeartHandshake, title: "Institutional support", text: "Universities, laboratories and foundations may offer assistantships, grants or discipline-specific funding." },
];
const checklist = ["Admission, registration or affiliation with an eligible institution","Research area, proposal and supervisor requirements, if applicable","Academic record, entrance tests or selection interview criteria","Funding duration, stipend or grant coverage and permitted expenses","Progress reviews, renewal conditions, deadlines and official application process"];

export default function ResearchPage() {
  return <main className="school-page">
    <div className="school-announcement">RESEARCH FUNDING &amp; FELLOWSHIPS <span>•</span> PhD &amp; RESEARCH PROGRAMMES <span>•</span> INDIA-WIDE DISCOVERY</div>
    <header className="school-nav">
      <Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={22}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link>
      <Link href="/" className="school-back"><ArrowLeft size={16}/> Back to home</Link>
    </header>
    <section className="school-hero">
      <div className="school-hero-inner">
        <div className="eyebrow dark-eyebrow">SUPPORT THE QUESTIONS THAT MOVE US FORWARD</div>
        <h1>Make room for<br/><em>discovery.</em></h1>
        <p>Explore information about PhD scholarships, research fellowships, grants and academic research support. Understand the opportunity and its requirements, then visit the official institution or funding body to apply.</p>
        <form className="school-search" action="/scholarships" method="get"><Search size={20}/><input type="search" name="q" placeholder="Search PhD fellowships, research area or institute…" aria-label="Search research funding"/><input type="hidden" name="level" value="Research"/><button type="submit">Search <ArrowRight size={16}/></button></form>
        <div className="school-search-note">Try searches like “PhD fellowship”, “research grant” or a subject area.</div>
      </div>
      <div className="school-hero-aside"><div className="school-aside-icon"><Microscope size={35}/></div><span>RESEARCH &amp; FELLOWSHIPS</span><strong>Turn questions<br/>into knowledge.</strong><p>Find information about support for investigation, innovation and advanced study.</p><div className="school-aside-rule"></div><small>QUESTION · INVESTIGATE · DISCOVER</small></div>
    </section>
    <section className="school-content">
      <div className="school-section-heading"><div><div className="eyebrow dark-eyebrow">FUNDING FOR RESEARCH</div><h2>Back the work<br/><em>that matters.</em></h2></div><p>Research support may be offered by government agencies, universities, research centres, foundations and international academic programmes.</p></div>
      <div className="school-support-grid">{supportTypes.map(({icon:Icon,title,text},i)=><article className="school-support-card" key={title}><span className="school-card-number">0{i+1}</span><span className="school-support-icon"><Icon size={23}/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="school-source-section"><div className="school-source-inner"><div className="eyebrow">WHERE TO LOOK</div><h2>Find the right<br/><em>research pathway.</em></h2><p>Explore official fellowship notifications, university and institute research pages, government funding-agency announcements and recognised foundations. Always check the eligible disciplines, host institutions and current call details.</p><div className="school-source-points">
      <div><Landmark size={20}/><span><b>Public funding agencies</b><small>Check official calls, fellowship notices and research grant announcements.</small></span></div>
      <div><GraduationCap size={20}/><span><b>Universities &amp; research institutes</b><small>Review doctoral admissions, assistantships and institute-funded opportunities.</small></span></div>
      <div><ShieldCheck size={20}/><span><b>Confirm each call</b><small>Verify the current application window and conditions with the funding body.</small></span></div>
    </div></div></section>
    <section className="school-check-section"><div className="eyebrow dark-eyebrow">BEFORE YOU APPLY</div><h2>Understand the<br/><em>research terms.</em></h2><p className="school-check-lede">Research funding can have specific academic and institutional conditions. Check the official call carefully.</p>
      <div className="school-checklist">{checklist.map((item,i)=><div className="school-check-item" key={item}><span>0{i+1}</span><p>{item}</p></div>)}</div>
      <div className="school-disclaimer"><ShieldCheck size={19}/><p>ScholarSphere is a scholarship and research-funding discovery platform. Applications are completed through the official provider or institution. We do not collect documents or guarantee eligibility, funding or selection.</p></div>
    </section>
    <section className="school-cta"><div className="eyebrow">YOUR RESEARCH JOURNEY STARTS HERE</div><h2>Find support for<br/><span>your next discovery.</span></h2><p>Search research funding information and confirm every detail with the official funding body.</p>
      <form className="school-search school-search-cta" action="/scholarships" method="get"><Search size={19}/><input type="search" name="q" placeholder="Search research fellowships and grants…" aria-label="Search research funding"/><input type="hidden" name="level" value="Research"/><button type="submit">Search <ArrowRight size={16}/></button></form>
      <Link href="/" className="school-home-link"><ArrowLeft size={15}/> Back to ScholarSphere home</Link></section>
    <footer className="school-footer"><Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={20}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link><span>© 2026 ScholarSphere · Scholarship discovery, not application processing.</span></footer>
  </main>;
}