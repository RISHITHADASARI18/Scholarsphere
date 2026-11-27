import Link from "next/link";
import LevelScholarshipListings from "@/components/level-scholarship-listings";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, Landmark, HeartHandshake, Search, ShieldCheck, Wallet, Award, Users } from "lucide-react";

const supportTypes = [
  { icon: Wallet, title: "Financial assistance", text: "Some programmes support tuition fees, study materials, examination costs or other education-related expenses." },
  { icon: Award, title: "Merit scholarships", text: "Awards may recognise academic performance, subject excellence, achievements or potential." },
  { icon: HeartHandshake, title: "Need-based support", text: "Some providers consider family income and financial circumstances as part of eligibility." },
  { icon: Users, title: "Targeted opportunities", text: "Certain schemes are intended for particular communities, regions, subjects or student circumstances." },
];

const checklist = [
  "Current Class 11 or 12 enrolment and school details",
  "Class 10 marks and current academic performance, as required",
  "Chosen stream or subject combination, where relevant",
  "Family income, residence or category criteria, if applicable",
  "Official application dates, documents and renewal conditions",
];

export default function IntermediateScholarshipsPage() {
  return (
    <main className="school-page">
      <div className="school-announcement">SCHOLARSHIPS FOR INTERMEDIATE STUDENTS <span>•</span> CLASSES 11–12 <span>•</span> INDIA-WIDE DISCOVERY</div>
      <header className="school-nav">
        <Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={22}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link>
        <Link href="/" className="school-back"><ArrowLeft size={16}/> Back to home</Link>
      </header>

      <section className="school-hero">
        <div className="school-hero-inner">
          <div className="eyebrow dark-eyebrow">YOUR NEXT ACADEMIC CHAPTER</div>
          <h1>Keep your goals<br/><em>within reach.</em></h1>
          <p>Explore scholarship information for students in Classes 11 and 12, across Science, Commerce and Humanities. Understand the requirements, compare opportunities and continue to the official provider to apply.</p>
          <form className="school-search" action="/scholarships" method="get">
            <Search size={20}/>
            <input type="search" name="q" placeholder="Search Class 11–12 scholarships, stream or state…" aria-label="Search intermediate scholarships"/>
            <input type="hidden" name="level" value="Intermediate"/>
            <button type="submit">Search <ArrowRight size={16}/></button>
          </form>
          <div className="school-search-note">Try searches like “Class 11 scholarship”, “Intermediate scholarship Telangana” or a provider name.</div>
        </div>
        <div className="school-hero-aside">
          <div className="school-aside-icon"><BookOpen size={35}/></div>
          <span>CLASSES 11 &amp; 12</span>
          <strong>Make this<br/>stage count.</strong>
          <p>Explore support for the years that shape your next step in education.</p>
          <div className="school-aside-rule"></div>
          <small>LEARN · DISCOVER · GROW</small>
        </div>
      </section>

      <LevelScholarshipListings level="Intermediate" />
  <section className="school-content">
        <div className="school-section-heading">
          <div><div className="eyebrow dark-eyebrow">SUPPORT FOR THE NEXT STEP</div><h2>More room to<br/><em>keep learning.</em></h2></div>
          <p>Intermediate-level support may come from government departments, foundations, companies and educational institutions. Eligibility, benefits and deadlines vary by programme.</p>
        </div>
        <div className="school-support-grid">
          {supportTypes.map(({icon: Icon,title,text},index) => <article className="school-support-card" key={title}><span className="school-card-number">0{index+1}</span><span className="school-support-icon"><Icon size={23}/></span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="school-source-section">
        <div className="school-source-inner">
          <div className="eyebrow">WHERE TO LOOK</div>
          <h2>Find reliable<br/><em>information.</em></h2>
          <p>Look for opportunities from central and state government departments, recognised foundations, education-focused organisations and institutions. Confirm that the scholarship covers Classes 11–12 and your academic stream before relying on it.</p>
          <div className="school-source-points">
            <div><Landmark size={20}/><span><b>Government schemes</b><small>Review official central and state portals and department notifications.</small></span></div>
            <div><HeartHandshake size={20}/><span><b>Foundations and organisations</b><small>Check the provider’s own eligibility rules, benefits and application schedule.</small></span></div>
            <div><ShieldCheck size={20}/><span><b>Verify each opportunity</b><small>Use the original notification or official provider website as the final source.</small></span></div>
          </div>
        </div>
      </section>

      <section className="school-check-section">
        <div className="eyebrow dark-eyebrow">BEFORE YOU APPLY</div>
        <h2>Know what the<br/><em>provider expects.</em></h2>
        <p className="school-check-lede">Requirements differ between scholarships. Use this as a guide to the details you may need to check.</p>
        <div className="school-checklist">{checklist.map((item,index)=><div className="school-check-item" key={item}><span>0{index+1}</span><p>{item}</p></div>)}</div>
        <div className="school-disclaimer"><ShieldCheck size={19}/><p>ScholarSphere is a scholarship discovery and information platform. Applications are completed on the provider’s official website. We do not collect documents or guarantee eligibility or selection.</p></div>
      </section>

      <section className="school-cta">
        <div className="eyebrow">YOUR SEARCH STARTS HERE</div>
        <h2>Explore what could<br/><span>come next.</span></h2>
        <p>Search for intermediate-level scholarship information and confirm every detail with its official provider.</p>
        <form className="school-search school-search-cta" action="/scholarships" method="get"><Search size={19}/><input type="search" name="q" placeholder="Search intermediate scholarships…" aria-label="Search intermediate scholarships"/><input type="hidden" name="level" value="Intermediate"/><button type="submit">Search <ArrowRight size={16}/></button></form>
        <Link href="/" className="school-home-link"><ArrowLeft size={15}/> Back to ScholarSphere home</Link>
      </section>
      <footer className="school-footer"><Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={20}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link><span>© 2026 ScholarSphere · Scholarship discovery, not application processing.</span></footer>
    </main>
  );
}
