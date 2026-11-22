import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, Landmark, HeartHandshake, Search, ShieldCheck, Wallet, Award, Users } from "lucide-react";

const supportTypes = [
  { icon: Wallet, title: "Tuition & fee support", text: "Scholarships may help with tuition, academic fees, living costs or other approved study expenses." },
  { icon: Award, title: "Merit-based awards", text: "Some programmes recognise strong academic records, entrance results, achievements or subject excellence." },
  { icon: HeartHandshake, title: "Need-based assistance", text: "Certain providers consider family income and financial circumstances alongside academic requirements." },
  { icon: Users, title: "Course-specific support", text: "Opportunities may be limited to particular disciplines, institutions, regions or student groups." },
];
const checklist = ["Admission or enrolment in an eligible postgraduate programme","Bachelor’s degree marks, CGPA or entrance examination results","Course, institution and study-mode requirements","Family income, residence or category criteria, where applicable","Funding coverage, renewal rules, deadlines and required documents"];

export default function PostgraduatePage() {
  return <main className="school-page">
    <div className="school-announcement">SCHOLARSHIPS FOR POSTGRADUATE STUDENTS <span>•</span> MASTER’S &amp; ADVANCED DEGREES <span>•</span> INDIA-WIDE DISCOVERY</div>
    <header className="school-nav">
      <Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={22}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link>
      <Link href="/" className="school-back"><ArrowLeft size={16}/> Back to home</Link>
    </header>
    <section className="school-hero">
      <div className="school-hero-inner">
        <div className="eyebrow dark-eyebrow">TAKE YOUR EDUCATION FURTHER</div>
        <h1>Go further with<br/><em>your ambitions.</em></h1>
        <p>Explore scholarship information for postgraduate study, including master’s degrees and other advanced programmes. Compare funding opportunities, understand eligibility and continue to the official provider to apply.</p>
        <form className="school-search" action="/scholarships" method="get"><Search size={20}/><input type="search" name="q" placeholder="Search master’s scholarships, course or state…" aria-label="Search postgraduate scholarships"/><input type="hidden" name="level" value="Postgraduate"/><button type="submit">Search <ArrowRight size={16}/></button></form>
        <div className="school-search-note">Try searches like “M.Tech scholarship”, “MBA scholarship” or a postgraduate course name.</div>
      </div>
      <div className="school-hero-aside"><div className="school-aside-icon"><BookOpen size={35}/></div><span>POSTGRADUATE STUDY</span><strong>Build on<br/>what you know.</strong><p>Discover support for deeper learning, specialisation and your next qualification.</p><div className="school-aside-rule"></div><small>LEARN · SPECIALISE · GROW</small></div>
    </section>
    <section className="school-content">
      <div className="school-section-heading"><div><div className="eyebrow dark-eyebrow">FUNDING FOR YOUR NEXT DEGREE</div><h2>Make space for<br/><em>what’s next.</em></h2></div><p>Postgraduate funding can come from government programmes, universities, research institutions, companies and independent foundations. Each opportunity has its own rules.</p></div>
      <div className="school-support-grid">{supportTypes.map(({icon:Icon,title,text},i)=><article className="school-support-card" key={title}><span className="school-card-number">0{i+1}</span><span className="school-support-icon"><Icon size={23}/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="school-source-section"><div className="school-source-inner"><div className="eyebrow">WHERE TO LOOK</div><h2>Explore trusted<br/><em>funding sources.</em></h2><p>Check official government scholarship portals, university financial-aid pages, recognised foundations and programme-specific funding announcements. Confirm that the opportunity supports your exact degree and institution.</p><div className="school-source-points">
      <div><Landmark size={20}/><span><b>Government programmes</b><small>Review current central and state schemes and their official notifications.</small></span></div>
      <div><GraduationCap size={20}/><span><b>Universities &amp; institutions</b><small>Check institutional scholarships, fee waivers and department funding.</small></span></div>
      <div><ShieldCheck size={20}/><span><b>Verify the details</b><small>Use the original provider website to confirm benefits, eligibility and dates.</small></span></div>
    </div></div></section>
    <section className="school-check-section"><div className="eyebrow dark-eyebrow">BEFORE YOU APPLY</div><h2>Check the details<br/><em>that matter.</em></h2><p className="school-check-lede">Eligibility varies by programme. Use this checklist to understand what to verify before applying.</p>
      <div className="school-checklist">{checklist.map((item,i)=><div className="school-check-item" key={item}><span>0{i+1}</span><p>{item}</p></div>)}</div>
      <div className="school-disclaimer"><ShieldCheck size={19}/><p>ScholarSphere is a scholarship discovery and information platform. Applications are completed on the provider’s official website. We do not collect documents or guarantee eligibility or selection.</p></div>
    </section>
    <section className="school-cta"><div className="eyebrow">YOUR NEXT DEGREE STARTS HERE</div><h2>Find support for<br/><span>your next chapter.</span></h2><p>Search postgraduate scholarship information and verify every detail with its official provider.</p>
      <form className="school-search school-search-cta" action="/scholarships" method="get"><Search size={19}/><input type="search" name="q" placeholder="Search postgraduate scholarships…" aria-label="Search postgraduate scholarships"/><input type="hidden" name="level" value="Postgraduate"/><button type="submit">Search <ArrowRight size={16}/></button></form>
      <Link href="/" className="school-home-link"><ArrowLeft size={15}/> Back to ScholarSphere home</Link></section>
    <footer className="school-footer"><Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={20}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link><span>© 2026 ScholarSphere · Scholarship discovery, not application processing.</span></footer>
  </main>;
}