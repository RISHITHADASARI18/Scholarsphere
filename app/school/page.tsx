import Link from "next/link";
import SchoolListings from "./school-listings";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, Landmark, HeartHandshake, Search, ShieldCheck, Wallet, Award, Users } from "lucide-react";

const supportTypes = [
  { icon: Wallet, title: "Financial assistance", text: "Some programmes help with tuition fees, school expenses, learning materials or other education-related costs." },
  { icon: Award, title: "Merit scholarships", text: "Awards may recognise strong academic performance, talent, achievements or progress in school." },
  { icon: HeartHandshake, title: "Need-based support", text: "Some providers consider family income or financial circumstances when deciding who can receive support." },
  { icon: Users, title: "Targeted opportunities", text: "Certain schemes are designed for specific groups or circumstances. The exact rules differ by programme." },
];

const checklist = [
  "Current class or grade and school details",
  "Academic marks or previous examination results",
  "Family income criteria, if the scholarship has them",
  "State, residence or category requirements, where applicable",
  "The application dates and documents listed by the official provider",
];

export default function SchoolScholarshipsPage() {
  return (
    <main className="school-page">
      <div className="school-announcement">SCHOLARSHIPS FOR SCHOOL STUDENTS <span>•</span> CLASSES 1–10 <span>•</span> INDIA-WIDE DISCOVERY</div>
      <header className="school-nav">
        <Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={22}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link>
        <Link href="/" className="school-back"><ArrowLeft size={16}/> Back to home</Link>
      </header>

      <section className="school-hero">
        <div className="school-hero-inner">
          <div className="eyebrow dark-eyebrow">A STRONG START SHOULD BE WITHIN REACH</div>
          <h1>Support for every<br/><em>school journey.</em></h1>
          <p>Explore the kinds of scholarships and education support that may be available to students in Classes 1–10. Understand the criteria, check the official details and find the right place to apply.</p>
          <form className="school-search" action="/scholarships" method="get">
            <Search size={20}/>
            <input type="search" name="q" placeholder="Search school scholarships, state or provider…" aria-label="Search school scholarships"/>
            <input type="hidden" name="level" value="School"/>
            <button type="submit">Search <ArrowRight size={16}/></button>
          </form>
          <div className="school-search-note">Try searches like “Class 8 scholarship”, “school scholarship in Telangana” or a provider name.</div>
        </div>
        <div className="school-hero-aside">
          <div className="school-aside-icon"><BookOpen size={35}/></div>
          <span>THE SCHOOL YEARS</span>
          <strong>Build your<br/>next chapter.</strong>
          <p>Find information early. Check every requirement before applying.</p>
          <div className="school-aside-rule"></div>
          <small>LEARN · DISCOVER · GROW</small>
        </div>
      </section>

      <SchoolListings />

      <section className="school-content">
        <div className="school-section-heading">
          <div><div className="eyebrow dark-eyebrow">WHAT SUPPORT CAN LOOK LIKE</div><h2>More than one way<br/>to support learning.</h2></div>
          <p>Scholarships are offered by government departments, schools, foundations, companies and other organisations. Benefits and eligibility vary from one programme to another.</p>
        </div>
        <div className="school-support-grid">
          {supportTypes.map(({icon: Icon,title,text},index) => <article className="school-support-card" key={title}><span className="school-card-number">0{index+1}</span><span className="school-support-icon"><Icon size={23}/></span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="school-source-section">
        <div className="school-source-inner">
          <div className="eyebrow">WHERE TO LOOK</div>
          <h2>Start with trusted<br/><em>sources.</em></h2>
          <p>School-level opportunities may be announced by central and state government departments, education boards, charitable foundations and private organisations. Always confirm that a programme is open for your class and academic year.</p>
          <div className="school-source-points">
            <div><Landmark size={20}/><span><b>Government schemes</b><small>Check official central and state scholarship portals and department notices.</small></span></div>
            <div><HeartHandshake size={20}/><span><b>Foundations and organisations</b><small>Read the provider’s official eligibility rules, dates and application instructions.</small></span></div>
            <div><ShieldCheck size={20}/><span><b>Verify before applying</b><small>Use the original notification or official provider website as the final source of truth.</small></span></div>
          </div>
        </div>
      </section>

      <section className="school-check-section">
        <div className="eyebrow dark-eyebrow">BEFORE YOU APPLY</div>
        <h2>Check the details<br/><em>carefully.</em></h2>
        <p className="school-check-lede">Every scholarship has its own rules. These are common details worth checking, not a universal eligibility checklist.</p>
        <div className="school-checklist">{checklist.map((item,index)=><div className="school-check-item" key={item}><span>0{index+1}</span><p>{item}</p></div>)}</div>
        <div className="school-disclaimer"><ShieldCheck size={19}/><p>ScholarSphere is a discovery and information platform. Applications are completed on the scholarship provider’s official website. We do not collect documents or guarantee eligibility or selection.</p></div>
      </section>

      <section className="school-cta">
        <div className="eyebrow">YOUR SEARCH STARTS HERE</div>
        <h2>Find an opportunity<br/><span>worth exploring.</span></h2>
        <p>Search for school-level scholarship information and check each opportunity with its official provider.</p>
        <form className="school-search school-search-cta" action="/scholarships" method="get"><Search size={19}/><input type="search" name="q" placeholder="Search school scholarships…" aria-label="Search school scholarships"/><input type="hidden" name="level" value="School"/><button type="submit">Search <ArrowRight size={16}/></button></form>
        <Link href="/" className="school-home-link"><ArrowLeft size={15}/> Back to ScholarSphere home</Link>
      </section>
      <footer className="school-footer"><Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={20}/></span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link><span>© 2026 ScholarSphere · Scholarship discovery, not application processing.</span></footer>
    </main>
  );
}
