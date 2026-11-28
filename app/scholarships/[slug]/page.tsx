import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, FileText, GraduationCap, ShieldCheck } from "lucide-react";
import { getDb } from "@/lib/db";
import schoolSeed from "@/data/scholarships/school-seed.json";
import intermediateSeed from "@/data/scholarships/intermediate-seed.json";
import diplomaSeed from "@/data/scholarships/diploma-seed.json";
import undergraduateSeed from "@/data/scholarships/undergraduate-seed.json";
import postgraduateSeed from "@/data/scholarships/postgraduate-seed.json";
import researchSeed from "@/data/scholarships/research-seed.json";
import additionalCatalogueSeed from "@/data/scholarships/additional-catalogue-seed.json";

type Props = { params: Promise<{ slug: string }> };
const statusLabels: Record<string,string> = {
  open:"Applications open", opening_soon:"Opening soon", closed:"Application closed",
  check_state_portal:"Check your state portal", verify_on_provider:"Confirm with provider"
};
function displayValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (value && typeof value === "object") return JSON.stringify(value);
  return String(value);
}
export default async function ScholarshipDetailPage({params}:Props) {
  const {slug}=await params;
  let record: Record<string, any> | undefined;
  const db=getDb();
  if(db) {
    try {
      const rows=await db`
        SELECT slug,name,provider,provider_type AS "providerType",education_levels AS "educationLevels",
          grades,states,categories,scholarship_type AS "scholarshipType",summary,benefits,
          amount_min_inr AS "amountMin",amount_max_inr AS "amountMax",amount_description AS "amountDescription",
          eligibility,required_documents AS "requiredDocuments",application_process AS "applicationProcess",
          official_application_url AS "officialApplicationUrl",official_source_url AS "officialSourceUrl",
          academic_year AS "academicYear",application_status AS "applicationStatus",
          application_open_date AS "applicationOpenDate",application_deadline AS "applicationDeadline",
          status_note AS "statusNote",source_last_checked_at AS "sourceLastChecked"
        FROM scholarships
        WHERE slug=${slug} AND published=TRUE AND verification_status='verified'
        LIMIT 1
      `;
      record=(rows as unknown as Record<string,any>[])[0];
    } catch(error) {
      console.error("Scholarship detail lookup failed",error);
    }
  }
  if(!record) record=([...schoolSeed,...intermediateSeed,...diplomaSeed,...undergraduateSeed,...postgraduateSeed,...researchSeed,...additionalCatalogueSeed]).find(item=>item.slug===slug) as unknown as Record<string,any> | undefined;
  if(!record) return <main className="detail-page"><header className="directory-nav"><Link className="brand" href="/"><span className="brand-mark">✳</span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link><Link href="/scholarships" className="directory-back"><ArrowLeft size={16}/> Directory</Link></header><section className="detail-empty"><div className="empty-icon"><GraduationCap size={27}/></div><div className="eyebrow dark-eyebrow">SCHOLARSHIP INFORMATION</div><h1>Details are not<br/><em>published yet.</em></h1><p>We couldn’t find a published, verified record for “{slug.replaceAll("-"," ")}”. We do not display guessed eligibility rules, amounts or deadlines.</p><Link className="directory-cta" href="/school">Explore school scholarships</Link></section></main>;
  const providerDomain = /CBSE/i.test(record.provider) ? "cbse.gov.in" : /HDFC/i.test(record.provider) ? "hdfcbank.com" : /Tribal Affairs/i.test(record.provider) ? "tribal.nic.in" : /Social Justice/i.test(record.provider) ? "socialjustice.gov.in" : /Disabilities/i.test(record.provider) ? "depwd.gov.in" : /Labour/i.test(record.provider) ? "labour.gov.in" : /Telangana/i.test(record.provider) ? "telangana.gov.in" : /Education/i.test(record.provider) ? "education.gov.in" : new URL(record.officialSourceUrl).hostname;
  const providerLogo = `https://www.google.com/s2/favicons?domain=${providerDomain}&sz=128`;
  const eligibility=record.eligibility && typeof record.eligibility==="object" ? Object.entries(record.eligibility) : [];
  const checked=record.sourceLastChecked || record.sourceLastCheckedAt;
  const deadline=record.applicationDeadline;
  return <main className="detail-page scholarship-detail-page">
    <header className="directory-nav"><Link className="brand" href="/"><span className="brand-mark">✳</span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link><Link href="/school" className="directory-back"><ArrowLeft size={16}/> School scholarships</Link></header>
    <section className="scholarship-detail-hero">
      <div className="eyebrow dark-eyebrow">SCHOLARSHIP DETAILS · {record.academicYear}</div>
      <span className={"school-status status-"+record.applicationStatus}>{statusLabels[record.applicationStatus] || "Check official provider"}</span>
      <div className="scholarship-detail-brand"><span className="school-provider-logo"><img src={providerLogo} alt={record.provider+" logo"}/></span><div><h1>{record.name}</h1><p className="scholarship-detail-provider">{record.provider}</p></div></div>
      <p className="scholarship-detail-summary">{record.summary}</p>
      {record.benefits && <div className="scholarship-detail-benefit"><span>FINANCIAL SUPPORT</span><strong>{record.benefits}</strong></div>}
      <div className="scholarship-detail-pills">{(record.grades||[]).map((grade:string)=><span key={grade}>{grade}</span>)}{(record.states||[]).slice(0,3).map((state:string)=><span key={state}>{state}</span>)}</div>
      <div className="scholarship-detail-actions"><a className="directory-cta" href={record.officialApplicationUrl||record.officialSourceUrl} target="_blank" rel="noreferrer">Visit official application portal <ArrowUpRight size={16}/></a><a className="scholarship-source-link" href={record.officialSourceUrl} target="_blank" rel="noreferrer">Read official scheme guidelines <ArrowUpRight size={15}/></a></div>
    </section>
    <section className="scholarship-detail-content">
      <div className="scholarship-detail-main">
        <article className="scholarship-detail-panel"><h2><CheckCircle2 size={20}/> Eligibility</h2>{eligibility.length?<dl>{eligibility.map(([key,value])=><div key={key}><dt>{key.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase())}</dt><dd>{displayValue(value)}</dd></div>)}</dl>:<p>Check the official scheme guidelines for eligibility conditions.</p>}</article>
        <article className="scholarship-detail-panel"><h2><FileText size={20}/> Documents to keep ready</h2><ul>{(record.requiredDocuments||[]).map((doc:string)=><li key={doc}>{doc}</li>)}</ul><p className="detail-small-note">This is an information checklist only. Do not upload documents to ScholarSphere. The official provider may request additional or different documents.</p></article>
        <article className="scholarship-detail-panel"><h2><GraduationCap size={20}/> How to apply</h2><p>{record.applicationProcess || "Follow the current instructions on the official provider portal."}</p><a className="scholarship-source-link" href={record.officialApplicationUrl||record.officialSourceUrl} target="_blank" rel="noreferrer">Continue on the official website <ArrowUpRight size={15}/></a></article>
      </div>
      <aside className="scholarship-detail-side">
        <div className="scholarship-detail-panel"><h3><CalendarDays size={18}/> Application timeline</h3><p><b>Status</b><span>{statusLabels[record.applicationStatus]||"Confirm with provider"}</span></p>{record.applicationOpenDate&&<p><b>Opens</b><span>{String(record.applicationOpenDate).slice(0,10)}</span></p>}{deadline&&<p><b>Student deadline</b><span>{String(deadline).slice(0,10)}</span></p>}{record.statusNote&&<div className="detail-status-note">{record.statusNote}</div>}</div>
        <div className="scholarship-detail-panel"><h3><ShieldCheck size={18}/> Source & verification</h3><p><b>Provider</b><span>{record.provider}</span></p><p><b>Academic year</b><span>{record.academicYear}</span></p><p><b>Last checked</b><span>{checked ? String(checked).slice(0,10) : "Not recorded"}</span></p><a className="scholarship-source-link" href={record.officialSourceUrl} target="_blank" rel="noreferrer">Open source <ArrowUpRight size={15}/></a></div>
      </aside>
    </section>
    <section className="scholarship-detail-disclaimer"><ShieldCheck size={18}/><p>ScholarSphere is a discovery and information platform, not an application portal. Eligibility and award decisions belong to the scholarship provider. Always confirm the latest rules and dates on the official source before applying.</p></section>
  </main>;
}